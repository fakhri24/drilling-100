// 06-pengenalan-variabel.js
// 3 kompetensi kecil — Pengenalan Variabel
// 6b "Menyusun Ekspresi dari Kalimat" sempat di-skip karena butuh jawaban
// ekspresi (bukan angka tunggal) & tabrakan aturan "tanpa soal cerita".
// Diselesaikan dengan tipeJawaban "pilihan-ganda": kalimat matematis pendek
// (bukan soal cerita naratif) diterjemahkan ke ekspresi aljabar, siswa
// pilih dari 4 opsi.

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
  // 6b. Menyusun Ekspresi dari Kalimat
  // ─────────────────────────────────────────────
  {
    id: "06b",
    nama: "Menyusun Ekspresi dari Kalimat",
    deskripsi: "Kata kunci: jumlah/tambah → +, kurang/dikurangi → −, kali → ×, bagi → ÷. Perhatikan urutan sesuai kalimat",
    totalSoal: 100,
    tipeJawaban: "pilihan-ganda",
    generateSoal() {
      const a = randInt(2, 12);
      const b = randInt(1, 30);
      const pola = randInt(1, 7);

      let teks, benar, salah;

      switch (pola) {
        case 1:
          teks = `\\text{Jumlah suatu bilangan } x \\text{ dengan } ${b}`;
          benar = `x+${b}`;
          salah = [`x-${b}`, `${b}-x`, `${b}x`];
          break;
        case 2:
          teks = `\\text{Suatu bilangan } x \\text{ dikurangi } ${b}`;
          benar = `x-${b}`;
          salah = [`${b}-x`, `x+${b}`, `${b}x`];
          break;
        case 3:
          teks = `${b} \\text{ dikurangi suatu bilangan } x`;
          benar = `${b}-x`;
          salah = [`x-${b}`, `x+${b}`, `${b}x`];
          break;
        case 4:
          teks = `\\text{Hasil kali } ${a} \\text{ dengan suatu bilangan } x`;
          benar = `${a}x`;
          salah = [`x+${a}`, `x-${a}`, `\\frac{x}{${a}}`];
          break;
        case 5:
          teks = `\\text{Suatu bilangan } x \\text{ dibagi } ${a}`;
          benar = `\\frac{x}{${a}}`;
          salah = [`\\frac{${a}}{x}`, `${a}x`, `x-${a}`];
          break;
        case 6:
          teks = `${a} \\text{ kali suatu bilangan } x\\text{, ditambah } ${b}`;
          benar = `${a}x+${b}`;
          salah = [`${a}x-${b}`, `${a}(x+${b})`, `${a}+${b}x`];
          break;
        default:
          teks = `${a} \\text{ kali suatu bilangan } x\\text{, dikurangi } ${b}`;
          benar = `${a}x-${b}`;
          salah = [`${a}x+${b}`, `${b}-${a}x`, `${a}(x-${b})`];
          break;
      }

      return {
        pertanyaan: `${teks}\\text{, ditulis sebagai ekspresi aljabar} = \\ldots`,
        jawaban: benar,
        pilihan: shuffleArray([benar, ...salah]),
        penjelasan: "Kata kunci: jumlah/tambah → +, kurang/dikurangi → −, kali → ×, bagi → ÷. Perhatikan urutan angka dan variabel sesuai kalimat"
      };
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
