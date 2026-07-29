// 12-pembulatan-dan-estimasi.js
// 4 kompetensi kecil — Pembulatan dan Estimasi

const KOMPETENSI_12 = [
  // ─────────────────────────────────────────────
  // 12a. Pembulatan Bilangan Bulat
  // ─────────────────────────────────────────────
  {
    id: "12a",
    nama: "Pembulatan Bilangan Bulat",
    deskripsi: "Lihat angka setelah tempat yang diminta: ≥5 bulat naik, <5 bulat turun",
    totalSoal: 100,
    generateSoal() {
      const unitList = [10, 100, 1000];
      const unit = unitList[randInt(0, unitList.length - 1)];
      const unitNama = { 10: "puluhan", 100: "ratusan", 1000: "ribuan" }[unit];
      const n = randInt(unit, unit * 99);
      const jawaban = Math.round(n / unit) * unit;
      return {
        pertanyaan: `\\text{Bulatkan } ${n} \\text{ ke ${unitNama} terdekat } = \\ldots`,
        jawaban: jawaban,
        penjelasan: `Lihat angka setelah tempat ${unitNama}: ≥5 bulat naik, <5 bulat turun`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 12b. Pembulatan Desimal
  // ─────────────────────────────────────────────
  {
    id: "12b",
    nama: "Pembulatan Desimal",
    deskripsi: "Lihat digit setelah tempat desimal yang diminta",
    totalSoal: 100,
    generateSoal() {
      const places = randInt(1, 2);
      const raw = randInt(1, 9999) / 1000;
      const factor = Math.pow(10, places);
      const jawaban = Math.round(raw * factor) / factor;
      return {
        pertanyaan: `\\text{Bulatkan } ${fmtDecimal(raw)} \\text{ ke } ${places} \\text{ angka desimal } = \\ldots`,
        jawaban: jawaban,
        penjelasan: "Lihat digit setelah tempat yang diminta: ≥5 bulat naik, <5 bulat turun"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 12c. Taksiran Hasil Operasi (terbaik/atas/bawah)
  // ─────────────────────────────────────────────
  {
    id: "12c",
    nama: "Taksiran Hasil Operasi",
    deskripsi: "Bulatkan tiap bilangan ke puluhan terdekat (taksiran terbaik/atas/bawah), baru operasikan",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(11, 89);
      const b = randInt(11, 89);
      const tipe = randInt(1, 3);
      const namaTipe = { 1: "terbaik", 2: "atas", 3: "bawah" }[tipe];
      const bulat = (n) => {
        if (tipe === 1) return Math.round(n / 10) * 10;
        if (tipe === 2) return Math.ceil(n / 10) * 10;
        return Math.floor(n / 10) * 10;
      };
      const ra = bulat(a);
      const rb = bulat(b);
      const jawaban = ra + rb;
      return {
        pertanyaan: `\\text{Taksiran ${namaTipe}: } ${a} + ${b} \\approx \\ldots`,
        jawaban: jawaban,
        penjelasan: `Bulatkan tiap bilangan ke puluhan terdekat (taksiran ${namaTipe}: ${ra} + ${rb})`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 12d. Estimasi Praktis
  // ─────────────────────────────────────────────
  {
    id: "12d",
    nama: "Estimasi Praktis",
    deskripsi: "Bulatkan tiap bilangan ke puluhan terdekat, baru jumlahkan",
    totalSoal: 100,
    generateSoal() {
      const n = randInt(3, 4);
      const nums = [];
      for (let i = 0; i < n; i++) nums.push(randInt(10, 990));
      const rounded = nums.map(x => Math.round(x / 10) * 10);
      const jawaban = rounded.reduce((s, x) => s + x, 0);
      return {
        pertanyaan: `\\text{Taksir jumlah (bulatkan ke puluhan terdekat): } ${nums.join(" + ")} \\approx \\ldots`,
        jawaban: jawaban,
        penjelasan: "Bulatkan tiap bilangan ke puluhan terdekat, baru jumlahkan"
      };
    }
  }
];
