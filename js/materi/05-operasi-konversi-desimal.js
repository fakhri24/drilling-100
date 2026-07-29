// 05-operasi-konversi-desimal.js
// 5 kompetensi kecil — Operasi dan Konversi Desimal

const KOMPETENSI_05 = [
  // ─────────────────────────────────────────────
  // 5a. Pecahan → Desimal
  // ─────────────────────────────────────────────
  {
    id: "05a",
    nama: "Pecahan → Desimal",
    deskripsi: "Bagi pembilang dengan penyebut",
    totalSoal: 100,
    generateSoal() {
      const penyebutNice = [2, 4, 5, 8, 10, 20, 25, 50];
      const b = penyebutNice[randInt(0, penyebutNice.length - 1)];
      const a = randInt(1, b * 3);
      return {
        pertanyaan: `\\frac{${a}}{${b}} = \\ldots`,
        jawaban: a / b,
        penjelasan: "Bagi pembilang dengan penyebut"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 5b. Desimal → Pecahan
  // ─────────────────────────────────────────────
  {
    id: "05b",
    nama: "Desimal → Pecahan",
    deskripsi: "Ubah desimal jadi pecahan paling sederhana",
    totalSoal: 100,
    generateSoal() {
      const penyebutNice = [2, 4, 5, 8, 10, 20, 25, 50];
      const sb = penyebutNice[randInt(0, penyebutNice.length - 1)];
      let sa;
      do {
        sa = randInt(1, sb - 1);
      } while (gcd(sa, sb) !== 1);
      const desimal = sa / sb;
      return {
        pertanyaan: `${fmtDecimal(desimal)} = \\frac{\\ldots}{${sb}}`,
        jawaban: sa,
        penjelasan: "Cari pecahan senilai dengan penyebut yang diminta"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 5c. Penjumlahan/Pengurangan Desimal
  // ─────────────────────────────────────────────
  {
    id: "05c",
    nama: "Penjumlahan/Pengurangan Desimal",
    deskripsi: "Samakan jumlah angka di belakang koma, lalu jumlah/kurangkan",
    totalSoal: 100,
    generateSoal() {
      const kurang = Math.random() > 0.5;
      let a = Math.round((randInt(1, 30) + randInt(0, 99) / 100) * 100) / 100;
      let b = Math.round((randInt(1, 30) + randInt(0, 99) / 100) * 100) / 100;
      if (kurang && a < b) [a, b] = [b, a];
      const jawaban = Math.round((kurang ? a - b : a + b) * 100) / 100;
      const op = kurang ? "-" : "+";
      return {
        pertanyaan: `${fmtDecimal(a)} ${op} ${fmtDecimal(b)} = \\ldots`,
        jawaban: jawaban,
        penjelasan: "Samakan jumlah angka di belakang koma, lalu operasikan seperti bilangan bulat"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 5d. Perkalian Desimal
  // ─────────────────────────────────────────────
  {
    id: "05d",
    nama: "Perkalian Desimal",
    deskripsi: "Kalikan seperti bilangan bulat, atur tempat koma di akhir",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 20) / 10;
      const b = randInt(1, 20) / 10;
      const jawaban = Math.round(a * b * 100) / 100;
      return {
        pertanyaan: `${fmtDecimal(a)} \\times ${fmtDecimal(b)} = \\ldots`,
        jawaban: jawaban,
        penjelasan: "Kalikan seperti bilangan bulat, lalu atur tempat koma di hasil akhir"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 5e. Pembagian Desimal
  // ─────────────────────────────────────────────
  {
    id: "05e",
    nama: "Pembagian Desimal",
    deskripsi: "Ubah pembagi jadi bilangan bulat, baru bagi",
    totalSoal: 100,
    generateSoal() {
      const b = randInt(1, 50) / 10;
      const q = randInt(1, 100) / 10;
      const a = Math.round(b * q * 100) / 100;
      return {
        pertanyaan: `${fmtDecimal(a)} \\div ${fmtDecimal(b)} = \\ldots`,
        jawaban: q,
        penjelasan: "Ubah pembagi jadi bilangan bulat (kalikan 10/100/dst di kedua sisi), baru bagi"
      };
    }
  }
];
