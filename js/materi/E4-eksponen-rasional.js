// E4-eksponen-rasional.js
// 5 kompetensi kecil — Eksponen Rasional (Pangkat Pecahan)
//
// Pola diturunkan dari arsip-data/bank_soal_all.json (sub_materi "Eksponen
// Rasional (Pangkat Pecahan)", 22 soal). Di belajar-eksponen topik ini cuma
// disinggung satu kalimat ("akar hanyalah pangkat pecahan"), jadi rujukan
// polanya dari bank soal.
//
// E4a jawabannya PECAHAN — parseJawaban() di drill-engine menerima "3/4"
// maupun "0,75", jadi dua-duanya dinilai benar.

const E4_BASIS_HURUF = ["a", "b", "p", "x", "y"];

const KOMPETENSI_E4 = [
  // ─────────────────────────────────────────────
  // E4a. Akar → Pangkat Pecahan
  // ─────────────────────────────────────────────
  {
    id: "E4a",
    nama: "Akar → Pangkat Pecahan",
    deskripsi: "ⁿ√(aᵐ) = a^(m/n) — pangkat dalam jadi pembilang, indeks akar jadi penyebut",
    totalSoal: 100,
    generateSoal() {
      const v = pilihAcak(E4_BASIS_HURUF);
      const n = randInt(2, 5);
      const m = randInt(2, 7);
      const akar = n === 2 ? `\\sqrt{${v}^{${m}}}` : `\\sqrt[${n}]{${v}^{${m}}}`;
      return {
        pertanyaan: `${akar} = ${v}^{\\ldots}`,
        jawaban: m / n,
        penjelasan: `Pangkat di dalam (${m}) jadi pembilang, indeks akar (${n}) jadi penyebut → ${m}/${n}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E4b. Menghitung Akar Pangkat n
  // ─────────────────────────────────────────────
  {
    id: "E4b",
    nama: "Menghitung Akar Pangkat n",
    deskripsi: "ⁿ√N — cari bilangan yang kalau dipangkatkan n hasilnya N",
    totalSoal: 100,
    generateSoal() {
      const n = pilihAcak([2, 3, 4, 5]);
      // Batasi supaya N-nya masih bilangan yang wajar dibaca siswa
      const maksK = n === 2 ? 25 : n === 3 ? 10 : n === 4 ? 6 : 4;
      const k = randInt(2, maksK);
      const N = Math.pow(k, n);
      const akar = n === 2 ? `\\sqrt{${N}}` : `\\sqrt[${n}]{${N}}`;
      return {
        pertanyaan: `${akar} = \\ldots`,
        jawaban: k,
        penjelasan: `${k}<sup>${n}</sup> = ${N}, jadi akar pangkat ${n} dari ${N} adalah ${k}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E4c. Nilai a^(m/n)
  // ─────────────────────────────────────────────
  {
    id: "E4c",
    nama: "Nilai a^(m/n)",
    deskripsi: "a^(m/n) = (ⁿ√a)ᵐ — akarkan dulu, baru pangkatkan",
    totalSoal: 100,
    generateSoal() {
      // m tidak boleh habis dibagi n — kalau iya, pangkatnya bukan pecahan
      // lagi dan soalnya tampil konyol seperti 36^(4/2). Batas k dipilih per
      // pasangan (m, n) supaya basis maupun jawabannya tetap terbaca.
      const [n, m, maksK] = pilihAcak([
        [2, 3, 9],
        [2, 5, 4],
        [3, 2, 8],
        [3, 4, 5],
      ]);
      const k = randInt(2, maksK);
      const basis = Math.pow(k, n); // basisnya dijamin pangkat n sempurna
      return {
        pertanyaan: `${basis}^{\\frac{${m}}{${n}}} = \\ldots`,
        jawaban: Math.pow(k, m),
        penjelasan: `Akar pangkat ${n} dari ${basis} adalah ${k}, lalu dipangkatkan ${m}: ${k}<sup>${m}</sup> = ${Math.pow(k, m)}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E4d. Pangkat Pecahan Negatif
  // ─────────────────────────────────────────────
  {
    id: "E4d",
    nama: "Pangkat Pecahan Negatif",
    deskripsi: "a^(−m/n) = 1 / a^(m/n) — balik dulu, baru hitung",
    totalSoal: 100,
    generateSoal() {
      // Sama seperti E4c: m tidak boleh habis dibagi n
      const [n, m, maksK] = pilihAcak([
        [2, 1, 9],
        [2, 3, 6],
        [3, 1, 8],
        [3, 2, 8],
        [3, 4, 5],
      ]);
      const k = randInt(2, maksK);
      const basis = Math.pow(k, n);
      return {
        pertanyaan: `${basis}^{-\\frac{${m}}{${n}}} = \\frac{1}{\\ldots}`,
        jawaban: Math.pow(k, m),
        penjelasan: `Tanda minus artinya kebalikan. Akar pangkat ${n} dari ${basis} = ${k}, dipangkatkan ${m} jadi ${Math.pow(k, m)}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E4e. Menyederhanakan √(aⁿ)
  // ─────────────────────────────────────────────
  {
    id: "E4e",
    nama: "Menyederhanakan √(aⁿ)",
    deskripsi: "√(a^ganjil) — pasangkan dua-dua, sisa satu tetap di dalam akar",
    totalSoal: 100,
    generateSoal() {
      const b = pilihAcak([2, 3, 5, 6, 7, 10]);
      // b^k dijaga <= 1000 supaya jawabannya tetap angka yang masuk akal
      const maksK = b <= 5 ? 4 : 3;
      const k = randInt(1, maksK);
      const e = 2 * k + 1; // pangkat ganjil: selalu menyisakan satu di dalam akar
      // Koefisien di depan akar — tanpa ini variasinya cuma ~20 soal berbeda
      // untuk 100 kali pengulangan, terlalu cepat hafal di luar kepala
      const c = randInt(1, 5);
      const pangkatGenap = Math.pow(b, k);
      const jawaban = c * pangkatGenap;
      return {
        pertanyaan: `${c === 1 ? "" : c}\\sqrt{${b}^{${e}}} = \\ldots\\sqrt{${b}}`,
        jawaban: jawaban,
        penjelasan:
          `${b}<sup>${e}</sup> = ${b}<sup>${2 * k}</sup> × ${b}, dan √(${b}<sup>${2 * k}</sup>) = ${b}<sup>${k}</sup> = ${pangkatGenap}` +
          (c === 1 ? "" : `, lalu dikali koefisien ${c} → ${jawaban}`),
      };
    },
  },
];
