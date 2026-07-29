// 07-manipulasi-aljabar-dasar.js
// 5 kompetensi kecil — Manipulasi Aljabar Dasar

const KOMPETENSI_07 = [
  // ─────────────────────────────────────────────
  // 7a. Menggabungkan Suku Sejenis
  // ─────────────────────────────────────────────
  {
    id: "07a",
    nama: "Menggabungkan Suku Sejenis",
    deskripsi: "ax + bx = (a+b)x — jumlahkan koefisiennya",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 20);
      const b = randInt(1, 20);
      const kurang = Math.random() > 0.5 && a > b;
      const op = kurang ? "-" : "+";
      const jawaban = kurang ? a - b : a + b;
      return {
        pertanyaan: `${a}x ${op} ${b}x = \\ldots x`,
        jawaban: jawaban,
        penjelasan: "Suku sejenis (sama-sama x) → operasikan koefisiennya saja"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 7b. Penjumlahan/Pengurangan Bentuk Aljabar
  // ─────────────────────────────────────────────
  {
    id: "07b",
    nama: "Tambah/Kurang Bentuk Aljabar",
    deskripsi: "Gabungkan suku-x dengan suku-x, konstanta dengan konstanta",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 15);
      const c = randInt(1, 15);
      const d = randInt(1, 20);
      const b = randInt(d, d + 20); // pastikan b >= d, konstanta hasil tidak negatif
      const kurang = Math.random() > 0.5;
      const op = kurang ? "-" : "+";
      const constResult = kurang ? b - d : b + d;
      const jawaban = kurang ? a - c : a + c;
      return {
        pertanyaan: `(${a}x + ${b}) ${op} (${c}x + ${d}) = \\ldots x + ${constResult}`,
        jawaban: jawaban,
        penjelasan: "Gabungkan suku sejenis: suku-x dengan suku-x, konstanta dengan konstanta"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 7c. Sifat Distributif dalam Aljabar (expand)
  // ─────────────────────────────────────────────
  {
    id: "07c",
    nama: "Sifat Distributif Aljabar",
    deskripsi: "a(bx ± c) = abx ± ac",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 12);
      const b = randInt(2, 10);
      const c = randInt(2, 20);
      const kurang = Math.random() > 0.5;
      const op = kurang ? "-" : "+";
      return {
        pertanyaan: `${a}(${b}x ${op} ${c}) = \\ldots x ${op} ${a * c}`,
        jawaban: a * b,
        penjelasan: `Kalikan ${a} ke setiap suku di dalam kurung`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 7d. Faktorisasi (kebalikan distributif)
  // ─────────────────────────────────────────────
  {
    id: "07d",
    nama: "Faktorisasi",
    deskripsi: "Cari faktor sekutu dari koefisien x dan konstanta",
    totalSoal: 100,
    generateSoal() {
      const k = randInt(2, 10);
      const b = randInt(2, 10);
      const c = randInt(2, 15);
      const p = k * b;
      const q = k * c;
      const kurang = Math.random() > 0.5;
      const op = kurang ? "-" : "+";
      return {
        pertanyaan: `${p}x ${op} ${q} = ${k}(\\ldots x ${op} ${c})`,
        jawaban: b,
        penjelasan: `Faktor sekutu dari ${p} dan ${q} adalah ${k}`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 7e. Perkalian Suku dengan Suku
  // ─────────────────────────────────────────────
  {
    id: "07e",
    nama: "Perkalian Suku dengan Suku",
    deskripsi: "Kalikan koefisien, kalikan/jumlahkan pangkat variabel",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(2, 12);
      const b = randInt(2, 12);
      const tipe = randInt(1, 2);

      if (tipe === 1) {
        return {
          pertanyaan: `${a}x \\times ${b}x = \\ldots x^2`,
          jawaban: a * b,
          penjelasan: "Kalikan koefisien, kalikan variabel: x × x = x²"
        };
      } else {
        return {
          pertanyaan: `${a}x \\times ${b} = \\ldots x`,
          jawaban: a * b,
          penjelasan: "Kalikan koefisien dengan konstanta, variabel tetap"
        };
      }
    }
  }
];
