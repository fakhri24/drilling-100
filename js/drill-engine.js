// drill-engine.js — Core drill engine
// Generates soal, checks answers, manages progress, saves to Firestore

/**
 * Generate angka random dalam range [min, max]
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Acak urutan array (Fisher-Yates) — dipakai untuk mengacak posisi
 * pilihan jawaban pada kompetensi bertipe "pilihan-ganda"
 */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Ambil satu elemen acak dari array
 */
function pilihAcak(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
   * @param {string} config.id - kompetensi id, e.g. "01a"
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
      pilihanArea: document.getElementById("pilihan-area"),
    };

    // Set judul
    if (this.els.judulKompetensi) {
      this.els.judulKompetensi.textContent = this.config.nama;
    }

    // Load existing progres from Firestore
    const progres = await getProgres(user.uid, this.config.id);

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

    // Focus input (kompetensi pilihan-ganda tidak punya input teks)
    if (this.config.tipeJawaban !== "pilihan-ganda") {
      this.els.jawabanInput.focus();
    }
  }

  /**
   * Generate dan render soal berikutnya
   */
  renderSoal() {
    this.soalSekarang = this.config.generateSoal();
    this.soalStartTime = Date.now();

    // KaTeX membungkus satu ekspresi jadi satu span nowrap raksasa (tidak
    // per-kata), jadi kalimat panjang (mis. 06b) tidak bisa dibuat wrap
    // lewat KaTeX sama sekali — pernah dicoba paksa lewat CSS, hasilnya
    // malah kepotong asal di tengah kata. Kompetensi yang menandai dirinya
    // config.pertanyaanHtml jadi di-render sebagai HTML biasa (bukan
    // katex.render) supaya teksnya wrap alami seperti paragraf normal.
    if (this.config.pertanyaanHtml) {
      this.els.pertanyaan.innerHTML = this.soalSekarang.pertanyaan;
    } else {
      katex.render(this.soalSekarang.pertanyaan, this.els.pertanyaan, {
        throwOnError: false,
        displayMode: true,
      });
    }
    // Re-trigger animasi fade-in: elemen pertanyaan di-reuse tiap soal
    // (bukan dibuat baru), jadi class-nya perlu dilepas & dipasang lagi
    // dengan reflow paksa di antaranya
    this.els.pertanyaan.classList.remove("soal-animate");
    void this.els.pertanyaan.offsetWidth;
    this.els.pertanyaan.classList.add("soal-animate");
    this.els.btnNext.style.display = "none";
    this.els.feedbackArea.innerHTML = "";

    if (this.config.tipeJawaban === "pilihan-ganda") {
      this.renderPilihanGanda();
    } else {
      this.renderInputNumerik();
    }

    // Update counter & progress bar
    this.els.drillCounter.textContent = `${this.soalIndex} / ${this.totalSoal}`;
    this.els.progressFill.style.width = `${(this.soalIndex / this.totalSoal) * 100}%`;
  }

  /**
   * Render mode input angka (default) — sembunyikan area pilihan
   */
  renderInputNumerik() {
    this.els.pilihanArea.style.display = "none";
    this.els.pilihanArea.innerHTML = "";
    // "" (bukan "block") supaya balik ke default UA inline-block — kalau
    // dipaksa "block", text-align:center di .soal-card tidak lagi bisa
    // menengahkan elemennya (block box tidak di-center oleh text-align).
    this.els.jawabanInput.style.display = "";
    this.els.jawabanInput.value = "";
    this.els.jawabanInput.disabled = false;
    this.els.jawabanInput.focus();
    this.els.btnJawab.style.display = "inline-block";
  }

  /**
   * Render mode pilihan-ganda — sembunyikan input teks, buat tombol
   * dari config.generateSoal().pilihan (array string LaTeX)
   */
  renderPilihanGanda() {
    this.els.jawabanInput.style.display = "none";
    this.els.btnJawab.style.display = "none";
    this.els.pilihanArea.style.display = "grid";
    this.els.pilihanArea.innerHTML = "";

    this.soalSekarang.pilihan.forEach((opsi) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-pilihan";
      btn.dataset.value = opsi;
      katex.render(opsi, btn, { throwOnError: false, displayMode: false });
      btn.addEventListener("click", () => this.pilihJawaban(opsi, btn));
      this.els.pilihanArea.appendChild(btn);
    });
  }

  /**
   * Handle klik tombol pilihan — grading berbasis kecocokan string,
   * bukan angka (dipakai kompetensi seperti 6b yang jawabannya ekspresi)
   */
  async pilihJawaban(opsi, btnEl) {
    const semuaBtn = Array.from(this.els.pilihanArea.querySelectorAll("button"));
    semuaBtn.forEach((b) => (b.disabled = true));

    const benar = opsi === this.soalSekarang.jawaban;
    semuaBtn.forEach((b) => {
      if (b.dataset.value === this.soalSekarang.jawaban) b.classList.add("pilihan-benar");
    });
    if (!benar) btnEl.classList.add("pilihan-salah");

    await this.finalizeJawaban(opsi, benar);
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
    this.els.jawabanInput.disabled = true;
    await this.finalizeJawaban(jawabanSiswa, benar);
  }

  /**
   * Grading sudah selesai (numerik atau pilihan-ganda) — simpan jawaban,
   * tampilkan feedback, dan cek penyelesaian. Dipakai bersama oleh
   * submitJawaban() (mode input angka) & pilihJawaban() (mode pilihan-ganda).
   */
  async finalizeJawaban(jawabanSiswa, benar) {
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

    // Show feedback. Untuk pilihan-ganda, jawaban yang benar sudah
    // di-highlight hijau di tombolnya sendiri, jadi tidak perlu diulang di sini.
    const isPilihanGanda = this.config.tipeJawaban === "pilihan-ganda";
    if (benar) {
      this.els.feedbackArea.innerHTML = `
        <div class="feedback benar">
          ✅ Benar!
          <div class="penjelasan">${this.soalSekarang.penjelasan || ""}</div>
        </div>`;
    } else if (isPilihanGanda) {
      this.els.feedbackArea.innerHTML = `
        <div class="feedback salah">
          ❌ Salah
          <div class="penjelasan">${this.soalSekarang.penjelasan || ""}</div>
        </div>`;
    } else {
      this.els.feedbackArea.innerHTML = `
        <div class="feedback salah">
          ❌ Salah — Jawaban: <strong>${fmtJawabanDisplay(this.soalSekarang.jawaban)}</strong>
          <div class="penjelasan">${this.soalSekarang.penjelasan || ""}</div>
        </div>`;
    }

    // Show next button
    this.els.btnJawab.style.display = "none";
    this.els.btnNext.style.display = "inline-block";
    // Tunda focus() ke tick berikutnya supaya tidak "menyatu" dengan event
    // Enter yang sedang diproses (beberapa browser bisa menganggap Enter
    // yang sama langsung mengklik tombol yang baru saja dapat fokus)
    setTimeout(() => this.els.btnNext.focus(), 0);

    // Auto-save ke Firestore. Dulu tidak ada try/catch di sini — kalau
    // saveJawaban() gagal (mis. ditolak Firestore rules), errornya hilang
    // tanpa jejak: feedback "Benar!" tetap tampil padahal progres TIDAK
    // pernah tersimpan. Sekarang kalau gagal, tampilkan peringatan supaya
    // siswa tahu progresnya belum aman.
    try {
      await saveJawaban(this.user.uid, this.config.id, this.soalIndex - 1, data);
    } catch (err) {
      console.error("Gagal simpan progres ke Firestore:", err);
      this.els.feedbackArea.innerHTML += `
        <div class="feedback salah" style="margin-top:8px">
          ⚠️ Progres GAGAL tersimpan (${err.code || err.message}). Jangan tutup halaman ini.
        </div>`;
    }

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
