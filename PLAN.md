# Drilling-100 — PLAN.md

## Timeline & Fase Pengerjaan

### FASE 0: Setup & Foundation (Hari 1)
- [ ] Buat GitHub repo `fakhri24/drilling-100` (public, MIT)
- [ ] Inisialisasi Firebase project baru (`drilling-100`) untuk Auth + Firestore
- [ ] Setup Firebase Auth (Google + Email/Password)
- [ ] Setup Firestore database
- [ ] Buat struktur folder & file kosong
- [ ] Buat `firebase-config.js` template
- [ ] Basic HTML boilerplate (index, login, drill, dashboard)
- [ ] Enable GitHub Pages (branch: main, folder: /)
- [ ] Push & verify site live di `fakhri24.github.io/drilling-100`

**Deliverable**: GitHub repo live, Firebase terkonfigurasi, login bisa jalan

---

### FASE 1: Auth & Navigation (Hari 1-2)
- [ ] `login.html` — UI login (Google button + email form)
- [ ] `js/auth.js` — Auth state listener, redirect logic
- [ ] `index.html` — Landing page, daftar 12 materi (grid card)
- [ ] Route protection: kalau belum login, redirect ke login
- [ ] User profile disimpan ke Firestore saat first login

**Deliverable**: Siswa bisa login, lihat daftar materi

**Username Flow**: Setelah login pertama kali → redirect ke halaman setup username → cek keunikan di Firestore → simpan → redirect ke dashboard. Dashboard tampilkan "Selamat datang, {username}!"

---

### FASE 2: Drill Engine Core (Hari 2-3)
- [ ] `js/drill-engine.js` — Engine generik:
  - Terima array kompetensi, render soal satu per satu
  - Handle input jawaban (text input atau pilihan ganda)
  - Feedback benar/salah dengan visual
  - Counter soal (X/100), progress bar
  - Timer per soal & total
  - Auto-save progres ke Firestore tiap 10 soal
  - Resume dari posisi terakhir
- [ ] `drill.html` — Halaman drilling (parameterized by materi & kompetensi)
- [ ] Ringkasan akhir (skor, akurasi, waktu, grafik kecil)

**Deliverable**: Engine bisa jalan untuk 1 kompetensi dummy, lengkap

---

### FASE 3: Materi 01-04 (Hari 3-5)
- [ ] `01-operasi-aritmatika-dasar.js` (6 kompetensi)
  - 1a: Penjumlahan tanda sama — pola `(±a) + (±b) = ?`
  - 1b: Penjumlahan tanda beda — pola `(±a) + (∓b) = ?`
  - 1c: Pengurangan — pola `(±a) - (±b) = ?` (ubah ke penjumlahan)
  - 1d: Perkalian tanda — pola `(±a) × (±b) = ?`
  - 1e: Pembagian tanda — pola `(±a) ÷ (±b) = ?`
  - 1f: PEMDAS campuran — pola `a ± b × (c ± d) = ?`
- [ ] `02-sifat-operasi-bilangan.js` (4 kompetensi)
  - 2a: Komutatif — "Pilih operasi yang MELANGGAR sifat komutatif"
  - 2b: Asosiatif — "Pilih operasi yang MELANGGAR sifat asosiatif"
  - 2c: Distributif — "Selesaikan: a × (b ± c) = ?"
  - 2d: Identitas & Invers — "Berapa a + ? = 0" atau "a × ? = a"
- [ ] `03-kpk-dan-fpb.js` (4 kompetensi)
  - 3a: Faktorisasi prima — "Faktorkan bilangan N"
  - 3b: FPB — "FPB(a, b) = ?"
  - 3c: KPK — "KPK(a, b) = ?"
  - 3d: Hubungan — "FPB(8,12) × KPK(8,12) = ? × ? = ?"
- [ ] `04-operasi-pecahan.js` (6 kompetensi)
  - 4a: Sederhanakan — "Sederhanakan a/b"
  - 4b: Tambah/kurang sejenis — "a/c + b/c = ?"
  - 4c: Tambah/kurang tak sejenis — "a/b + c/d = ?"
  - 4d: Kali pecahan — "a/b × c/d = ?"
  - 4e: Bagi pecahan — "a/b ÷ c/d = ?"
  - 4f: Campuran ↔ biasa — "Ubah X jadi pecahan biasa"

**Deliverable**: 20 kompetensi pertama siap, 2000 soal bisa di-drill

---

### FASE 4: Materi 05-08 (Hari 5-7)
- [ ] `05-operasi-konversi-desimal.js` (5 kompetensi)
- [ ] `06-pengenalan-variabel.js` (3 kompetensi)
- [ ] `07-manipulasi-aljabar-dasar.js` (5 kompetensi)
- [ ] `08-plsv.js` (3 kompetensi)

**Deliverable**: 36 kompetensi siap, 3600 soal

---

### FASE 5: Materi 09-12 (Hari 7-9)
- [ ] `09-spldv.js` (2 kompetensi)
- [ ] `10-persentase.js` (4 kompetensi)
- [ ] `11-perbandingan-dan-skala.js` (4 kompetensi)
- [ ] `12-pembulatan-dan-estimasi.js` (4 kompetensi)

**Deliverable**: ~50 kompetensi siap, 5000+ soal

---

### FASE 6: Dashboard & UX Polish (Hari 9-11)
- [ ] `dashboard.html` — Progres per materi (progress bar per kompetensi)
- [ ] Statistik: total soal dikerjakan, akurasi rata-rata, streak terbaik
- [ ] Leaderboard (opsional, bisa dimatikan)
- [ ] Animasi & transisi halus
- [ ] Sound effect benar/salah (opsional, toggle)
- [ ] Dark mode toggle
- [ ] Responsive check di HP (Android & iOS)

**Deliverable**: Dashboard lengkap, UX halus

---

### FASE 7: Testing & Deploy (Hari 11-12)
- [ ] Test semua kompetensi generate soal valid
- [ ] Test jawaban benar/salah terdeteksi dengan tepat
- [ ] Test resume progres (close browser, buka lagi)
- [ ] Test di HP (Chrome, Safari)
- [ ] Firestore security rules review
- [ ] Push ke main → auto-deploy via GitHub Pages
- [ ] Test di production (`fakhri24.github.io/drilling-100`)

**Deliverable**: LIVE di GitHub Pages, siap dipakai siswa

---

## Pola Soal — Strategi Random

Setiap kompetensi punya TEMPLATE soal dengan RANDOMIZER:

```js
// Contoh: Penjumlahan tanda sama (1a)
function generateSoal() {
  const sameSign = Math.random() > 0.5; // positif atau negatif
  const a = randInt(1, 50);
  const b = randInt(1, 50);
  const sign = sameSign ? 1 : -1;
  return {
    pertanyaan: `(${sign > 0 ? '+' : '-'}${a}) + (${sign > 0 ? '+' : '-'}${b}) = ...`,
    jawaban: sign * (a + b),
    penjelasan: `Tanda sama → jumlahkan nilai mutlak, tanda tetap`
  };
}
```

Kunci: angka random tapi POLA SELALU SAMA, jadi setelah 100 soal siswa sudah hafal polanya.

## Catatan Penting

- Firebase config HARUS di-gitignore (jangan commit API key)
- Firestore rules: siswa hanya bisa baca/tulis data miliknya sendiri
- Semua perhitungan pecahan: gunakan pembilang & penyebut (bukan desimal) untuk presisi
- **Jawaban essai**: input bebas, bandingkan numerik (parse dulu ke angka)
- **Feedback langsung**: setelah submit jawaban, langsung tampilkan benar/salah + cara singkat
- **Skor hanya di akhir**: kalau siswa mengerjakan sebagian (misal 47/100), simpan progres tapi JANGAN tampilkan skor
- **Range angka kecil (1-50)**: tujuan drilling = penguasaan pola, bukan hitungan berat
- Timer: opsional tapi bagus untuk tracking — jangan jadi tekanan utama
- TIDAK ada soal cerita — semua hitungan murni berpola

## Future Features (Bukan Sekarang)

- [ ] **Admin Dashboard** — Halaman admin untuk melihat progres semua siswa
      - Daftar siswa dengan filter per kelas
      - Progres per materi & kompetensi per siswa
      - Export data ke CSV/spreadsheet
      - Butuh role system di Firestore (admin vs siswa)
      - Delay sampai core drill engine stabil & beberapa siswa sudah pakai
