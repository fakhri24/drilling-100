// E3-merasionalkan-penyebut.js
// 4 kompetensi kecil — Merasionalkan Penyebut
//
// Pola diturunkan dari arsip-data/bank_soal_all.json (sub_materi
// "Merasionalkan Penyebut", 28 soal). Topik ini TIDAK dibahas di
// belajar-eksponen.
//
// Urutannya sengaja: E3b (hasil kali sekawan) ditaruh SEBELUM E3c/E3d karena
// itulah langkah yang bikin merasionalkan bentuk a ± √b berhasil. Siswa yang
// belum otomatis mengenali (a+√b)(a−√b) = a² − b akan tersendat di dua
// kompetensi berikutnya.

const E3_BEBAS_KUADRAT = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
const E3_PRIMA = [2, 3, 5, 7, 11, 13];

const KOMPETENSI_E3 = [
  // ─────────────────────────────────────────────
  // E3a. Penyebut Akar Tunggal
  // ─────────────────────────────────────────────
  {
    id: "E3a",
    nama: "Penyebut Akar Tunggal",
    deskripsi: "a/√b dikali √b/√b → penyebutnya jadi b",
    totalSoal: 100,
    generateSoal() {
      const b = pilihAcak(E3_PRIMA);
      const k = randInt(2, 9);
      const a = k * b; // dijamin habis dibagi b, jadi hasilnya koefisien bulat
      return {
        pertanyaan: `\\frac{${a}}{\\sqrt{${b}}} = \\ldots\\sqrt{${b}}`,
        jawaban: k,
        penjelasan: `Kalikan √${b}/√${b}: ${a}√${b} / ${b} = ${k}√${b}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E3b. Hasil Kali Bentuk Sekawan
  // ─────────────────────────────────────────────
  {
    id: "E3b",
    nama: "Hasil Kali Bentuk Sekawan",
    deskripsi: "(a+√b)(a−√b) = a² − b — akarnya hilang, tersisa bilangan bulat",
    totalSoal: 100,
    generateSoal() {
      const akarDiDepan = Math.random() > 0.5;

      if (akarDiDepan) {
        // (√a + b)(√a − b) = a − b²
        const a = pilihAcak(E3_BEBAS_KUADRAT);
        const b = randInt(2, 4);
        return {
          pertanyaan: `\\left(\\sqrt{${a}} + ${b}\\right)\\left(\\sqrt{${a}} - ${b}\\right) = \\ldots`,
          jawaban: a - b * b,
          penjelasan: `Selisih dua kuadrat: (√${a})² − ${b}² = ${a} − ${b * b} = ${a - b * b}`,
        };
      }

      // (a + √b)(a − √b) = a² − b
      const a = randInt(2, 12);
      const b = pilihAcak(E3_BEBAS_KUADRAT);
      return {
        pertanyaan: `\\left(${a} + \\sqrt{${b}}\\right)\\left(${a} - \\sqrt{${b}}\\right) = \\ldots`,
        jawaban: a * a - b,
        penjelasan: `Selisih dua kuadrat: ${a}² − (√${b})² = ${a * a} − ${b} = ${a * a - b}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E3c. Penyebut a ± √b
  // ─────────────────────────────────────────────
  {
    id: "E3c",
    nama: "Penyebut a ± √b",
    deskripsi: "Kalikan sekawannya — tanda di tengah dibalik",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 8);
      // b < a² supaya penyebut barunya (a² − b) positif; jawaban negatif
      // bukan salah secara matematika, tapi di sini yang sedang didril
      // langkah sekawannya, bukan aritmatika tanda.
      const kandidat = E3_BEBAS_KUADRAT.filter((n) => n < a * a);
      const b = pilihAcak(kandidat);
      const penyebutBaru = a * a - b;
      const k = randInt(2, 6);
      const p = k * penyebutBaru; // dijamin habis dibagi, hasilnya bulat

      const tambah = Math.random() > 0.5;
      const opPenyebut = tambah ? "+" : "-";
      const opHasil = tambah ? "-" : "+";
      return {
        pertanyaan: `\\frac{${p}}{${a} ${opPenyebut} \\sqrt{${b}}} = \\ldots\\left(${a} ${opHasil} \\sqrt{${b}}\\right)`,
        jawaban: k,
        penjelasan: `Kalikan sekawan (${a} ${opHasil === "-" ? "−" : "+"} √${b}). Penyebut jadi ${a}² − ${b} = ${penyebutBaru}, lalu ${p} ÷ ${penyebutBaru} = ${k}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E3d. Penyebut √a ± √b
  // ─────────────────────────────────────────────
  {
    id: "E3d",
    nama: "Penyebut √a ± √b",
    deskripsi: "Sekawan dua akar: (√a−√b)(√a+√b) = a − b",
    totalSoal: 100,
    generateSoal() {
      let a = pilihAcak(E3_BEBAS_KUADRAT);
      let b = pilihAcak(E3_BEBAS_KUADRAT);
      while (b >= a) {
        a = pilihAcak(E3_BEBAS_KUADRAT);
        b = pilihAcak(E3_BEBAS_KUADRAT);
      }
      const penyebutBaru = a - b;
      const k = randInt(2, 6);
      const p = k * penyebutBaru;

      const kurang = Math.random() > 0.5;
      const opPenyebut = kurang ? "-" : "+";
      const opHasil = kurang ? "+" : "-";
      return {
        pertanyaan: `\\frac{${p}}{\\sqrt{${a}} ${opPenyebut} \\sqrt{${b}}} = \\ldots\\left(\\sqrt{${a}} ${opHasil} \\sqrt{${b}}\\right)`,
        jawaban: k,
        penjelasan: `Kalikan sekawan (√${a} ${opHasil === "-" ? "−" : "+"} √${b}). Penyebut jadi ${a} − ${b} = ${penyebutBaru}, lalu ${p} ÷ ${penyebutBaru} = ${k}`,
      };
    },
  },
];
