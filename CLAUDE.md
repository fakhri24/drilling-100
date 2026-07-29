# Drilling-100 — CLAUDE.md

## Apa ini?

Website latihan drilling 100 soal per kompetensi kecil untuk seluruh materi numerasi kelas X.
Sumber materi: https://fakhri24.github.io/materi-numerasi-x/

Filosofi: **Pola berulang = penguasaan**. Setiap kompetensi kecil punya SATU pola soal yang diulang 100 kali dengan angka random. Tujuannya agar siswa "nempel" pola tersebut melalui repetisi masif.

## Tech Stack

- **Frontend**: Vanilla HTML + CSS + JS (TANPA framework)
- **Backend/Auth**: Firebase (Auth + Firestore)
- **Hosting**: GitHub Pages (`fakhri24.github.io/drilling-100`)
- **Database/Auth**: Firebase (Auth + Firestore) — client-side SDK, jalan dari host manapun
- **Login**: Google OAuth + Email/Password

## Struktur Project

```
drilling-100/
├── index.html              # Landing page, pilih materi
├── login.html              # Login page (Google / Email)
├── setup-username.html     # Pilih username (pertama kali login)
├── drill.html              # Halaman drilling utama (1 kompetensi = 100 soal)
├── dashboard.html          # Dashboard progres siswa
├── css/
│   └── style.css           # Global styles
├── js/
│   ├── firebase-config.js  # Firebase init (config dipisah)
│   ├── auth.js             # Auth logic (Google + Email)
│   ├── drill-engine.js     # Core drill engine (generate soal, cek jawaban, timer)
│   ├── progres.js          # Read/write progres ke Firestore
│   └── materi/
│       ├── 01-operasi-aritmatika-dasar.js
│       ├── 02-sifat-operasi-bilangan.js
│       ├── 03-kpk-dan-fpb.js
│       ├── 04-operasi-pecahan.js
│       ├── 05-operasi-konversi-desimal.js
│       ├── 06-pengenalan-variabel.js
│       ├── 07-manipulasi-aljabar-dasar.js
│       ├── 08-plsv.js
│       ├── 09-spldv.js
│       ├── 10-persentase.js
│       ├── 11-perbandingan-dan-skala.js
│       └── 12-pembulatan-dan-estimasi.js
└── firestore.rules         # Firestore security rules
```

## 12 Materi & Kompetensi Kecil

Setiap file `materi/XX-xxx.js` export array of kompetensi objects:

```js
// Struktur tiap kompetensi:
{
  id: "01-penjumlahan-tanda-sama",
  nama: "Penjumlahan Tanda Sama",
  deskripsi: "Jika tanda sama, jumlahkan nilai mutlak, tanda tetap",
  totalSoal: 100,
  generateSoal: () => ({ pertanyaan: "...", jawaban: "...", pilihan: [...] }),
  tipeJawaban: "input" | "pilihan-ganda",
}
```

### Daftar Lengkap Kompetensi:

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

**Total: ~50+ kompetensi kecil × 100 soal = 5000+ soal**

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

1. Siswa memilih materi → kompetensi → mulai drilling
2. 100 soal ditampilkan SATU PER SATU (tidak semua sekaligus)
3. **Tipe jawaban: essai singkat (input angka)** — bukan pilihan ganda
4. Setelah menjawab → **feedback langsung otomatis** (benar/salah + penjelasan singkat)
5. Angka random range kecil (1-50) — jaga kesulitan di tingkat dasar
6. Progres tersimpan real-time ke Firestore (close di soal ke-47 → lanjut dari 48)
7. **Skor**: hanya muncul setelah 100 soal SELESAI semua. Kalau belum selesai, simpan progres tanpa skor
8. Siswa bisa mengulang kompetensi yang sudah selesai (skor terbaik yang disimpan)
9. **Fokus hitungan murni** — TIDAK ada soal cerita, semua template pola berulang + angka random

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
