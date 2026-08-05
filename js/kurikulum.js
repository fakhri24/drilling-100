// kurikulum.js — SATU sumber kebenaran struktur kurikulum drilling.
//
// Sebelum berkas ini ada, daftar materi & kompetensi disalin di empat tempat
// (index.html, materi.html, dashboard.html, drill.html). Salinannya sudah
// mulai menyimpang: dashboard mengira materi 06 punya 2 kompetensi padahal
// sudah 3 sejak 06b selesai dibuat, jadi progres materi itu ditampilkan lebih
// tinggi dari yang sebenarnya. Semua halaman sekarang membaca dari sini.
//
// Tiga tingkat:
//   materi utama  → sub-materi (yang dulu disebut "materi") → kompetensi
//
// PENTING — kontrak URL: `materi.html?id=<idSubMateri>` adalah tautan publik.
// lms-matematika (kurikulumData.js, TAUTAN_EKSTERNAL_MATRIKULASI_NUMERASI)
// menaut ke id "01".."12" dari mode formatif tab Matrikulasi Numerasi.
// Mengubah/menghapus id sub-materi itu akan mematikan tombol drilling di LMS.

const KURIKULUM = [
  {
    id: "numerasi",
    nama: "Matrikulasi Numerasi",
    emoji: "🧮",
    deskripsi: "12 materi dasar numerasi kelas X",
    subMateri: [
      {
        id: "01",
        emoji: "🧮",
        nama: "Operasi Aritmatika Dasar",
        kompetensi: [
          { id: "01a", nama: "Penjumlahan Tanda Sama" },
          { id: "01b", nama: "Penjumlahan Tanda Beda" },
          { id: "01c", nama: "Pengurangan Bilangan Bulat" },
          { id: "01d", nama: "Perkalian Bilangan Bulat" },
          { id: "01e", nama: "Pembagian Bilangan Bulat" },
          { id: "01f", nama: "Urutan Operasi (PEMDAS)" },
        ],
      },
      {
        id: "02",
        emoji: "🔢",
        nama: "Sifat Operasi Bilangan",
        kompetensi: [
          { id: "02a", nama: "Sifat Komutatif" },
          { id: "02b", nama: "Sifat Asosiatif" },
          { id: "02c", nama: "Sifat Distributif" },
          { id: "02d", nama: "Identitas & Invers" },
        ],
      },
      {
        id: "03",
        emoji: "🧩",
        nama: "KPK dan FPB",
        kompetensi: [
          { id: "03a", nama: "Faktorisasi Prima" },
          { id: "03b", nama: "Menghitung FPB" },
          { id: "03c", nama: "Menghitung KPK" },
          { id: "03d", nama: "Hubungan FPB × KPK" },
        ],
      },
      {
        id: "04",
        emoji: "🍰",
        nama: "Operasi Pecahan",
        kompetensi: [
          { id: "04a", nama: "Menyederhanakan Pecahan" },
          { id: "04b", nama: "Tambah/Kurang Pecahan Sejenis" },
          { id: "04c", nama: "Tambah/Kurang Pecahan Tak Sejenis" },
          { id: "04d", nama: "Perkalian Pecahan" },
          { id: "04e", nama: "Pembagian Pecahan" },
          { id: "04f", nama: "Konversi Campuran ↔ Biasa" },
        ],
      },
      {
        id: "05",
        emoji: "🔟",
        nama: "Operasi dan Konversi Desimal",
        kompetensi: [
          { id: "05a", nama: "Pecahan → Desimal" },
          { id: "05b", nama: "Desimal → Pecahan" },
          { id: "05c", nama: "Tambah/Kurang Desimal" },
          { id: "05d", nama: "Perkalian Desimal" },
          { id: "05e", nama: "Pembagian Desimal" },
        ],
      },
      {
        id: "06",
        emoji: "🔤",
        nama: "Pengenalan Variabel",
        kompetensi: [
          { id: "06a", nama: "Identifikasi Unsur Aljabar" },
          { id: "06b", nama: "Menyusun Ekspresi dari Kalimat" },
          { id: "06c", nama: "Substitusi Nilai Variabel" },
        ],
      },
      {
        id: "07",
        emoji: "🧮",
        nama: "Manipulasi Aljabar Dasar",
        kompetensi: [
          { id: "07a", nama: "Menggabungkan Suku Sejenis" },
          { id: "07b", nama: "Tambah/Kurang Bentuk Aljabar" },
          { id: "07c", nama: "Sifat Distributif Aljabar" },
          { id: "07d", nama: "Faktorisasi" },
          { id: "07e", nama: "Perkalian Suku dengan Suku" },
        ],
      },
      {
        id: "08",
        emoji: "⚖️",
        nama: "PLSV",
        kompetensi: [
          { id: "08a", nama: "PLSV Sederhana (ax+b=c)" },
          { id: "08b", nama: "PLSV Variabel di Kedua Ruas" },
          { id: "08c", nama: "Kasus Khusus PLSV" },
        ],
      },
      {
        id: "09",
        emoji: "📐",
        nama: "SPLDV",
        kompetensi: [
          { id: "09a", nama: "Metode Substitusi" },
          { id: "09b", nama: "Metode Eliminasi" },
        ],
      },
      {
        id: "10",
        emoji: "💯",
        nama: "Persentase",
        kompetensi: [
          { id: "10a", nama: "Konversi Persen ↔ Pecahan ↔ Desimal" },
          { id: "10b", nama: "Menghitung a% dari Nilai" },
          { id: "10c", nama: "Persentase Bagian dari Total" },
          { id: "10d", nama: "Kenaikan & Penurunan Persentase" },
        ],
      },
      {
        id: "11",
        emoji: "📏",
        nama: "Perbandingan dan Skala",
        kompetensi: [
          { id: "11a", nama: "Menyederhanakan Perbandingan" },
          { id: "11b", nama: "Perbandingan Senilai" },
          { id: "11c", nama: "Perbandingan Berbalik Nilai" },
          { id: "11d", nama: "Skala Peta" },
        ],
      },
      {
        id: "12",
        emoji: "🎯",
        nama: "Pembulatan dan Estimasi",
        kompetensi: [
          { id: "12a", nama: "Pembulatan Bilangan Bulat" },
          { id: "12b", nama: "Pembulatan Desimal" },
          { id: "12c", nama: "Taksiran Hasil Operasi" },
          { id: "12d", nama: "Estimasi Praktis" },
        ],
      },
    ],
  },

  {
    // Sub-materinya sengaja persis 5 sub-materi tab Eksponen di
    // lms-matematika (kurikulumData.js), supaya progres drilling sejajar
    // 1:1 dengan status "master" di sana. Pola soalnya diturunkan dari
    // arsip-data/bank_soal_all.json — polanya, bukan soalnya: kalau soal
    // bank disalin ke sini, ujian sumatif di LMS berubah jadi tes hafalan
    // drilling.
    id: "eksponen",
    nama: "Eksponen",
    emoji: "⚡",
    deskripsi: "5 sub-materi eksponen & bentuk akar",
    subMateri: [
      {
        id: "E1",
        emoji: "⚡",
        nama: "Sifat Eksponen Bilangan Bulat",
        kompetensi: [
          { id: "E1a", nama: "Perkalian Basis Sama" },
          { id: "E1b", nama: "Pembagian Basis Sama" },
          { id: "E1c", nama: "Pangkat dari Pangkat" },
          { id: "E1d", nama: "Pangkat Negatif" },
          { id: "E1e", nama: "Pangkat dari Perkalian" },
          { id: "E1f", nama: "Mencari Pangkat yang Hilang" },
        ],
      },
      {
        id: "E2",
        emoji: "🌱",
        nama: "Operasi Bentuk Akar",
        kompetensi: [
          { id: "E2a", nama: "Menyederhanakan Bentuk Akar" },
          { id: "E2b", nama: "Tambah/Kurang Akar Sejenis" },
          { id: "E2c", nama: "Perkalian Bentuk Akar" },
          { id: "E2d", nama: "Kuadrat Bentuk Akar" },
          { id: "E2e", nama: "Sederhanakan Dulu, Baru Jumlahkan" },
        ],
      },
      {
        id: "E3",
        emoji: "➗",
        nama: "Merasionalkan Penyebut",
        kompetensi: [
          { id: "E3a", nama: "Penyebut Akar Tunggal" },
          { id: "E3b", nama: "Hasil Kali Bentuk Sekawan" },
          { id: "E3c", nama: "Penyebut a ± √b" },
          { id: "E3d", nama: "Penyebut √a ± √b" },
        ],
      },
      {
        id: "E4",
        emoji: "🥧",
        nama: "Eksponen Rasional (Pangkat Pecahan)",
        kompetensi: [
          { id: "E4a", nama: "Akar → Pangkat Pecahan" },
          { id: "E4b", nama: "Menghitung Akar Pangkat n" },
          { id: "E4c", nama: "Nilai a^(m/n)" },
          { id: "E4d", nama: "Pangkat Pecahan Negatif" },
          { id: "E4e", nama: "Menyederhanakan √(aⁿ)" },
        ],
      },
      {
        id: "E5",
        emoji: "📈",
        nama: "Fungsi Eksponen",
        kompetensi: [
          { id: "E5a", nama: "Nilai Fungsi f(x) = k·aˣ" },
          { id: "E5b", nama: "Nilai Fungsi Pangkat Negatif" },
          { id: "E5c", nama: "Persamaan Basis Sama" },
          { id: "E5d", nama: "Menyamakan Basis" },
          { id: "E5e", nama: "Variabel di Kedua Ruas" },
        ],
      },
    ],
  },
];

/**
 * Materi utama berdasarkan id ("numerasi" / "eksponen"), atau null.
 */
function getMateriUtama(id) {
  return KURIKULUM.find((m) => m.id === id) || null;
}

/**
 * Cari sub-materi lintas materi utama.
 * @returns {{ materiUtama: object, subMateri: object }|null}
 */
function getSubMateri(idSubMateri) {
  for (const materiUtama of KURIKULUM) {
    const subMateri = materiUtama.subMateri.find((s) => s.id === idSubMateri);
    if (subMateri) return { materiUtama, subMateri };
  }
  return null;
}

/**
 * Semua sub-materi dari semua materi utama, berurutan.
 */
function semuaSubMateri() {
  return KURIKULUM.flatMap((m) => m.subMateri);
}

/**
 * Sub-materi pemilik sebuah kompetensi. Dicari lewat daftar, BUKAN lewat
 * potongan id ("01a".slice(0,2)) — id sub-materi tidak harus selalu dua huruf
 * pertama id kompetensinya, dan asumsi itu diam-diam akan salah begitu ada
 * penomoran baru.
 * @returns {{ materiUtama: object, subMateri: object }|null}
 */
function getSubMateriDariKompetensi(idKompetensi) {
  for (const materiUtama of KURIKULUM) {
    for (const subMateri of materiUtama.subMateri) {
      if (subMateri.kompetensi.some((k) => k.id === idKompetensi)) {
        return { materiUtama, subMateri };
      }
    }
  }
  return null;
}
