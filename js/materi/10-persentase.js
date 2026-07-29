// 10-persentase.js
// 4 kompetensi kecil — Persentase

const KOMPETENSI_10 = [
  // ─────────────────────────────────────────────
  // 10a. Konversi Persen ↔ Pecahan ↔ Desimal
  // ─────────────────────────────────────────────
  {
    id: "10a",
    nama: "Konversi Persen ↔ Pecahan ↔ Desimal",
    deskripsi: "Persen = per seratus: bagi/kali 100 untuk desimal, sederhanakan untuk pecahan",
    totalSoal: 100,
    generateSoal() {
      const tipe = randInt(1, 3);

      if (tipe === 1) {
        const p = randInt(1, 100);
        return {
          pertanyaan: `${p}\\% = \\ldots`,
          jawaban: p / 100,
          penjelasan: "Persen artinya per seratus: bagi dengan 100"
        };
      } else if (tipe === 2) {
        const d = randInt(1, 99) / 100;
        return {
          pertanyaan: `${fmtDecimal(d)} = \\ldots \\%`,
          jawaban: Math.round(d * 100 * 100) / 100,
          penjelasan: "Kalikan desimal dengan 100 untuk jadi persen"
        };
      } else {
        const opsi = [
          { p: 50, sa: 1, sb: 2 }, { p: 25, sa: 1, sb: 4 }, { p: 75, sa: 3, sb: 4 },
          { p: 20, sa: 1, sb: 5 }, { p: 40, sa: 2, sb: 5 }, { p: 60, sa: 3, sb: 5 }, { p: 80, sa: 4, sb: 5 },
          { p: 10, sa: 1, sb: 10 }, { p: 30, sa: 3, sb: 10 }, { p: 70, sa: 7, sb: 10 }, { p: 90, sa: 9, sb: 10 }
        ];
        const e = opsi[randInt(0, opsi.length - 1)];
        return {
          pertanyaan: `${e.p}\\% = \\frac{\\ldots}{${e.sb}}`,
          jawaban: e.sa,
          penjelasan: "Persen = pecahan per seratus, lalu disederhanakan"
        };
      }
    }
  },

  // ─────────────────────────────────────────────
  // 10b. Menghitung a% dari Nilai b
  // ─────────────────────────────────────────────
  {
    id: "10b",
    nama: "Menghitung a% dari Nilai",
    deskripsi: "Ubah persen jadi desimal, lalu kalikan dengan nilainya",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 100);
      const b = randInt(10, 500);
      const jawaban = Math.round((a / 100) * b * 100) / 100;
      return {
        pertanyaan: `${a}\\% \\text{ dari } ${b} = \\ldots`,
        jawaban: jawaban,
        penjelasan: "Ubah persen jadi desimal/pecahan, lalu kalikan dengan nilainya"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 10c. Menentukan Persentase Bagian dari Total
  // ─────────────────────────────────────────────
  {
    id: "10c",
    nama: "Persentase Bagian dari Total",
    deskripsi: "Bagi bagian dengan total, lalu kalikan 100%",
    totalSoal: 100,
    generateSoal() {
      const total = randInt(10, 200);
      const part = randInt(1, total);
      const jawaban = Math.round((part / total) * 100 * 100) / 100;
      return {
        pertanyaan: `\\text{Berapa persen } ${part} \\text{ dari } ${total} \\text{? } \\ldots \\%`,
        jawaban: jawaban,
        penjelasan: "Bagi bagian dengan total, lalu kalikan 100%"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 10d. Kenaikan & Penurunan Persentase
  // ─────────────────────────────────────────────
  {
    id: "10d",
    nama: "Kenaikan & Penurunan Persentase",
    deskripsi: "Harga baru = harga awal × (1 ± persen perubahan)",
    totalSoal: 100,
    generateSoal() {
      const x0 = randInt(10, 500);
      const a = randInt(5, 50);
      const naik = Math.random() > 0.5;
      const jawaban = Math.round((naik ? x0 * (1 + a / 100) : x0 * (1 - a / 100)) * 100) / 100;
      const kataOp = naik ? "naik" : "turun";
      return {
        pertanyaan: `\\text{Harga } ${x0} \\text{ ${kataOp} } ${a}\\% \\text{, harga baru } = \\ldots`,
        jawaban: jawaban,
        penjelasan: naik
          ? "Harga baru = harga awal × (1 + persen kenaikan)"
          : "Harga baru = harga awal × (1 - persen penurunan)"
      };
    }
  }
];
