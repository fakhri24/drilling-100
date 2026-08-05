// tools/verifikasi-soal-eksponen.mjs — jalankan: node tools/verifikasi-soal-eksponen.mjs
//
// Verifikator generator soal Eksponen (E1-E5).
// Mengevaluasi ULANG string LaTeX pertanyaan dengan jawaban disubstitusikan,
// lalu mengecek ruas kiri == ruas kanan. Bukan mengecek ulang aritmatika
// generator dengan rumus yang sama (itu cuma menyalin bug-nya).

import fs from "fs";
import vm from "vm";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const files = [
  "js/drill-engine.js",
  "js/materi/E1-sifat-eksponen-bulat.js",
  "js/materi/E2-operasi-bentuk-akar.js",
  "js/materi/E3-merasionalkan-penyebut.js",
  "js/materi/E4-eksponen-rasional.js",
  "js/materi/E5-fungsi-eksponen.js",
];

const ctx = vm.createContext({ Math, console, document: undefined });
for (const f of files) {
  vm.runInContext(fs.readFileSync(`${ROOT}/${f}`, "utf8"), ctx, { filename: f });
}

// ── Parser LaTeX terbatas ────────────────────────────────────────────────
function tokenize(s) {
  const t = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i++; continue; }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      t.push({ k: "num", v: parseFloat(s.slice(i, j)) });
      i = j;
      continue;
    }
    if (s.startsWith("ANS", i)) { t.push({ k: "ans" }); i += 3; continue; }
    if (c === "\\") {
      const m = /^\\[a-zA-Z]+/.exec(s.slice(i));
      if (!m) throw new Error("backslash aneh: " + s.slice(i, i + 10));
      const cmd = m[0];
      i += cmd.length;
      if (cmd === "\\times" || cmd === "\\cdot") t.push({ k: "op", v: "*" });
      else if (cmd === "\\sqrt") t.push({ k: "sqrt" });
      else if (cmd === "\\frac") t.push({ k: "frac" });
      else if (cmd === "\\left" || cmd === "\\right") { /* diabaikan */ }
      else throw new Error("perintah tak dikenal: " + cmd);
      continue;
    }
    if ("+-*/(){}[]^".includes(c)) {
      t.push({ k: c === "^" ? "pow" : c === "+" || c === "-" ? "op" : c, v: c });
      i++;
      continue;
    }
    throw new Error("karakter tak dikenal: " + c + " di " + s);
  }
  return t;
}

function parse(tokens) {
  let pos = 0;
  const peek = () => tokens[pos];
  const eat = (k, v) => {
    const t = tokens[pos];
    if (!t || t.k !== k || (v !== undefined && t.v !== v)) {
      throw new Error(`harap ${k}${v ?? ""}, dapat ${JSON.stringify(t)}`);
    }
    pos++;
    return t;
  };

  function expr() {
    let v = term();
    while (peek() && peek().k === "op" && (peek().v === "+" || peek().v === "-")) {
      const op = eat("op").v;
      const r = term();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  }
  function term() {
    let v = power();
    for (;;) {
      const t = peek();
      if (t && t.k === "op" && t.v === "*") { eat("op"); v *= power(); continue; }
      // perkalian implisit: 2\sqrt3, (ANS)(...), 3x^2
      if (t && (t.k === "num" || t.k === "ans" || t.k === "sqrt" || t.k === "frac" || t.k === "(")) {
        v *= power();
        continue;
      }
      break;
    }
    return v;
  }
  function power() {
    let base = atom();
    if (peek() && peek().k === "pow") {
      eat("pow");
      base = Math.pow(base, atom());
    }
    return base;
  }
  function atom() {
    const t = peek();
    if (!t) throw new Error("ekspresi terpotong");
    if (t.k === "op" && t.v === "-") { eat("op"); return -atom(); }
    if (t.k === "num") { eat("num"); return t.v; }
    if (t.k === "ans") { eat("ans"); return ANS_VALUE; }
    if (t.k === "(") { eat("("); const v = expr(); eat(")"); return v; }
    if (t.k === "{") { eat("{"); const v = expr(); eat("}"); return v; }
    if (t.k === "sqrt") {
      eat("sqrt");
      let n = 2;
      if (peek() && peek().k === "[") { eat("["); n = expr(); eat("]"); }
      eat("{"); const v = expr(); eat("}");
      return Math.pow(v, 1 / n);
    }
    if (t.k === "frac") {
      eat("frac");
      eat("{"); const a = expr(); eat("}");
      eat("{"); const b = expr(); eat("}");
      return a / b;
    }
    throw new Error("atom tak dikenal: " + JSON.stringify(t));
  }

  const v = expr();
  if (pos !== tokens.length) throw new Error("token sisa: " + JSON.stringify(tokens.slice(pos)));
  return v;
}

let ANS_VALUE = 0;
function evalLatex(s, ans) {
  ANS_VALUE = ans;
  return parse(tokenize(s));
}

// ── Harness ──────────────────────────────────────────────────────────────
const NILAI_HURUF = 2; // huruf basis (a, b, p, m, x, y) disubstitusi jadi 2

/**
 * Siapkan string: ganti placeholder & huruf basis jadi ANS/angka.
 * Perintah LaTeX dilindungi dulu — tanpa itu, "m" di \times dan "a" di \frac
 * ikut tersubstitusi. Huruf diganti "(2)" bukan "2" supaya perkalian implisit
 * tidak lenyap: "3y" → "3(2)" (= 6), bukan "32".
 */
function siapkan(latex, unknown) {
  let s = latex.replace(/\\ldots/g, "@ANS@").replace(/\\,/g, " ").replace(/\\quad/g, " ");
  const cmds = [];
  s = s.replace(/\\[a-zA-Z]+/g, (m) => `@${cmds.push(m) - 1}@`);
  if (unknown === "x") s = s.replace(/x/g, "(ANS)");
  else if (unknown === "ldots") s = s.replace(/[abpmxy]/g, `(${NILAI_HURUF})`);
  s = s.replace(/@(\d+)@/g, (_, i) => cmds[+i]);
  return s.replace(/@ANS@/g, "ANS");
}

// `const` di runInContext masuk ke scope leksikal global konteks, bukan ke
// objek ctx — jadi diambil lewat evaluasi, bukan ctx.KOMPETENSI_E1
const KASUS = vm
  .runInContext(
    "[KOMPETENSI_E1, KOMPETENSI_E2, KOMPETENSI_E3, KOMPETENSI_E4, KOMPETENSI_E5]",
    ctx
  )
  .map((d) => [d, "ldots"]);
// Kompetensi yang unknown-nya "x" (persamaan), bukan "\ldots"
const UNKNOWN_X = new Set(["E1f", "E5c", "E5d", "E5e"]);
// f(x) = ... => f(n) = ... butuh penanganan sendiri
const FUNGSI = new Set(["E5a", "E5b"]);

const N = 400;
let totalOk = 0;
const masalah = [];

for (const [daftar] of KASUS) {
  for (const komp of daftar) {
    let ok = 0;
    const contoh = [];
    for (let i = 0; i < N; i++) {
      let soal;
      try {
        soal = komp.generateSoal();
      } catch (e) {
        masalah.push(`${komp.id}: generateSoal melempar ${e.message}`);
        break;
      }
      if (contoh.length < 2) contoh.push(soal);

      const j = soal.jawaban;
      if (!Number.isFinite(j)) {
        masalah.push(`${komp.id}: jawaban bukan angka berhingga (${j}) — ${soal.pertanyaan}`);
        continue;
      }
      // Jawaban bernilai < toleransi 0.006 tapi bukan 0 = siswa bisa
      // mengetik "0" dan tetap dinilai benar
      if (j !== 0 && Math.abs(j) < 0.0061) {
        masalah.push(`${komp.id}: jawaban ${j} lebih kecil dari toleransi cekJawaban — "0" akan diterima benar`);
      }

      try {
        if (FUNGSI.has(komp.id)) {
          // "f(x) = k \cdot a^{x} \quad \Rightarrow \quad f(N) = \ldots"
          const m = /^f\(x\)\s*=\s*(.+?)\s*\\quad\s*\\Rightarrow\s*\\quad\s*f\((-?\d+)\)\s*=\s*\\ldots$/.exec(
            soal.pertanyaan
          );
          if (!m) throw new Error("format f(x) tak cocok: " + soal.pertanyaan);
          const body = m[1].replace(/\{x\}/g, `{${m[2]}}`);
          const kiri = evalLatex(siapkan(body, "none"), 0);
          if (Math.abs(kiri - j) > 1e-9) throw new Error(`f(${m[2]}) = ${kiri}, jawaban ${j}`);
        } else {
          const unknown = UNKNOWN_X.has(komp.id) ? "x" : "ldots";
          const [kiriRaw, kananRaw] = soal.pertanyaan.split("=");
          if (kananRaw === undefined) throw new Error("tidak ada tanda '='");
          const kiri = evalLatex(siapkan(kiriRaw, unknown), j);
          const kanan = evalLatex(siapkan(kananRaw, unknown), j);
          const skala = Math.max(1, Math.abs(kiri), Math.abs(kanan));
          if (Math.abs(kiri - kanan) > 1e-9 * skala) {
            throw new Error(`kiri ${kiri} ≠ kanan ${kanan}`);
          }
        }
        ok++;
      } catch (e) {
        masalah.push(`${komp.id}: ${e.message} — soal: ${soal.pertanyaan} | jawaban: ${j}`);
      }
    }
    totalOk += ok;
    const tanda = ok === N ? "✓" : "✗";
    console.log(`${tanda} ${komp.id} ${komp.nama}: ${ok}/${N}`);
    for (const c of contoh) console.log(`      ${c.pertanyaan}   → ${c.jawaban}`);
  }
}

console.log(`\nTotal lolos: ${totalOk}`);
if (masalah.length) {
  console.log(`\n${masalah.length} MASALAH (10 pertama):`);
  for (const m of masalah.slice(0, 10)) console.log("  - " + m);
  process.exit(1);
}
console.log("Semua generator konsisten.");
