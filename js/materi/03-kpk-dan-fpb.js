// 03-kpk-dan-fpb.js
// 4 kompetensi kecil — KPK dan FPB

const KOMPETENSI_03 = [
  // ─────────────────────────────────────────────
  // 3a. Faktorisasi Prima
  // ─────────────────────────────────────────────
  {
    id: "03a",
    nama: "Faktorisasi Prima",
    deskripsi: "Uraikan bilangan jadi perkalian faktor-faktor prima",
    totalSoal: 100,
    generateSoal() {
      // Jawaban (faktor prima terbesar) dipilih dari pool berbobot supaya
      // prima kecil (2,3,5,7) jauh lebih sering muncul daripada prima besar
      // (11-19) — siswa paling terbiasa dengan yang kecil, kadang sampai 19
      // tapi nilainya tidak pernah terlalu besar.
      const primaKecil = [2, 3, 5, 7, 11, 13, 17, 19];
      const bobotPool = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 5, 5, 5, 5, 7, 7, 7, 7, 11, 11, 13, 13, 17, 19];
      const terbesar = bobotPool[randInt(0, bobotPool.length - 1)];
      // Faktor kedua: prima apa saja yang <= terbesar, supaya "terbesar"
      // benar-benar jadi faktor prima terbesar dari n
      const kandidatKedua = primaKecil.filter(p => p <= terbesar);
      const p2 = kandidatKedua[randInt(0, kandidatKedua.length - 1)];
      const n = terbesar * p2;

      return {
        pertanyaan: `\\text{Faktor prima terbesar dari } ${n} = \\ldots`,
        jawaban: terbesar,
        penjelasan: `Uraikan ${n} jadi perkalian faktor prima, ambil yang terbesar`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 3b. Menghitung FPB
  // ─────────────────────────────────────────────
  {
    id: "03b",
    nama: "Menghitung FPB",
    deskripsi: "FPB = faktor sekutu terbesar dari dua bilangan",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 60);
      const b = randInt(2, 60);
      return {
        pertanyaan: `\\text{FPB}(${a}, ${b}) = \\ldots`,
        jawaban: gcd(a, b),
        penjelasan: "FPB: faktor sekutu terbesar dari kedua bilangan"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 3c. Menghitung KPK
  // ─────────────────────────────────────────────
  {
    id: "03c",
    nama: "Menghitung KPK",
    deskripsi: "KPK = (a × b) ÷ FPB(a, b)",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 30);
      const b = randInt(2, 30);
      return {
        pertanyaan: `\\text{KPK}(${a}, ${b}) = \\ldots`,
        jawaban: (a * b) / gcd(a, b),
        penjelasan: "KPK = (a × b) ÷ FPB(a, b)"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 3d. Hubungan FPB × KPK = a × b
  // ─────────────────────────────────────────────
  {
    id: "03d",
    nama: "Hubungan FPB × KPK",
    deskripsi: "FPB(a,b) × KPK(a,b) = a × b",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 30);
      const b = randInt(2, 30);
      const fpb = gcd(a, b);
      return {
        pertanyaan: `\\text{Jika FPB}(${a}, ${b}) = ${fpb} \\text{, maka KPK}(${a}, ${b}) = \\ldots`,
        jawaban: (a * b) / fpb,
        penjelasan: "FPB × KPK = a × b, jadi KPK = (a × b) ÷ FPB"
      };
    }
  }
];
