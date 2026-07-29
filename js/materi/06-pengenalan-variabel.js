// 06-pengenalan-variabel.js
// 2 kompetensi kecil — Pengenalan Variabel
// (6b "Menyusun Ekspresi dari Kalimat" di-skip: butuh jawaban ekspresi/soal
// cerita, tidak cocok dengan engine numerik & aturan "tanpa soal cerita")

const KOMPETENSI_06 = [
  // ─────────────────────────────────────────────
  // 6a. Identifikasi Unsur Aljabar
  // ─────────────────────────────────────────────
  {
    id: "06a",
    nama: "Identifikasi Unsur Aljabar",
    deskripsi: "Koefisien = angka di depan variabel, konstanta = suku tanpa variabel",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 12);
      const b = randInt(1, 30);
      const tanyaKoef = Math.random() > 0.5;

      if (tanyaKoef) {
        return {
          pertanyaan: `\\text{Koefisien } x \\text{ pada } ${a}x + ${b} = \\ldots`,
          jawaban: a,
          penjelasan: "Koefisien = angka yang menempel di depan variabel"
        };
      } else {
        return {
          pertanyaan: `\\text{Konstanta pada } ${a}x + ${b} = \\ldots`,
          jawaban: b,
          penjelasan: "Konstanta = suku tanpa variabel"
        };
      }
    }
  },

  // ─────────────────────────────────────────────
  // 6c. Substitusi Nilai Variabel
  // ─────────────────────────────────────────────
  {
    id: "06c",
    nama: "Substitusi Nilai Variabel",
    deskripsi: "Ganti variabel dengan nilainya, lalu hitung",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 12);
      const b = randInt(1, 30);
      const x = randInt(-10, 10);
      return {
        pertanyaan: `\\text{Jika } x = ${x} \\text{, maka } ${a}x + ${b} = \\ldots`,
        jawaban: a * x + b,
        penjelasan: "Ganti x dengan nilainya, lalu hitung seperti biasa"
      };
    }
  }
];
