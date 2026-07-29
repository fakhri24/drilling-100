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
      const n = randInt(4, 100);
      let sisa = n;
      let terbesar = 1;
      let d = 2;
      while (d * d <= sisa) {
        while (sisa % d === 0) {
          terbesar = d;
          sisa = sisa / d;
        }
        d++;
      }
      if (sisa > 1) terbesar = sisa;

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
