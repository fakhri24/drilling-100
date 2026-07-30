// theme.js — Dark mode toggle, dipakai bersama di semua halaman.
// Dimuat lebih awal di <head> (sebelum <body>) supaya data-theme
// ke-set sebelum halaman sempat render (hindari flash tema salah).

function initTheme() {
  const saved = localStorage.getItem("theme");
  const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const theme = document.documentElement.getAttribute("data-theme");
  btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

initTheme();
document.addEventListener("DOMContentLoaded", updateThemeButton);
