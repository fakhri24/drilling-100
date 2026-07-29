// drill-engine.js — Core drill engine (generate soal, cek jawaban, render)
// Akan diimplementasi di FASE 2

/**
 * Generate angka random dalam range
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Parse jawaban siswa ke angka
 * Menerima: "12", "-12", "3/4", "0,75"
 * @returns {number|null}
 */
function parseJawaban(input) {
  if (!input || input.trim() === "") return null;
  const cleaned = input.trim().replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Cek apakah jawaban benar (toleransi untuk desimal)
 */
function cekJawaban(jawabanSiswa, jawabanBenar) {
  return Math.abs(jawabanSiswa - jawabanBenar) < 0.001;
}

// Placeholder — renderSoal, submitJawaban, showHasil akan di FASE 2
