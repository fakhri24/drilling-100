// 08-plsv.js
// 3 kompetensi kecil — Persamaan Linear Satu Variabel

const KOMPETENSI_08 = [
  // ─────────────────────────────────────────────
  // 8a. PLSV Sederhana (ax + b = c)
  // ─────────────────────────────────────────────
  {
    id: "08a",
    nama: "PLSV Sederhana (ax+b=c)",
    deskripsi: "Pindahkan konstanta ke kanan, bagi kedua ruas dengan koefisien x",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 10);
      const x = randInt(-10, 10);
      const b = randInt(1, 30);
      const c = a * x + b;
      return {
        pertanyaan: `${a}x + ${b} = ${c} \\text{, } x = \\ldots`,
        jawaban: x,
        penjelasan: "Pindahkan konstanta ke kanan, lalu bagi kedua ruas dengan koefisien x"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 8b. PLSV Variabel di Kedua Ruas (ax + b = cx + d)
  // ─────────────────────────────────────────────
  {
    id: "08b",
    nama: "PLSV Variabel di Kedua Ruas",
    deskripsi: "Kumpulkan suku-x di satu ruas, konstanta di ruas lain",
    totalSoal: 100,
    generateSoal() {
      const x = randInt(-10, 10);
      const a = randInt(2, 10);
      let c = randInt(2, 10);
      while (c === a) c = randInt(2, 10);
      const b = randInt(1, 30);
      const d = (a - c) * x + b;
      const dOp = d < 0 ? "-" : "+";
      const dAbs = Math.abs(d);
      return {
        pertanyaan: `${a}x + ${b} = ${c}x ${dOp} ${dAbs} \\text{, } x = \\ldots`,
        jawaban: x,
        penjelasan: "Kumpulkan suku-x di satu ruas, konstanta di ruas lain, lalu bagi"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 8c. Kasus Khusus (tanpa solusi / solusi tak terhingga)
  // ─────────────────────────────────────────────
  {
    id: "08c",
    nama: "Kasus Khusus PLSV",
    deskripsi: "Koefisien x sama & konstanta beda → tanpa solusi. Kedua ruas identik → tak terhingga",
    totalSoal: 100,
    generateSoal() {
      const tipe = randInt(1, 3);
      const a = randInt(2, 10);
      const b = randInt(1, 30);
      const legenda = "\\text{. Banyak solusi? (0=tidak ada, 1=satu, 2=tak terhingga)}";

      if (tipe === 1) {
        // Tidak ada solusi: koefisien x sama, konstanta beda
        let d = randInt(1, 30);
        while (d === b) d = randInt(1, 30);
        return {
          pertanyaan: `${a}x + ${b} = ${a}x + ${d}${legenda}`,
          jawaban: 0,
          penjelasan: "Koefisien x sama tapi konstanta beda → tidak ada solusi (pernyataan salah)"
        };
      } else if (tipe === 2) {
        // Tak terhingga: kedua ruas identik
        return {
          pertanyaan: `${a}x + ${b} = ${a}x + ${b}${legenda}`,
          jawaban: 2,
          penjelasan: "Kedua ruas identik → berlaku untuk semua x (tak terhingga solusi)"
        };
      } else {
        // Solusi tunggal (kasus normal, untuk pembanding)
        let c = randInt(2, 10);
        while (c === a) c = randInt(2, 10);
        const x = randInt(-10, 10);
        const d = (a - c) * x + b;
        const dOp = d < 0 ? "-" : "+";
        const dAbs = Math.abs(d);
        return {
          pertanyaan: `${a}x + ${b} = ${c}x ${dOp} ${dAbs}${legenda}`,
          jawaban: 1,
          penjelasan: "Koefisien x beda → ada tepat satu solusi"
        };
      }
    }
  }
];
