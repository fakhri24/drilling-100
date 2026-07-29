// 04-operasi-pecahan.js
// 6 kompetensi kecil — Operasi Pecahan

const KOMPETENSI_04 = [
  // ─────────────────────────────────────────────
  // 4a. Menyederhanakan Pecahan
  // ─────────────────────────────────────────────
  {
    id: "04a",
    nama: "Menyederhanakan Pecahan",
    deskripsi: "Bagi pembilang & penyebut dengan FPB-nya",
    totalSoal: 100,
    generateSoal() {
      const sb = randInt(2, 12);
      let sa;
      do {
        sa = randInt(1, sb - 1);
      } while (gcd(sa, sb) !== 1);
      const k = randInt(2, 6);
      const a = sa * k;
      const b = sb * k;
      return {
        pertanyaan: `\\frac{${a}}{${b}} = \\frac{\\ldots}{${sb}}`,
        jawaban: sa,
        penjelasan: `Bagi pembilang & penyebut dengan FPB(${a}, ${b}) = ${k}`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 4b. Tambah/Kurang Pecahan Sejenis
  // ─────────────────────────────────────────────
  {
    id: "04b",
    nama: "Tambah/Kurang Pecahan Sejenis",
    deskripsi: "Penyebut sama, tinggal operasikan pembilangnya",
    totalSoal: 100,
    generateSoal() {
      const c = randInt(3, 12);
      const kurang = Math.random() > 0.5;
      let a, b;
      if (kurang) {
        a = randInt(2, c - 1);
        b = randInt(1, a - 1);
      } else {
        a = randInt(1, c - 1);
        b = randInt(1, c - 1);
      }
      const op = kurang ? "-" : "+";
      const jawaban = (kurang ? a - b : a + b) / c;
      return {
        pertanyaan: `\\frac{${a}}{${c}} ${op} \\frac{${b}}{${c}} = \\ldots`,
        jawaban: jawaban,
        penjelasan: "Penyebut sama → operasikan pembilang, penyebut tetap"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 4c. Tambah/Kurang Pecahan Tak Sejenis
  // ─────────────────────────────────────────────
  {
    id: "04c",
    nama: "Tambah/Kurang Pecahan Tak Sejenis",
    deskripsi: "Samakan penyebut dulu (KPK), baru operasikan",
    totalSoal: 100,
    generateSoal() {
      let b = randInt(2, 10);
      let d = randInt(2, 10);
      while (d === b) d = randInt(2, 10);
      let a = randInt(1, b - 1);
      let c = randInt(1, d - 1);
      const kurang = Math.random() > 0.5;

      if (kurang && (a / b) < (c / d)) {
        [a, b, c, d] = [c, d, a, b];
      }

      const op = kurang ? "-" : "+";
      const jawaban = kurang ? (a / b - c / d) : (a / b + c / d);
      return {
        pertanyaan: `\\frac{${a}}{${b}} ${op} \\frac{${c}}{${d}} = \\ldots`,
        jawaban: jawaban,
        penjelasan: "Samakan penyebut pakai KPK, baru jumlah/kurangkan pembilang"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 4d. Perkalian Pecahan
  // ─────────────────────────────────────────────
  {
    id: "04d",
    nama: "Perkalian Pecahan",
    deskripsi: "Kalikan pembilang dengan pembilang, penyebut dengan penyebut",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 10);
      const b = randInt(2, 10);
      const c = randInt(1, 10);
      const d = randInt(2, 10);
      return {
        pertanyaan: `\\frac{${a}}{${b}} \\times \\frac{${c}}{${d}} = \\ldots`,
        jawaban: (a * c) / (b * d),
        penjelasan: "Kali pembilang dengan pembilang, penyebut dengan penyebut"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 4e. Pembagian Pecahan
  // ─────────────────────────────────────────────
  {
    id: "04e",
    nama: "Pembagian Pecahan",
    deskripsi: "Kali dengan kebalikan pecahan pembagi",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 10);
      const b = randInt(2, 10);
      const c = randInt(1, 10);
      const d = randInt(2, 10);
      return {
        pertanyaan: `\\frac{${a}}{${b}} \\div \\frac{${c}}{${d}} = \\ldots`,
        jawaban: (a * d) / (b * c),
        penjelasan: "Bagi pecahan = kali dengan kebalikan pecahan pembagi"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 4f. Konversi Pecahan Campuran → Biasa
  // ─────────────────────────────────────────────
  {
    id: "04f",
    nama: "Konversi Campuran ↔ Biasa",
    deskripsi: "Pecahan campuran → biasa: (bulat × penyebut) + pembilang",
    totalSoal: 100,
    generateSoal() {
      const whole = randInt(1, 10);
      const denom = randInt(2, 12);
      const num = randInt(1, denom - 1);
      return {
        pertanyaan: `${whole}\\frac{${num}}{${denom}} = \\frac{\\ldots}{${denom}}`,
        jawaban: whole * denom + num,
        penjelasan: "Pecahan campuran → biasa: (bulat × penyebut) + pembilang, penyebut tetap"
      };
    }
  }
];
