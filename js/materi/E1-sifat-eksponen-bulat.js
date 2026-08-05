// E1-sifat-eksponen-bulat.js
// 6 kompetensi kecil — Sifat Eksponen Bilangan Bulat
//
// Pola diturunkan dari arsip-data/bank_soal_all.json (sub_materi "Sifat
// Eksponen Bilangan Bulat", 40 soal) + seksi "Sifat-Sifat" belajar-eksponen.
// Semua soal dirancang supaya jawabannya SATU ANGKA — yang dikosongkan cuma
// pangkat atau koefisiennya, bukan seluruh bentuk aljabarnya. Jadi yang
// didril aturannya, bukan kemampuan mengetik LaTeX.

const E1_BASIS_HURUF = ["a", "b", "p", "m", "x", "y"];
const E1_BASIS_ANGKA = [2, 3, 5, 7];

/** Basis acak: kadang huruf, kadang angka — supaya siswa tidak terpaku satu bentuk */
function e1Basis() {
  return Math.random() > 0.5
    ? pilihAcak(E1_BASIS_HURUF)
    : String(pilihAcak(E1_BASIS_ANGKA));
}

const KOMPETENSI_E1 = [
  // ─────────────────────────────────────────────
  // E1a. Perkalian Basis Sama
  // ─────────────────────────────────────────────
  {
    id: "E1a",
    nama: "Perkalian Basis Sama",
    deskripsi: "aᵐ × aⁿ = aᵐ⁺ⁿ — basis sama, pangkat dijumlahkan",
    totalSoal: 100,
    generateSoal() {
      const basis = e1Basis();
      const m = randInt(2, 12);
      const n = randInt(2, 12);
      // Sesekali tiga faktor, supaya siswa tidak menghafal "selalu dua angka"
      const tigaFaktor = Math.random() > 0.75;
      const k = randInt(2, 8);

      if (tigaFaktor) {
        return {
          pertanyaan: `${basis}^{${m}} \\times ${basis}^{${n}} \\times ${basis}^{${k}} = ${basis}^{\\ldots}`,
          jawaban: m + n + k,
          penjelasan: `Basis sama → semua pangkat dijumlahkan: ${m} + ${n} + ${k}`,
        };
      }
      return {
        pertanyaan: `${basis}^{${m}} \\times ${basis}^{${n}} = ${basis}^{\\ldots}`,
        jawaban: m + n,
        penjelasan: `Basis sama → pangkat dijumlahkan: ${m} + ${n}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E1b. Pembagian Basis Sama
  // ─────────────────────────────────────────────
  {
    id: "E1b",
    nama: "Pembagian Basis Sama",
    deskripsi: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ — pangkat dikurangkan (boleh negatif)",
    totalSoal: 100,
    generateSoal() {
      const basis = e1Basis();
      const m = randInt(2, 15);
      const n = randInt(2, 15);
      return {
        pertanyaan: `\\frac{${basis}^{${m}}}{${basis}^{${n}}} = ${basis}^{\\ldots}`,
        jawaban: m - n,
        penjelasan: `Pangkat atas dikurangi pangkat bawah: ${m} − ${n} = ${m - n}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E1c. Pangkat dari Pangkat
  // ─────────────────────────────────────────────
  {
    id: "E1c",
    nama: "Pangkat dari Pangkat",
    deskripsi: "(aᵐ)ⁿ = aᵐⁿ — pangkat dikalikan, BUKAN dijumlahkan",
    totalSoal: 100,
    generateSoal() {
      const basis = e1Basis();
      const m = randInt(2, 9);
      const n = randInt(2, 6);
      // Sesekali bertingkat tiga: ((a^m)^n)^k
      const bertingkat = Math.random() > 0.8;
      const k = randInt(2, 4);

      if (bertingkat) {
        return {
          pertanyaan: `\\left(\\left(${basis}^{${m}}\\right)^{${n}}\\right)^{${k}} = ${basis}^{\\ldots}`,
          jawaban: m * n * k,
          penjelasan: `Pangkat bertingkat → semuanya dikalikan: ${m} × ${n} × ${k}`,
        };
      }
      return {
        pertanyaan: `\\left(${basis}^{${m}}\\right)^{${n}} = ${basis}^{\\ldots}`,
        jawaban: m * n,
        penjelasan: `Pangkat dari pangkat → dikalikan: ${m} × ${n} = ${m * n}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E1d. Pangkat Negatif
  // ─────────────────────────────────────────────
  {
    id: "E1d",
    nama: "Pangkat Negatif",
    deskripsi: "a⁻ⁿ = 1/aⁿ — pangkat negatif artinya kebalikan",
    totalSoal: 100,
    generateSoal() {
      const basis = pilihAcak([2, 3, 4, 5, 6, 7]);
      const n = randInt(2, 4);
      const nilai = Math.pow(basis, n);
      // Bentuk kebalikan: 1/a^(-n) = a^n
      const kebalikan = Math.random() > 0.6;

      if (kebalikan) {
        return {
          pertanyaan: `\\frac{1}{${basis}^{-${n}}} = \\ldots`,
          jawaban: nilai,
          penjelasan: `Pangkat negatif di penyebut naik jadi positif: 1 / ${basis}<sup>−${n}</sup> = ${basis}<sup>${n}</sup> = ${nilai}`,
        };
      }
      return {
        pertanyaan: `${basis}^{-${n}} = \\frac{1}{\\ldots}`,
        jawaban: nilai,
        penjelasan: `${basis}<sup>−${n}</sup> = 1 / ${basis}<sup>${n}</sup>, dan ${basis}<sup>${n}</sup> = ${nilai}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E1e. Pangkat dari Perkalian
  // ─────────────────────────────────────────────
  {
    id: "E1e",
    nama: "Pangkat dari Perkalian",
    deskripsi: "(a·xᵐ)ⁿ = aⁿ·xᵐⁿ — koefisiennya ikut dipangkatkan",
    totalSoal: 100,
    generateSoal() {
      const v = pilihAcak(E1_BASIS_HURUF);
      const a = randInt(2, 5);
      const m = randInt(2, 4);
      const n = randInt(2, 4);
      return {
        pertanyaan: `\\left(${a}${v}^{${m}}\\right)^{${n}} = \\ldots\\, ${v}^{${m * n}}`,
        jawaban: Math.pow(a, n),
        penjelasan: `Koefisien ikut dipangkatkan: ${a}<sup>${n}</sup> = ${Math.pow(a, n)}. Kesalahan tersering: menulis ${a}${v}<sup>${m * n}</sup> — koefisiennya lupa dipangkatkan`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E1f. Mencari Pangkat yang Hilang
  // ─────────────────────────────────────────────
  {
    id: "E1f",
    nama: "Mencari Pangkat yang Hilang",
    deskripsi: "Ubah ruas kanan jadi pangkat basis yang sama, lalu samakan",
    totalSoal: 100,
    generateSoal() {
      const basis = pilihAcak([2, 3, 4, 5]);
      // Batasi supaya nilainya tidak jadi angka raksasa yang tak terbaca
      const maksPangkat = basis === 2 ? 10 : basis === 3 ? 6 : 5;
      const e = randInt(2, maksPangkat);
      const nilai = Math.pow(basis, e);
      const negatif = Math.random() > 0.7;

      if (negatif) {
        return {
          pertanyaan: `${basis}^{x} = \\frac{1}{${nilai}}`,
          jawaban: -e,
          penjelasan: `${nilai} = ${basis}<sup>${e}</sup>, jadi 1/${nilai} = ${basis}<sup>−${e}</sup> → x = −${e}`,
        };
      }
      return {
        pertanyaan: `${basis}^{x} = ${nilai}`,
        jawaban: e,
        penjelasan: `${nilai} = ${basis}<sup>${e}</sup>, jadi x = ${e}`,
      };
    },
  },
];
