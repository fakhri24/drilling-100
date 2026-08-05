# Drilling-100 — CLAUDE.md

## Apa ini?

Website latihan drilling 100 soal per kompetensi kecil untuk matematika kelas X.

Filosofi: **Pola berulang = penguasaan**. Setiap kompetensi kecil punya SATU pola soal yang diulang 100 kali dengan angka random. Tujuannya agar siswa "nempel" pola tersebut melalui repetisi masif.

Hierarkinya tiga tingkat: **materi utama → sub-materi → kompetensi kecil**.

| Materi utama | Sub-materi | Rujukan materi | Rujukan pola soal |
|---|---|---|---|
| Matrikulasi Numerasi | 12 | https://fakhri24.github.io/materi-numerasi-x/ | — |
| Eksponen | 5 | https://fakhri24.github.io/belajar-eksponen/ | `lms-matematika/arsip-data/bank_soal_all.json` |

Sub-materi kedua-duanya cermin dari tab dengan nama sama di **lms-matematika** (`public/js/utils/kurikulumData.js`), supaya progres drilling sejajar 1:1 dengan status "master" siswa di sana.

**Bank soal itu sumber POLA, bukan sumber soal.** Soal di `arsip-data` dipakai LMS untuk ujian sumatif. Kalau soalnya disalin ke drilling, ujian sumatif berubah jadi tes hafalan drilling. Yang diambil ke sini cuma bentuk polanya, angkanya digenerate ulang.

**Rujukan materi Eksponen tidak menutup semua sub-materinya.** belajar-eksponen membahas sifat eksponen & fungsi eksponen, tapi TIDAK membahas bentuk akar, merasionalkan penyebut, maupun pangkat pecahan — tiga sub-materi itu polanya murni dari bank soal LMS. Sebaliknya belajar-eksponen punya seksi Pertidaksamaan Eksponen yang tidak ada di kurikulum LMS, jadi tidak didrill di sini.

## Tech Stack

- **Frontend**: Vanilla HTML + CSS + JS (TANPA framework)
- **Backend/Auth**: Firebase (Auth + Firestore)
- **Hosting**: GitHub Pages (`fakhri24.github.io/drilling-100`)
- **Database/Auth**: Firebase (Auth + Firestore) — client-side SDK, jalan dari host manapun
- **Login**: Google OAuth + Email/Password

## Struktur Project

```
drilling-100/
├── index.html              # Beranda: tab materi utama + kartu sub-materi
├── materi.html             # Daftar kompetensi satu sub-materi (?id=01..12, E1..E5)
├── drill.html              # Halaman drilling utama (1 kompetensi = 100 soal)
├── dashboard.html          # Dashboard progres siswa
├── login.html              # Login page (Google / Email)
├── setup-username.html     # Pilih username (pertama kali login)
├── css/
│   └── style.css           # Global styles
├── js/
│   ├── firebase-config.js  # Firebase init (config dipisah)
│   ├── auth.js             # Auth logic (Google + Email)
│   ├── theme.js            # Toggle tema terang/gelap
│   ├── kurikulum.js        # SATU sumber kebenaran struktur kurikulum
│   ├── drill-engine.js     # Core drill engine (generate soal, cek jawaban, timer)
│   ├── progres.js          # Read/write progres ke Firestore
│   └── materi/
│       ├── 01-operasi-aritmatika-dasar.js  ─┐
│       ├── ...                              ├─ Matrikulasi Numerasi
│       ├── 12-pembulatan-dan-estimasi.js   ─┘
│       ├── E1-sifat-eksponen-bulat.js      ─┐
│       ├── E2-operasi-bentuk-akar.js        │
│       ├── E3-merasionalkan-penyebut.js     ├─ Eksponen
│       ├── E4-eksponen-rasional.js          │
│       └── E5-fungsi-eksponen.js           ─┘
├── tools/                  # Alat dev, tidak dipakai siswa
│   ├── cek-kurikulum.mjs           # kurikulum.js vs generator: id & nama harus sinkron
│   ├── verifikasi-soal-eksponen.mjs # hitung ulang jawaban E1-E5 dari LaTeX-nya
│   └── uji-render.html             # render semua generator lewat KaTeX, tanpa login
└── firestore.rules         # Firestore security rules
```

### `js/kurikulum.js` — jangan duplikasi daftar materi

Struktur kurikulum (materi utama → sub-materi → kompetensi: id, nama, emoji) ditulis **hanya** di `js/kurikulum.js`. `index.html`, `materi.html`, `dashboard.html`, dan `drill.html` semuanya membacanya dari sana.

Dulu keempat halaman punya salinan sendiri, dan salinannya sudah menyimpang: `dashboard.html` mengira materi 06 punya 2 kompetensi padahal sudah 3, jadi persentase progresnya salah hitung. Jangan hidupkan lagi pola itu.

**Kontrak URL:** `materi.html?id=01` … `?id=12` adalah tautan publik yang dipakai lms-matematika (`kurikulumData.js`, `TAUTAN_EKSTERNAL_MATRIKULASI_NUMERASI`) di mode formatif tab Matrikulasi Numerasi. Mengubah atau menghapus id sub-materi itu akan mematikan tombol drilling di LMS. Tab Eksponen di LMS **belum** punya tautan balik ke sini (per 2026-08-06).

### Setelah menambah/mengubah kompetensi

Wajib jalan dan hijau sebelum commit:

```
node tools/cek-kurikulum.mjs              # id & nama sinkron, totalSoal 100, tak ada yang yatim
node tools/verifikasi-soal-eksponen.mjs   # 400 soal/kompetensi dihitung ulang dari LaTeX-nya
python3 -m http.server 8791               # lalu buka /tools/uji-render.html — cek error KaTeX
```

`verifikasi-soal-eksponen.mjs` mengevaluasi ULANG string LaTeX-nya dengan jawaban disubstitusikan, jadi ia menangkap generator yang salah hitung. Ia **tidak** menangkap salah ketik notasi (perintah LaTeX-nya dibuang sebelum dihitung) — itu tugas `uji-render.html`, yang memanggil KaTeX dengan `throwOnError: true`. Dua-duanya perlu; satu saja tidak cukup.

## Materi & Kompetensi Kecil

Setiap file `materi/XX-xxx.js` mendaftarkan global `KOMPETENSI_XX` berisi array kompetensi:

```js
// Struktur tiap kompetensi:
{
  id: "01a",                // harus sama persis dengan id di js/kurikulum.js
  nama: "Penjumlahan Tanda Sama",  // nama juga harus sama persis
  deskripsi: "Jika tanda sama, jumlahkan nilai mutlak, tanda tetap",
  totalSoal: 100,
  generateSoal: () => ({ pertanyaan: "<LaTeX>", jawaban: <angka>, penjelasan: "<HTML>" }),
  tipeJawaban: "input" | "pilihan-ganda",   // default "input"
  pertanyaanHtml: true,     // opsional: render pertanyaan sebagai HTML, bukan lewat KaTeX
}
```

`pertanyaan` dirender lewat `katex.render(..., { displayMode: true })`, `penjelasan` lewat `innerHTML` (jadi pakai `<sup>` untuk pangkat di situ, bukan sintaks LaTeX).

### Jawaban simbolik: kosongkan SATU angka, jangan seluruh bentuknya

Mesin penilai cuma bisa membandingkan angka (`parseJawaban` → `cekJawaban`, toleransi 0,006; menerima `1/2` maupun `0,5`). Jadi soal yang jawaban "aslinya" simbolik dirancang supaya yang dikosongkan hanya satu angka di dalamnya:

| Bentuk asli | Ditulis jadi | Jawaban |
|---|---|---|
| $a^7 \times a^5 = a^{12}$ | `a^{7} \times a^{5} = a^{\ldots}` | `12` |
| $\sqrt{75} = 5\sqrt3$ | `\sqrt{75} = \ldots\sqrt{3}` | `5` |
| $\frac{12}{\sqrt6} = 2\sqrt6$ | `\frac{12}{\sqrt{6}} = \ldots\sqrt{6}` | `2` |

Yang didril jadi aturannya, bukan kemampuan mengetik LaTeX. **Jangan bikin jawaban yang nilainya di bawah 0,006** (dan bukan nol) — toleransi `cekJawaban` akan menerima ketikan "0" sebagai benar. `verifikasi-soal-eksponen.mjs` memeriksa ini.

### Daftar Lengkap Kompetensi:

#### Materi utama: Matrikulasi Numerasi (12 sub-materi, 50 kompetensi)

1. **Operasi Aritmatika Dasar**
   - 1a. Penjumlahan tanda sama `(+a)+(+b)` atau `(-a)+(-b)`
   - 1b. Penjumlahan tanda beda `(+a)+(-b)` atau `(-a)+(+b)`
   - 1c. Pengurangan bilangan bulat (ubah ke penjumlahan)
   - 1d. Perkalian bilangan bulat (tanda)
   - 1e. Pembagian bilangan bulat (tanda)
   - 1f. Urutan operasi (PEMDAS) campuran

2. **Sifat Operasi Bilangan**
   - 2a. Sifat Komutatif
   - 2b. Sifat Asosiatif
   - 2c. Sifat Distributif
   - 2d. Identitas & Invers

3. **KPK dan FPB**
   - 3a. Faktorisasi Prima
   - 3b. Menghitung FPB
   - 3c. Menghitung KPK
   - 3d. Hubungan FPB × KPK = a × b

4. **Operasi Pecahan**
   - 4a. Menyederhanakan Pecahan
   - 4b. Penjumlahan/Pengurangan Pecahan Sejenis
   - 4c. Penjumlahan/Pengurangan Pecahan Tak Sejenis
   - 4d. Perkalian Pecahan
   - 4e. Pembagian Pecahan
   - 4f. Konversi Pecahan Campuran ↔ Biasa

5. **Operasi dan Konversi Desimal**
   - 5a. Pecahan → Desimal
   - 5b. Desimal → Pecahan
   - 5c. Penjumlahan/Pengurangan Desimal
   - 5d. Perkalian Desimal
   - 5e. Pembagian Desimal

6. **Pengenalan Variabel**
   - 6a. Identifikasi Unsur Aljabar (koefisien, variabel, konstanta)
   - 6b. Menyusun Ekspresi dari Kalimat
   - 6c. Substitusi Nilai Variabel

7. **Manipulasi Aljabar Dasar**
   - 7a. Menggabungkan Suku Sejenis
   - 7b. Penjumlahan/Pengurangan Bentuk Aljabar
   - 7c. Sifat Distributif dalam Aljabar (expand)
   - 7d. Faktorisasi (kebalikan distributif)
   - 7e. Perkalian Suku dengan Suku

8. **PLSV**
   - 8a. Penyelesaian PLSV Sederhana (ax+b=c)
   - 8b. Penyelesaian PLSV Variabel di Kedua Ruas (ax+b=cx+d)
   - 8c. Kasus Khusus (tanpa solusi / solusi tak terhingga)

9. **SPLDV**
   - 9a. Metode Substitusi
   - 9b. Metode Eliminasi

10. **Persentase**
    - 10a. Konversi Persen ↔ Pecahan ↔ Desimal
    - 10b. Menghitung a% dari Nilai b
    - 10c. Menentukan Persentase Bagian dari Total
    - 10d. Kenaikan & Penurunan Persentase (diskon/markup)

11. **Perbandingan dan Skala**
    - 11a. Menyederhanakan Perbandingan
    - 11b. Perbandingan Senilai
    - 11c. Perbandingan Berbalik Nilai
    - 11d. Skala Peta

12. **Pembulatan dan Estimasi**
    - 12a. Pembulatan Bilangan Bulat
    - 12b. Pembulatan Desimal
    - 12c. Taksiran Hasil Operasi (terbaik/atas/bawah)
    - 12d. Estimasi Praktis (belanja dll)

#### Materi utama: Eksponen (5 sub-materi, 25 kompetensi)

E1. **Sifat Eksponen Bilangan Bulat**
   - E1a. Perkalian Basis Sama `aᵐ × aⁿ = aᵐ⁺ⁿ`
   - E1b. Pembagian Basis Sama `aᵐ ÷ aⁿ = aᵐ⁻ⁿ` (boleh negatif)
   - E1c. Pangkat dari Pangkat `(aᵐ)ⁿ = aᵐⁿ`
   - E1d. Pangkat Negatif `a⁻ⁿ = 1/aⁿ`
   - E1e. Pangkat dari Perkalian `(a·xᵐ)ⁿ = aⁿ·xᵐⁿ` (koefisien ikut dipangkatkan)
   - E1f. Mencari Pangkat yang Hilang `2ˣ = 128`

E2. **Operasi Bentuk Akar**
   - E2a. Menyederhanakan Bentuk Akar `√(a²b) = a√b`
   - E2b. Tambah/Kurang Akar Sejenis
   - E2c. Perkalian Bentuk Akar `a√p × b√q`
   - E2d. Kuadrat Bentuk Akar `(√a ± √b)²`
   - E2e. Sederhanakan Dulu, Baru Jumlahkan `√50 + √18`

E3. **Merasionalkan Penyebut**
   - E3a. Penyebut Akar Tunggal `a/√b`
   - E3b. Hasil Kali Bentuk Sekawan `(a+√b)(a−√b) = a²−b`
   - E3c. Penyebut `a ± √b`
   - E3d. Penyebut `√a ± √b`

E4. **Eksponen Rasional (Pangkat Pecahan)**
   - E4a. Akar → Pangkat Pecahan `ⁿ√(aᵐ) = a^(m/n)` — jawabannya pecahan
   - E4b. Menghitung Akar Pangkat n
   - E4c. Nilai `a^(m/n)`
   - E4d. Pangkat Pecahan Negatif
   - E4e. Menyederhanakan `√(aⁿ)` pangkat ganjil

E5. **Fungsi Eksponen**
   - E5a. Nilai Fungsi `f(x) = k·aˣ`
   - E5b. Nilai Fungsi Pangkat Negatif `f(−n)` — jawabannya pecahan
   - E5c. Persamaan Basis Sama
   - E5d. Menyamakan Basis `4ˣ = 32`
   - E5e. Variabel di Kedua Ruas `aˣ = (aᵏ)^(x±p)`

**Total: 75 kompetensi kecil × 100 soal = 7500 soal**

## Firestore Schema

```
users/{uid}
  ├── displayName: string (dari Google/email auth)
  ├── username: string (dipilih siswa saat pertama kali masuk, unik)
  ├── email: string
  ├── photoURL: string
  ├── createdAt: timestamp
  └── progres/{materiId-kompetensiId}
        ├── selesai: boolean
        ├── totalBenar: number (0-100)
        ├── totalSalah: number
        ├── streakTerbaik: number
        ├── jawaban: array [{soalIndex, jawabanSiswa, jawabanBenar, benar: bool, waktuMs}]
        ├── startedAt: timestamp
        └── completedAt: timestamp (jika selesai)
```

## Aturan Drilling

1. Siswa memilih materi utama → sub-materi → kompetensi → mulai drilling
2. 100 soal ditampilkan SATU PER SATU (tidak semua sekaligus)
3. **Tipe jawaban: essai singkat (input angka)** — bukan pilihan ganda
4. Setelah menjawab → **feedback langsung otomatis** (benar/salah + penjelasan singkat)
5. Angka random range kecil (1-50) — jaga kesulitan di tingkat dasar. **Pengecualian Eksponen:** angka di dalam akar dan hasil pemangkatan boleh besar (`√1134`, `512^(2/3)`), karena yang dituntut mengenali polanya, bukan menghitung angka besar. Yang tetap dijaga kecil adalah pangkat dan koefisiennya.
6. Progres tersimpan real-time ke Firestore (close di soal ke-47 → lanjut dari 48)
7. **Skor**: hanya muncul setelah 100 soal SELESAI semua. Kalau belum selesai, simpan progres tanpa skor
8. Siswa bisa mengulang kompetensi yang sudah selesai (skor terbaik yang disimpan)
9. **Fokus hitungan murni** — TIDAK ada soal cerita, semua template pola berulang + angka random. Ini sebabnya soal model pertumbuhan/peluruhan yang ada di bank soal LMS sengaja TIDAK dibawa ke E5; konteksnya tetap diuji lewat ujian di LMS.
10. **Angka di dalam akar harus bebas kuadrat.** Kalau `√2 × √6 = √12` dibiarkan, jawaban "benar" versi generator masih bisa disederhanakan jadi `2√3` — siswa yang menyederhanakan sampai tuntas malah dinilai salah. Karena itu E2c memakai dua bilangan prima yang berbeda, dan E2/E3 punya daftar `BEBAS_KUADRAT` sendiri. Berlaku juga untuk pangkat pecahan: `m` tidak boleh habis dibagi `n`, kalau tidak soalnya tampil konyol seperti `36^(4/2)`.

## Konvensi Kode

- Bahasa Indonesia untuk UI dan komentar
- Bahasa Inggris untuk nama variabel/fungsi
- Konsisten pakai `const` dan `let`, jangan `var`
- Format angka Indonesia: pakai koma desimal (0,75 bukan 0.75) di UI
- Responsive: mobile-first (HP = alat utama siswa)
- Aksesibilitas: kontras tinggi, font besar untuk soal

## Firebase Config

- Firebase config disimpan di `js/firebase-config.js` (di-gitignore untuk production)
- Untuk development, buat `js/firebase-config.local.js` yang di-gitignore
- Deploy: push ke `main` → GitHub Pages auto-deploy ke `fakhri24.github.io/drilling-100`
