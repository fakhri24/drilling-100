// E2-operasi-bentuk-akar.js
// 5 kompetensi kecil — Operasi Bentuk Akar
//
// Pola diturunkan dari arsip-data/bank_soal_all.json (sub_materi "Operasi
// Bentuk Akar", 28 soal). Topik ini TIDAK dibahas di belajar-eksponen, jadi
// bank soal LMS satu-satunya rujukan polanya.
//
// Angka di dalam akar selalu dijaga BEBAS KUADRAT (tidak punya faktor kuadrat
// sempurna selain 1). Kalau tidak dijaga, mis. √2 × √6 = √12, jawaban "benar"
// versi generator (√12) ternyata masih bisa disederhanakan jadi 2√3 — siswa
// yang menyederhanakan sampai tuntas malah dinilai salah.

const E2_BEBAS_KUADRAT = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
const E2_PRIMA = [2, 3, 5, 7, 11, 13];

const KOMPETENSI_E2 = [
  // ─────────────────────────────────────────────
  // E2a. Menyederhanakan Bentuk Akar
  // ─────────────────────────────────────────────
  {
    id: "E2a",
    nama: "Menyederhanakan Bentuk Akar",
    deskripsi: "√(a²·b) = a√b — keluarkan faktor kuadrat sempurnanya",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 9);
      const b = pilihAcak(E2_BEBAS_KUADRAT);
      const n = a * a * b;
      return {
        pertanyaan: `\\sqrt{${n}} = \\ldots\\sqrt{${b}}`,
        jawaban: a,
        penjelasan: `${n} = ${a * a} × ${b}, dan √${a * a} = ${a}. Jadi √${n} = ${a}√${b}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E2b. Tambah/Kurang Akar Sejenis
  // ─────────────────────────────────────────────
  {
    id: "E2b",
    nama: "Tambah/Kurang Akar Sejenis",
    deskripsi: "a√c ± b√c = (a±b)√c — akarnya harus sama persis",
    totalSoal: 100,
    generateSoal() {
      const c = pilihAcak(E2_BEBAS_KUADRAT);
      const a = randInt(3, 15);
      const b = randInt(2, a - 1); // b < a supaya versi pengurangan tetap positif
      const kurang = Math.random() > 0.5;
      const op = kurang ? "-" : "+";
      return {
        pertanyaan: `${a}\\sqrt{${c}} ${op} ${b}\\sqrt{${c}} = \\ldots\\sqrt{${c}}`,
        jawaban: kurang ? a - b : a + b,
        penjelasan: `Akarnya sama (√${c}), jadi cukup koefisiennya yang dioperasikan: ${a} ${kurang ? "−" : "+"} ${b}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E2c. Perkalian Bentuk Akar
  // ─────────────────────────────────────────────
  {
    id: "E2c",
    nama: "Perkalian Bentuk Akar",
    deskripsi: "a√p × b√q = ab√(pq) — koefisien × koefisien, akar × akar",
    totalSoal: 100,
    generateSoal() {
      const p = pilihAcak(E2_PRIMA);
      let q = pilihAcak(E2_PRIMA);
      while (q === p) q = pilihAcak(E2_PRIMA); // p ≠ q supaya pq tetap bebas kuadrat
      const a = randInt(2, 7);
      const b = randInt(2, 7);
      return {
        pertanyaan: `${a}\\sqrt{${p}} \\times ${b}\\sqrt{${q}} = \\ldots\\sqrt{${p * q}}`,
        jawaban: a * b,
        penjelasan: `Koefisien dikali koefisien (${a} × ${b} = ${a * b}), akar dikali akar (√${p} × √${q} = √${p * q})`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E2d. Kuadrat Bentuk Akar
  // ─────────────────────────────────────────────
  {
    id: "E2d",
    nama: "Kuadrat Bentuk Akar",
    deskripsi: "(√a ± √b)² = (a+b) ± 2√(ab) — jangan lupa suku tengahnya",
    totalSoal: 100,
    generateSoal() {
      const a = pilihAcak(E2_PRIMA);
      let b = pilihAcak(E2_PRIMA);
      while (b === a) b = pilihAcak(E2_PRIMA);
      const kurang = Math.random() > 0.5;
      const op = kurang ? "-" : "+";
      return {
        pertanyaan: `\\left(\\sqrt{${a}} ${op} \\sqrt{${b}}\\right)^2 = \\ldots ${op} 2\\sqrt{${a * b}}`,
        jawaban: a + b,
        penjelasan: `(√${a} ${kurang ? "−" : "+"} √${b})² = ${a} ${kurang ? "−" : "+"} 2√${a * b} + ${b}. Bagian tanpa akar: ${a} + ${b} = ${a + b}`,
      };
    },
  },

  // ─────────────────────────────────────────────
  // E2e. Sederhanakan Dulu, Baru Jumlahkan
  // ─────────────────────────────────────────────
  {
    id: "E2e",
    nama: "Sederhanakan Dulu, Baru Jumlahkan",
    deskripsi: "√50 + √18 tampak beda, padahal dua-duanya kelipatan √2",
    totalSoal: 100,
    generateSoal() {
      const b = pilihAcak(E2_BEBAS_KUADRAT);
      const k1 = randInt(3, 7);
      const k2 = randInt(2, k1 - 1); // k2 < k1 supaya versi pengurangan tetap positif
      const n1 = k1 * k1 * b;
      const n2 = k2 * k2 * b;
      const kurang = Math.random() > 0.5;
      const op = kurang ? "-" : "+";
      return {
        pertanyaan: `\\sqrt{${n1}} ${op} \\sqrt{${n2}} = \\ldots\\sqrt{${b}}`,
        jawaban: kurang ? k1 - k2 : k1 + k2,
        penjelasan: `√${n1} = ${k1}√${b} dan √${n2} = ${k2}√${b}. Setelah disederhanakan akarnya sama, jadi ${k1} ${kurang ? "−" : "+"} ${k2}`,
      };
    },
  },
];
