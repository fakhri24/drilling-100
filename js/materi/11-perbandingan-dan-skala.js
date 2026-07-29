// 11-perbandingan-dan-skala.js
// 4 kompetensi kecil — Perbandingan dan Skala

const KOMPETENSI_11 = [
  // ─────────────────────────────────────────────
  // 11a. Menyederhanakan Perbandingan
  // ─────────────────────────────────────────────
  {
    id: "11a",
    nama: "Menyederhanakan Perbandingan",
    deskripsi: "Bagi kedua nilai dengan FPB-nya",
    totalSoal: 100,
    generateSoal() {
      const sb = randInt(2, 12);
      let sa;
      do {
        sa = randInt(1, sb - 1);
      } while (gcd(sa, sb) !== 1);
      const k = randInt(2, 6);
      const a = sa * k;
      const b = sb * k;
      return {
        pertanyaan: `${a} : ${b} = \\ldots : ${sb}`,
        jawaban: sa,
        penjelasan: `Bagi kedua nilai dengan FPB(${a}, ${b}) = ${k}`
      };
    }
  },

  // ─────────────────────────────────────────────
  // 11b. Perbandingan Senilai
  // ─────────────────────────────────────────────
  {
    id: "11b",
    nama: "Perbandingan Senilai",
    deskripsi: "Kalikan kedua ruas dengan faktor yang sama",
    totalSoal: 100,
    generateSoal() {
      const a = randInt(1, 12);
      const b = randInt(1, 12);
      const m = randInt(2, 8);
      const c = a * m;
      const d = b * m;
      return {
        pertanyaan: `${a} : ${b} = ${c} : \\ldots`,
        jawaban: d,
        penjelasan: "Perbandingan senilai: kalikan kedua ruas dengan faktor yang sama"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 11c. Perbandingan Berbalik Nilai
  // ─────────────────────────────────────────────
  {
    id: "11c",
    nama: "Perbandingan Berbalik Nilai",
    deskripsi: "Berbalik nilai: hasil kali kedua nilai selalu tetap",
    totalSoal: 100,
    generateSoal() {
      const a1 = randInt(2, 12);
      const b1 = randInt(2, 12);
      const k = a1 * b1;
      const faktorK = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) faktorK.push(i);
      const a2 = faktorK[randInt(0, faktorK.length - 1)];
      const b2 = k / a2;
      return {
        pertanyaan: `${a1} \\times ${b1} = ${a2} \\times \\ldots`,
        jawaban: b2,
        penjelasan: "Berbalik nilai: hasil kali kedua nilai selalu tetap"
      };
    }
  },

  // ─────────────────────────────────────────────
  // 11d. Skala Peta
  // ─────────────────────────────────────────────
  {
    id: "11d",
    nama: "Skala Peta",
    deskripsi: "Jarak sebenarnya = jarak pada peta × skala",
    totalSoal: 100,
    generateSoal() {
      const skala = randInt(2, 20) * 500;
      const jp = randInt(1, 10);
      const jawaban = jp * skala;
      return {
        pertanyaan: `\\text{Skala peta } 1 : ${skala} \\text{. Jarak pada peta } ${jp} \\text{ cm, jarak sebenarnya } = \\ldots \\text{ cm}`,
        jawaban: jawaban,
        penjelasan: "Jarak sebenarnya = jarak pada peta × skala"
      };
    }
  }
];
