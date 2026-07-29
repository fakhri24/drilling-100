// 01-operasi-aritmatika-dasar.js
// 6 kompetensi kecil — Aritmatika Bilangan Bulat

const KOMPETENSI_01 = [
  // ─────────────────────────────────────────────
  // 1a. Penjumlahan Tanda Sama
  // ─────────────────────────────────────────────
  {
    id: "01a",
    nama: "Penjumlahan Tanda Sama",
    deskripsi: "Jika tanda sama, jumlahkan nilai mutlak, tanda tetap",
    totalSoal: 100,
    generateSoal() {
      const negatif = Math.random() > 0.5;
      const a = randInt(1, 50);
      const b = randInt(1, 50);
      const sign = negatif ? -1 : 1;
      const sa = negatif ? `(${a})` : `${a}`;
      const sb = negatif ? `(${b})` : `${b}`;
      return {
        pertanyaan: `${sa} + ${sb} = ...`,
        jawaban: sign * (a + b),
        penjelasan: "Tanda sama → jumlahkan, tanda tetap"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 1b. Penjumlahan Tanda Beda
  // ─────────────────────────────────────────────
  {
    id: "01b",
    nama: "Penjumlahan Tanda Beda",
    deskripsi: "Jika tanda beda, kurangkan, ikuti tanda yang lebih besar",
    totalSoal: 100,
    generateSoal() {
      let a = randInt(1, 50);
      let b = randInt(1, 50);
      // Pastikan beda (bukan sama supaya beda tanda)
      // Acak: positif + negatif atau negatif + positif
      const positifDulu = Math.random() > 0.5;
      let jawaban;
      if (positifDulu) {
        jawaban = a - b;
        return {
          pertanyaan: `${a} + (${b * -1}) = ...`,
          jawaban: jawaban,
          penjelasan: "Tanda beda → kurangkan, ikuti tanda yang lebih besar"
        };
      } else {
        jawaban = b - a;
        return {
          pertanyaan: `(${a * -1}) + ${b} = ...`,
          jawaban: jawaban,
          penjelasan: "Tanda beda → kurangkan, ikuti tanda yang lebih besar"
        };
      }
    }
  },

  // ─────────────────────────────────────────────
  // 1c. Pengurangan Bilangan Bulat
  // ─────────────────────────────────────────────
  {
    id: "01c",
    nama: "Pengurangan Bilangan Bulat",
    deskripsi: "a - b = a + (-b), balik tanda pengurang",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(-30, 50);
      const b = randInt(-30, 50);
      const sa = a < 0 ? `(${a})` : `${a}`;
      const sb = b < 0 ? `(${b})` : `${b}`;
      return {
        pertanyaan: `${sa} - ${sb} = ...`,
        jawaban: a - b,
        penjelasan: "Ubah − jadi +, balik tanda bilangan setelah tanda kurang"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 1d. Perkalian Bilangan Bulat (tanda)
  // ─────────────────────────────────────────────
  {
    id: "01d",
    nama: "Perkalian Bilangan Bulat",
    deskripsi: "Sesama tanda → positif, beda tanda → negatif",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 12);
      const b = randInt(1, 12);
      const negA = Math.random() > 0.5;
      const negB = Math.random() > 0.5;
      const sa = negA ? `(${a * -1})` : `${a}`;
      const sb = negB ? `(${b * -1})` : `${b}`;
      const jawaban = (negA ? -a : a) * (negB ? -b : b);
      return {
        pertanyaan: `${sa} × ${sb} = ...`,
        jawaban: jawaban,
        penjelasan: "Sesama tanda → positif, beda tanda → negatif"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 1e. Pembagian Bilangan Bulat (tanda)
  // ─────────────────────────────────────────────
  {
    id: "01e",
    nama: "Pembagian Bilangan Bulat",
    deskripsi: "Aturan tanda sama dengan perkalian",
    totalSoal: 100,
    generateSoal() {
      // Pastikan hasilnya bulat
      const b = randInt(1, 12);
      const hasil = randInt(-12, 12);
      const a = b * hasil;
      const negA = a < 0;
      const negB = Math.random() > 0.5;
      const sa = negA ? `(${a})` : `${a}`;
      const sb = negB ? `(${b * -1})` : `${b}`;
      const jawaban = negB ? -hasil : hasil;
      return {
        pertanyaan: `${sa} ÷ ${sb} = ...`,
        jawaban: jawaban,
        penjelasan: "Sesama tanda → positif, beda tanda → negatif"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 1f. Urutan Operasi (PEMDAS) — tanpa pangkat
  // ─────────────────────────────────────────────
  {
    id: "01f",
    nama: "Urutan Operasi (PEMDAS)",
    deskripsi: "Kurung → Kali/Bagi → Tambah/Kurang (kiri ke kanan)",
    totalSoal: 100,
    generateSoal() {
      const tipe = randInt(1, 3);
      let pertanyaan, jawaban;

      if (tipe === 1) {
        // a + b × c
        const a = randInt(2, 15);
        const b = randInt(2, 10);
        const c = randInt(2, 10);
        pertanyaan = `${a} + ${b} × ${c} = ...`;
        jawaban = a + b * c;
      } else if (tipe === 2) {
        // a × (b + c)
        const a = randInt(2, 10);
        const b = randInt(2, 15);
        const c = randInt(2, 15);
        pertanyaan = `${a} × (${b} + ${c}) = ...`;
        jawaban = a * (b + c);
      } else {
        // a - b × c + d
        const a = randInt(20, 50);
        const b = randInt(2, 8);
        const c = randInt(2, 8);
        const d = randInt(1, 15);
        pertanyaan = `${a} - ${b} × ${c} + ${d} = ...`;
        jawaban = a - b * c + d;
      }

      return {
        pertanyaan,
        jawaban,
        penjelasan: "Urutan: Kurung → Kali/Bagi → Tambah/Kurang (kiri ke kanan)"
      };
    }
  }
];
