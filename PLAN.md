# Drilling-100 — PLAN.md

## Timeline & Fase Pengerjaan

### FASE 0: Setup & Foundation (Hari 1) ✅
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

### FASE 1: Auth & Navigation (Hari 1-2) ✅
- [ ] `login.html` — UI login (Google button + email form)
- [ ] `js/auth.js` — Auth state listener, redirect logic
- [ ] `index.html` — Landing page, daftar 12 materi (grid card)
- [ ] Route protection: kalau belum login, redirect ke login
- [ ] User profile disimpan ke Firestore saat first login

**Deliverable**: Siswa bisa login, lihat daftar materi

**Username Flow**: Setelah login pertama kali → redirect ke halaman setup username → cek keunikan di Firestore → simpan → redirect ke dashboard. Dashboard tampilkan "Selamat datang, {username}!"

---

### FASE 2: Drill Engine Core (Hari 2-3) ✅
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

### FASE 3: Materi 01-04 (Hari 3-5) ✅
- [x] `01-operasi-aritmatika-dasar.js` (6 kompetensi)
  - 1a: Penjumlahan tanda sama — pola `(±a) + (±b) = ?`
  - 1b: Penjumlahan tanda beda — pola `(±a) + (∓b) = ?`
  - 1c: Pengurangan — pola `(±a) - (±b) = ?` (ubah ke penjumlahan)
  - 1d: Perkalian tanda — pola `(±a) × (±b) = ?`
  - 1e: Pembagian tanda — pola `(±a) ÷ (±b) = ?`
  - 1f: PEMDAS campuran — pola `a ± b × (c ± d) = ?`
- [x] `02-sifat-operasi-bilangan.js` (4 kompetensi)
  - 2a: Komutatif — pola isi-titik-titik `a op b = b op ...` (numerik, bukan pilihan ganda — lihat catatan di bawah)
  - 2b: Asosiatif — pola isi-titik-titik `(a op b) op c = a op (b op ...)`
  - 2c: Distributif — "Selesaikan: a × (b ± c) = ?"
  - 2d: Identitas & Invers — "Berapa a + ? = 0", "a + ? = a", atau "a × ? = a"
- [x] `03-kpk-dan-fpb.js` (4 kompetensi)
  - 3a: Faktorisasi prima — "Faktor prima terbesar dari N = ?"
  - 3b: FPB — "FPB(a, b) = ?"
  - 3c: KPK — "KPK(a, b) = ?"
  - 3d: Hubungan — "Jika FPB(a,b) = ..., maka KPK(a,b) = ?"
- [x] `04-operasi-pecahan.js` (6 kompetensi)
  - 4a: Sederhanakan — pola isi-titik-titik `a/b = .../sb` (sb sudah dalam bentuk sederhana)
  - 4b: Tambah/kurang sejenis — "a/c + b/c = ?"
  - 4c: Tambah/kurang tak sejenis — "a/b + c/d = ?"
  - 4d: Kali pecahan — "a/b × c/d = ?"
  - 4e: Bagi pecahan — "a/b ÷ c/d = ?"
  - 4f: Campuran → biasa — pola isi-titik-titik `whole a/b = .../b`

**Deliverable**: 20 kompetensi pertama siap, 2000 soal bisa di-drill ✅

**Catatan desain**: 2a/2b awalnya direncanakan sebagai soal pilihan ganda konseptual ("pilih operasi yang melanggar sifat..."), tapi direformulasi jadi pola isi-titik-titik numerik supaya konsisten dengan engine drill yang cuma support input angka (belum ada UI pilihan ganda). Keputusan yang sama berlaku nanti untuk 08c (kasus khusus PLSV) kalau butuh jawaban non-angka.

---

### FASE 4: Materi 05-08 (Hari 5-7) ✅
- [x] `05-operasi-konversi-desimal.js` (5 kompetensi)
- [x] `06-pengenalan-variabel.js` (2 kompetensi — 6b di-skip, lihat catatan)
- [x] `07-manipulasi-aljabar-dasar.js` (5 kompetensi)
- [x] `08-plsv.js` (3 kompetensi — 8c pakai kode numerik 0/1/2, lihat catatan)

**Deliverable**: 34 kompetensi siap (36 dikurangi 6b yang di-skip), 3400 soal ✅

**Catatan desain**:
- **6b (Menyusun Ekspresi dari Kalimat) di-skip.** Kompetensi ini butuh kalimat verbal + jawaban berupa ekspresi aljabar (bukan angka tunggal), bentrok dengan aturan "TIDAK ada soal cerita" dan dengan engine yang cuma menilai jawaban numerik. Perlu keputusan desain lebih lanjut (mis. UI pilihan ganda/expression-checker) sebelum bisa digarap.
- **8c (Kasus Khusus PLSV)** direformulasi jadi klasifikasi numerik: siswa menjawab kode `0` (tidak ada solusi), `1` (satu solusi), atau `2` (tak terhingga solusi). Legenda kode selalu ditampilkan inline di soal.
- Semua soal materi 05-08 sudah di-stress-test (2000 iterasi/kompetensi) untuk noise floating-point di angka desimal dan bug tanda-ganda pada template LaTeX — 0 masalah ditemukan.

---

### FASE 5: Materi 09-12 (Hari 7-9) ✅
- [x] `09-spldv.js` (2 kompetensi)
- [x] `10-persentase.js` (4 kompetensi)
- [x] `11-perbandingan-dan-skala.js` (4 kompetensi)
- [x] `12-pembulatan-dan-estimasi.js` (4 kompetensi)

**Deliverable**: 48 kompetensi siap (semua materi 01-12 kecuali 6b), 4800 soal ✅

**Catatan desain**: beberapa kompetensi direformulasi dari deskripsi asli di atas supaya cocok dengan engine numerik satu-jawaban & aturan "tanpa soal cerita":
- **9a/9b (SPLDV)**: sistem 2 persamaan ditampilkan, tapi tiap soal cuma minta nilai x ATAU y (bukan pasangan (x,y) sekaligus).
- **11c (Perbandingan Berbalik Nilai)**: direformulasi jadi pola "hasil kali tetap" (`a×b=c×...`) tanpa konteks cerita (pekerja/hari dll).
- **11d (Skala Peta)** & **10d (Kenaikan/Penurunan Persentase)**: pakai instruksi abstrak langsung (bukan narasi/skenario) — dianggap masih dalam batas "tanpa soal cerita" karena tidak ada tokoh/plot, cuma terminologi matematika standar.
- **12d (Estimasi Praktis)**: dijadikan "taksir jumlah beberapa bilangan" generik, tanpa konteks belanja spesifik seperti draf awal.

**Bug ditemukan & diperbaiki**: di 12a & 12c, kata Indonesia yang di-interpolasi (mis. "puluhan", "terbaik") sempat taruh di luar blok `\text{}` LaTeX, bikin KaTeX render tiap huruf sebagai variabel matematika miring alih-alih teks biasa. Semua materi 09-12 sudah divalidasi render KaTeX-nya secara visual + stress test 3000 iterasi/kompetensi (0 masalah setelah fix).

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
- **Rendering soal pakai KaTeX** (CDN, di `drill.html`): field `pertanyaan` di semua materi HARUS berupa string LaTeX murni (tanpa delimiter `$...$`), contoh: `` `${a} + ${b} = \\ldots` `` atau `` `\\frac{${a}}{${b}} + \\frac{${c}}{${d}} = \\ldots` ``. Engine render pakai `katex.render(..., {displayMode: true})`.
- **Input jawaban tetap fleksibel** — `parseJawaban()` di `drill-engine.js` terima desimal (`0.5` / `0,5`) maupun pecahan (`1/2`, `-3/4`). Siswa TIDAK perlu input LaTeX.

## Future Features (Bukan Sekarang)

- [ ] **Admin Dashboard** — Halaman admin untuk melihat progres semua siswa
      - Daftar siswa dengan filter per kelas
      - Progres per materi & kompetensi per siswa
      - Export data ke CSV/spreadsheet
      - Butuh role system di Firestore (admin vs siswa)
      - Delay sampai core drill engine stabil & beberapa siswa sudah pakai
