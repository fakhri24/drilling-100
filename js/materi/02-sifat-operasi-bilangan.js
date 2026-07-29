// 02-sifat-operasi-bilangan.js
// 4 kompetensi kecil — Sifat Operasi Bilangan

const KOMPETENSI_02 = [
  // ─────────────────────────────────────────────
  // 2a. Sifat Komutatif
  // ─────────────────────────────────────────────
  {
    id: "02a",
    nama: "Sifat Komutatif",
    deskripsi: "a + b = b + a, dan a × b = b × a — urutan bisa ditukar",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 50);
      const b = randInt(1, 50);
      const pakaiKali = Math.random() > 0.5;
      const op = pakaiKali ? "\\times" : "+";
      return {
        pertanyaan: `${a} ${op} ${b} = ${b} ${op} \\ldots`,
        jawaban: a,
        penjelasan: "Sifat komutatif: urutan bilangan bisa ditukar, hasil tetap sama"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 2b. Sifat Asosiatif
  // ─────────────────────────────────────────────
  {
    id: "02b",
    nama: "Sifat Asosiatif",
    deskripsi: "(a+b)+c = a+(b+c), dan (a×b)×c = a×(b×c) — pengelompokan bisa diubah",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 20);
      const b = randInt(1, 20);
      const c = randInt(1, 20);
      const pakaiKali = Math.random() > 0.5;
      const op = pakaiKali ? "\\times" : "+";
      return {
        pertanyaan: `(${a} ${op} ${b}) ${op} ${c} = ${a} ${op} (${b} ${op} \\ldots)`,
        jawaban: c,
        penjelasan: "Sifat asosiatif: pengelompokan bisa diubah, hasil tetap sama"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 2c. Sifat Distributif
  // ─────────────────────────────────────────────
  {
    id: "02c",
    nama: "Sifat Distributif",
    deskripsi: "a × (b ± c) = (a × b) ± (a × c)",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 15);
      const b = randInt(2, 20);
      const c = randInt(2, 20);
      const kurang = Math.random() > 0.5;
      const op = kurang ? "-" : "+";
      const jawaban = kurang ? a * (b - c) : a * (b + c);
      return {
        pertanyaan: `${a} \\times (${b} ${op} ${c}) = \\ldots`,
        jawaban: jawaban,
        penjelasan: `Sifat distributif: ${a} × (${b} ${op} ${c}) = (${a}×${b}) ${op} (${a}×${c})`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 2d. Identitas & Invers
  // ─────────────────────────────────────────────
  {
    id: "02d",
    nama: "Identitas & Invers",
    deskripsi: "Identitas: a+0=a, a×1=a. Invers jumlah: a+(-a)=0",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 50);
      const tipe = randInt(1, 3);

      if (tipe === 1) {
        return {
          pertanyaan: `${a} + \\ldots = 0`,
          jawaban: -a,
          penjelasan: "Invers jumlah: a + (-a) = 0"
        };
      } else if (tipe === 2) {
        return {
          pertanyaan: `${a} + \\ldots = ${a}`,
          jawaban: 0,
          penjelasan: "Identitas jumlah: a + 0 = a"
        };
      } else {
        return {
          pertanyaan: `${a} \\times \\ldots = ${a}`,
          jawaban: 1,
          penjelasan: "Identitas kali: a × 1 = a"
        };
      }
    }
  }
];
