// tools/cek-kurikulum.mjs — jalankan: node tools/cek-kurikulum.mjs
//
// Cek js/kurikulum.js sinkron dengan generator di js/materi/*.js: id sama,
// nama sama, totalSoal 100, tidak ada yang yatim di salah satu sisi.
// Daftar berkas yang dimuat dibaca dari drill.html, jadi generator yang lupa
// didaftarkan di sana ikut ketahuan.
import fs from "fs";
import vm from "vm";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const html = fs.readFileSync(`${ROOT}/drill.html`, "utf8");
const skrip = [...html.matchAll(/src="(js\/[^"?]+)/g)].map((m) => m[1]);

const ctx = vm.createContext({ Math, console });
for (const f of ["js/drill-engine.js", ...skrip.filter((s) => s.startsWith("js/materi/")), "js/kurikulum.js"]) {
  vm.runInContext(fs.readFileSync(`${ROOT}/${f}`, "utf8"), ctx, { filename: f });
}

const listNama = [...html.matchAll(/registerMateri\((KOMPETENSI_\w+)\)/g)].map((m) => m[1]);
const generator = new Map();
for (const nama of listNama) {
  for (const k of vm.runInContext(nama, ctx)) {
    if (generator.has(k.id)) console.log(`DUPLIKAT id generator: ${k.id}`);
    generator.set(k.id, k);
  }
}

const kurikulum = new Map();
for (const mu of vm.runInContext("KURIKULUM", ctx)) {
  for (const sub of mu.subMateri) {
    for (const k of sub.kompetensi) {
      if (kurikulum.has(k.id)) console.log(`DUPLIKAT id kurikulum: ${k.id}`);
      kurikulum.set(k.id, { ...k, sub: sub.id, mu: mu.id });
    }
  }
}

let masalah = 0;
for (const [id, k] of kurikulum) {
  if (!generator.has(id)) { console.log(`✗ ${id} ada di kurikulum.js tapi TIDAK punya generator`); masalah++; continue; }
  const g = generator.get(id);
  if (g.nama !== k.nama) { console.log(`✗ ${id} nama beda — kurikulum: "${k.nama}" | generator: "${g.nama}"`); masalah++; }
  if (g.totalSoal !== 100) { console.log(`✗ ${id} totalSoal = ${g.totalSoal}, bukan 100`); masalah++; }
}
for (const id of generator.keys()) {
  if (!kurikulum.has(id)) { console.log(`✗ ${id} punya generator tapi TIDAK terdaftar di kurikulum.js`); masalah++; }
}

// getSubMateriDariKompetensi harus menemukan semuanya
for (const id of kurikulum.keys()) {
  const r = vm.runInContext(`getSubMateriDariKompetensi(${JSON.stringify(id)})`, ctx);
  if (!r || r.subMateri.id !== kurikulum.get(id).sub) { console.log(`✗ getSubMateriDariKompetensi("${id}") meleset`); masalah++; }
}

console.log(`\nkompetensi kurikulum: ${kurikulum.size}, generator: ${generator.size}`);
for (const mu of vm.runInContext("KURIKULUM", ctx)) {
  const n = mu.subMateri.reduce((a, s) => a + s.kompetensi.length, 0);
  console.log(`  ${mu.nama}: ${mu.subMateri.length} sub-materi, ${n} kompetensi, ${n * 100} soal`);
}
console.log(masalah === 0 ? "\nSinkron." : `\n${masalah} MASALAH`);
process.exit(masalah === 0 ? 0 : 1);
