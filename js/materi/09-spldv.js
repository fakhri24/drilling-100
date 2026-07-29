// 09-spldv.js
// 2 kompetensi kecil — Sistem Persamaan Linear Dua Variabel
// Engine cuma nilai satu jawaban numerik, jadi tiap soal cuma minta
// nilai x ATAU y (bukan keduanya sekaligus).

const KOMPETENSI_09 = [
  // ─────────────────────────────────────────────
  // 9a. Metode Substitusi
  // ─────────────────────────────────────────────
  {
    id: "09a",
    nama: "Metode Substitusi",
    deskripsi: "Satu persamaan sudah dalam bentuk y=..., substitusikan ke persamaan lain",
    totalSoal: 100,
    generateSoal() {
      const x = randInt(-10, 10);
      const y = randInt(-10, 10);
      const c = randInt(1, 8);
      const d = randInt(1, 8);
      let a;
      do {
        a = randInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      } while (c + d * a === 0);
      const b = y - a * x;
      const e = c * x + d * y;
      const bOp = b >= 0 ? "+" : "-";

      return {
        pertanyaan: `y = ${a}x ${bOp} ${Math.abs(b)} \\text{ dan } ${c}x + ${d}y = ${e} \\text{, } x = \\ldots`,
        jawaban: x,
        penjelasan: "Substitusikan y dari persamaan pertama ke persamaan kedua, lalu selesaikan untuk x"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 9b. Metode Eliminasi
  // ─────────────────────────────────────────────
  {
    id: "09b",
    nama: "Metode Eliminasi",
    deskripsi: "Samakan koefisien salah satu variabel, kurangkan kedua persamaan",
    totalSoal: 100,
    generateSoal() {
      const x = randInt(-10, 10);
      const y = randInt(-10, 10);
      const a1 = randInt(1, 8);
      const b1 = randInt(1, 8);
      let a2, b2;
      do {
        a2 = randInt(1, 8);
        b2 = randInt(1, 8);
      } while (a1 * b2 - a2 * b1 === 0);
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x + b2 * y;
      const tanyaX = Math.random() > 0.5;

      return {
        pertanyaan: `${a1}x + ${b1}y = ${c1} \\text{ dan } ${a2}x + ${b2}y = ${c2} \\text{, } ${tanyaX ? "x" : "y"} = \\ldots`,
        jawaban: tanyaX ? x : y,
        penjelasan: "Eliminasi salah satu variabel dengan menyamakan koefisiennya, lalu kurangkan kedua persamaan"
      };
    }
  }
];
