// drill-engine.js — Core drill engine
// Generates soal, checks answers, manages progress, saves to Firestore

/**
 * Generate angka random dalam range [min, max]
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * FPB (greatest common divisor) dua bilangan bulat positif
 */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Format angka jadi string LaTeX dengan koma desimal (konvensi Indonesia)
 * Contoh: 0.75 -> "0{,}75" (braces supaya KaTeX tidak kasih spasi list-separator)
 */
function fmtDecimal(n) {
  return String(n).replace(".", "{,}");
}

/**
 * Format angka jawaban untuk ditampilkan di feedback (bukan LaTeX) —
 * bulatkan noise floating-point & pakai koma desimal
 */
function fmtJawabanDisplay(n) {
  const rounded = Math.round(n * 10000) / 10000;
  return String(rounded).replace(".", ",");
}

/**
 * Parse jawaban siswa ke angka.
 * Toleransi: koma sebagai desimal ("0,5"), dan pecahan ("1/2", "-3/4")
 * @returns {number|null}
 */
function parseJawaban(input) {
  if (!input || input.trim() === "") return null;
  const cleaned = input.trim().replace(",", ".");

  if (cleaned.includes("/")) {
    const [pembilang, penyebut] = cleaned.split("/");
    const num = parseFloat(pembilang);
    const denom = parseFloat(penyebut);
    if (isNaN(num) || isNaN(denom) || denom === 0) return null;
    return num / denom;
  }

  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Cek apakah jawaban benar. Toleransi 0.006 supaya jawaban yang dibulatkan
 * ke 2 desimal (untuk kompetensi dengan hasil desimal berulang) DAN jawaban
 * pecahan eksak yang lebih presisi sama-sama diterima benar.
 */
function cekJawaban(jawabanSiswa, jawabanBenar) {
  return Math.abs(jawabanSiswa - jawabanBenar) < 0.006;
}

/**
 * DrillEngine — manages a single drill session (1 kompetensi × 100 soal)
 */
class DrillEngine {
  /**
   * @param {object} config
   * @param {string} config.kompetensiId - e.g. "01a"
   * @param {string} config.nama - display name
   * @param {string} config.deskripsi - short description
   * @param {number} config.totalSoal - default 100
   * @param {function} config.generateSoal - () => { pertanyaan, jawaban, penjelasan }
   */
  constructor(config) {
    this.config = config;
    this.totalSoal = config.totalSoal || 100;
    this.soalIndex = 0;
    this.soalSekarang = null;
    this.benarCount = 0;
    this.salahCount = 0;
    this.jawabanList = [];
    this.startTime = null;
    this.soalStartTime = null;
    this.user = null;

    // DOM elements (will be set in init)
    this.els = {};
  }

  /**
   * Initialize the engine — called after DOM ready
   */
  async init(user) {
    this.user = user;

    // Cache DOM elements
    this.els = {
      loading: document.getElementById("loading"),
      drillArea: document.getElementById("drill-area"),
      hasilArea: document.getElementById("hasil-area"),
      pertanyaan: document.getElementById("pertanyaan"),
      jawabanInput: document.getElementById("jawaban-input"),
      btnJawab: document.getElementById("btn-jawab"),
      btnNext: document.getElementById("btn-next"),
      drillCounter: document.getElementById("drill-counter"),
      progressFill: document.getElementById("progress-fill"),
      feedbackArea: document.getElementById("feedback-area"),
      judulKompetensi: document.getElementById("judul-kompetensi"),
    };

    // Set judul
    if (this.els.judulKompetensi) {
      this.els.judulKompetensi.textContent = this.config.nama;
    }

    // Load existing progres from Firestore
    const progres = await getProgres(user.uid, this.config.kompetensiId);

    if (progres && progres.jawaban) {
      this.jawabanList = progres.jawaban;
      this.benarCount = progres.totalBenar || 0;
      this.salahCount = progres.totalSalah || 0;
      this.soalIndex = this.jawabanList.length;

      if (this.soalIndex >= this.totalSoal) {
        // Sudah selesai sebelumnya — tampilkan hasil
        this.showHasil();
        return;
      }
    }

    this.startTime = Date.now();

    // Generate soal pertama (atau lanjut)
    this.renderSoal();

    // Show drill area
    this.els.loading.style.display = "none";
    this.els.drillArea.style.display = "block";

    // Focus input
    this.els.jawabanInput.focus();
  }

  /**
   * Generate dan render soal berikutnya
   */
  renderSoal() {
    this.soalSekarang = this.config.generateSoal();
    this.soalStartTime = Date.now();

    katex.render(this.soalSekarang.pertanyaan, this.els.pertanyaan, {
      throwOnError: false,
      displayMode: true,
    });
    this.els.jawabanInput.value = "";
    this.els.jawabanInput.disabled = false;
    this.els.jawabanInput.focus();
    this.els.btnJawab.style.display = "inline-block";
    this.els.btnNext.style.display = "none";
    this.els.feedbackArea.innerHTML = "";

    // Update counter & progress bar
    this.els.drillCounter.textContent = `${this.soalIndex} / ${this.totalSoal}`;
    this.els.progressFill.style.width = `${(this.soalIndex / this.totalSoal) * 100}%`;
  }

  /**
   * Submit jawaban — cek, feedback, simpan
   */
  async submitJawaban() {
    const input = this.els.jawabanInput.value;
    const jawabanSiswa = parseJawaban(input);

    if (jawabanSiswa === null) {
      this.els.feedbackArea.innerHTML = `
        <div class="feedback salah">
          Masukkan angka yang valid
        </div>`;
      return;
    }

    const benar = cekJawaban(jawabanSiswa, this.soalSekarang.jawaban);
    const waktuMs = Date.now() - this.soalStartTime;

    // Update counters
    if (benar) this.benarCount++;
    else this.salahCount++;

    // Simpan jawaban
    const data = {
      pertanyaan: this.soalSekarang.pertanyaan,
      jawabanSiswa: jawabanSiswa,
      jawabanBenar: this.soalSekarang.jawaban,
      benar: benar,
      waktuMs: waktuMs
    };
    this.jawabanList.push(data);
    this.soalIndex++;

    // Show feedback
    if (benar) {
      this.els.feedbackArea.innerHTML = `
        <div class="feedback benar">
          ✅ Benar!
          <div class="penjelasan">${this.soalSekarang.penjelasan || ""}</div>
        </div>`;
    } else {
      this.els.feedbackArea.innerHTML = `
        <div class="feedback salah">
          ❌ Salah — Jawaban: <strong>${fmtJawabanDisplay(this.soalSekarang.jawaban)}</strong>
          <div class="penjelasan">${this.soalSekarang.penjelasan || ""}</div>
        </div>`;
    }

    // Disable input, show next button
    this.els.jawabanInput.disabled = true;
    this.els.btnJawab.style.display = "none";
    this.els.btnNext.style.display = "inline-block";
    this.els.btnNext.focus();

    // Auto-save ke Firestore
    await saveJawaban(this.user.uid, this.config.kompetensiId, this.soalIndex - 1, data);

    // Cek apakah sudah selesai
    if (this.soalIndex >= this.totalSoal) {
      // Update progress bar ke 100%
      this.els.progressFill.style.width = "100%";
      this.els.drillCounter.textContent = `${this.totalSoal} / ${this.totalSoal}`;

      // Ganti tombol "Soal Berikutnya" jadi "Lihat Hasil"
      this.els.btnNext.textContent = "Lihat Hasil →";
      this.els.btnNext.onclick = () => this.showHasil();
    }
  }

  /**
   * Lanjut ke soal berikutnya
   */
  nextSoal() {
    this.renderSoal();
  }

  /**
   * Tampilkan ringkasan akhir
   */
  showHasil() {
    this.els.drillArea.style.display = "none";
    this.els.hasilArea.style.display = "block";

    const akurasi = this.totalSoal > 0
      ? Math.round((this.benarCount / this.totalSoal) * 100) : 0;

    document.getElementById("skor-besar").textContent = this.benarCount;
    document.getElementById("stat-benar").textContent = this.benarCount;
    document.getElementById("stat-salah").textContent = this.salahCount;
    document.getElementById("stat-akurasi").textContent = akurasi + "%";
  }
}
