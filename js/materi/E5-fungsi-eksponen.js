// E5-fungsi-eksponen.js
// 5 kompetensi kecil — Fungsi Eksponen
//
// Pola diturunkan dari arsip-data/bank_soal_all.json (sub_materi "Fungsi
// Eksponen", 26 soal) + seksi "Nilai Fungsi" & "Persamaan" belajar-eksponen.
//
// Soal model pertumbuhan/peluruhan yang ada di bank soal SENGAJA tidak
// dipakai di sini: CLAUDE.md aturan 9 melarang soal cerita di drilling
// ("fokus hitungan murni"). Konteksnya tetap diuji di LMS lewat bank soal
// itu sendiri; di sini yang dilatih mekanismenya.

const KOMPETENSI_E5 = [
  // ─────────────────────────────────────────────
  // E5a. Nilai Fungsi f(x) = k·aˣ
  // ─────────────────────────────────────────────
  {
    id: "E5a",
    nama: "Nilai Fungsi f(x) = k·aˣ",
    deskripsi: "Substitusi x, pangkatkan dulu, baru dikalikan k",
    totalSoal: 100,
    generateSoal() {
      const k = randInt(2, 9);
      const a = pilihAcak([2, 3, 4, 5]);
      const n = randInt(1, 4);
      return {
        pertanyaan: `f(x) = ${k} \\cdot ${a}^{x} \\quad \\Rightarrow \\quad f(${n}) = \\ldots`,
        jawaban: k * Math.pow(a, n),
        penjelasan: `${a}<sup>${n}</sup> = ${Math.pow(a, n)}, lalu dikali ${k} → ${k * Math.pow(a, n)}. Ingat: yang dipangkatkan cuma ${a}, bukan ${k}${a}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E5b. Nilai Fungsi Pangkat Negatif
  // ─────────────────────────────────────────────
  {
    id: "E5b",
    nama: "Nilai Fungsi Pangkat Negatif",
    deskripsi: "f(−n) → hasilnya pecahan, karena a⁻ⁿ = 1/aⁿ",
    totalSoal: 100,
    generateSoal() {
      const k = randInt(2, 9);
      const a = pilihAcak([2, 3, 4, 5]);
      const n = a >= 4 ? 2 : randInt(1, 2);
      const penyebut = Math.pow(a, n);
      return {
        pertanyaan: `f(x) = ${k} \\cdot ${a}^{x} \\quad \\Rightarrow \\quad f(-${n}) = \\ldots`,
        jawaban: k / penyebut,
        penjelasan: `${a}<sup>−${n}</sup> = 1/${penyebut}, jadi hasilnya ${k}/${penyebut}. Boleh ditulis sebagai pecahan.`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E5c. Persamaan Basis Sama
  // ─────────────────────────────────────────────
  {
    id: "E5c",
    nama: "Persamaan Basis Sama",
    deskripsi: "Basis sama di kedua ruas → pangkatnya boleh langsung disamakan",
    totalSoal: 100,
    generateSoal() {
      const a = pilihAcak([2, 3, 5, 7]);
      const m = randInt(2, 5);
      const b = randInt(1, 9);
      const x = randInt(1, 6);
      const c = m * x + b;
      return {
        pertanyaan: `${a}^{${m}x + ${b}} = ${a}^{${c}}`,
        jawaban: x,
        penjelasan: `Basis sama → ${m}x + ${b} = ${c}, jadi ${m}x = ${c - b} dan x = ${x}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E5d. Menyamakan Basis
  // ─────────────────────────────────────────────
  {
    id: "E5d",
    nama: "Menyamakan Basis",
    deskripsi: "Ubah kedua ruas ke basis prima yang sama dulu",
    totalSoal: 100,
    generateSoal() {
      const p = pilihAcak([2, 3, 5]);
      const maksJ = p === 2 ? 8 : p === 3 ? 6 : 4;
      const i = randInt(2, 3); // basis kiri selalu p^i, bukan p sendiri
      const j = randInt(2, maksJ);
      const basisKiri = Math.pow(p, i);
      const ruasKanan = Math.pow(p, j);
      return {
        pertanyaan: `${basisKiri}^{x} = ${ruasKanan}`,
        jawaban: j / i,
        penjelasan: `${basisKiri} = ${p}<sup>${i}</sup> dan ${ruasKanan} = ${p}<sup>${j}</sup>, jadi ${i}x = ${j} dan x = ${j}/${i}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E5e. Variabel di Kedua Ruas
  // ─────────────────────────────────────────────
  {
    id: "E5e",
    nama: "Variabel di Kedua Ruas",
    deskripsi: "aˣ = (aᵏ)^(x±p) — samakan basis, lalu selesaikan seperti PLSV",
    totalSoal: 100,
    generateSoal() {
      const a = pilihAcak([2, 3, 5]);
      const k = pilihAcak([2, 3]);
      // k = 3 butuh p genap supaya x-nya tetap bilangan bulat
      const p = k === 3 ? pilihAcak([2, 4, 6]) : randInt(1, 6);
      const basisKanan = Math.pow(a, k);
      const kurang = Math.random() > 0.5;

      if (kurang) {
        // a^x = (a^k)^(x-p) → x = k(x-p) → x = kp/(k-1)
        const x = (k * p) / (k - 1);
        return {
          pertanyaan: `${a}^{x} = ${basisKanan}^{x - ${p}}`,
          jawaban: x,
          penjelasan: `${basisKanan} = ${a}<sup>${k}</sup>, jadi x = ${k}(x − ${p}) → x = ${k}x − ${k * p} → ${k - 1}x = ${k * p} → x = ${x}`,
        };
      }
      // a^x = (a^k)^(x+p) → x = k(x+p) → x = -kp/(k-1)
      const x = -(k * p) / (k - 1);
      return {
        pertanyaan: `${a}^{x} = ${basisKanan}^{x + ${p}}`,
        jawaban: x,
        penjelasan: `${basisKanan} = ${a}<sup>${k}</sup>, jadi x = ${k}(x + ${p}) → x = ${k}x + ${k * p} → ${k - 1}x = −${k * p} → x = ${x}`,
      };
    },
  },
];
