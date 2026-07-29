// progres.js — Read/Write progres ke Firestore

/**
 * Simpan jawaban satu soal ke Firestore
 * @param {string} uid - User ID
 * @param {string} kompetensiId - ID kompetensi (misal "01a")
 * @param {number} soalIndex - Index soal (0-99)
 * @param {object} data - { pertanyaan, jawabanSiswa, jawabanBenar, benar, waktuMs }
 */
async function saveJawaban(uid, kompetensiId, soalIndex, data) {
  const progresId = kompetensiId;
  const progresRef = db.collection("users").doc(uid)
    .collection("progres").doc(progresId);

  const doc = await progresRef.get();

  if (!doc.exists) {
    // Buat dokumen baru
    await progresRef.set({
      kompetensiId: kompetensiId,
      totalBenar: data.benar ? 1 : 0,
      totalSalah: data.benar ? 0 : 1,
      selesai: false,
      startedAt: firebase.firestore.FieldValue.serverTimestamp(),
      jawaban: [{ soalIndex, ...data }]
    });
  } else {
    const existing = doc.data();
    const jawaban = existing.jawaban || [];

    // Update atau append jawaban
    const idx = jawaban.findIndex(j => j.soalIndex === soalIndex);
    if (idx >= 0) {
      jawaban[idx] = { soalIndex, ...data };
    } else {
      jawaban.push({ soalIndex, ...data });
    }

    const totalBenar = jawaban.filter(j => j.benar).length;
    const totalSalah = jawaban.filter(j => !j.benar).length;
    const selesai = jawaban.length >= 100;

    const updateData = {
      totalBenar,
      totalSalah,
      selesai,
      jawaban
    };

    if (selesai && !existing.completedAt) {
      updateData.completedAt = firebase.firestore.FieldValue.serverTimestamp();
    }

    await progresRef.update(updateData);
  }
}

/**
 * Ambil progres siswa untuk satu kompetensi
 * @param {string} uid
 * @param {string} kompetensiId
 * @returns {Promise<object|null>}
 */
async function getProgres(uid, kompetensiId) {
  const doc = await db.collection("users").doc(uid)
    .collection("progres").doc(kompetensiId).get();
  return doc.exists ? doc.data() : null;
}

/**
 * Ambil semua progres siswa (untuk dashboard)
 * @param {string} uid
 * @returns {Promise<Map<string, object>>} Map dari kompetensiId → progres
 */
async function getAllProgres(uid) {
  const snapshot = await db.collection("users").doc(uid)
    .collection("progres").get();

  const progresMap = new Map();
  snapshot.forEach(doc => {
    progresMap.set(doc.id, doc.data());
  });
  return progresMap;
}

/**
 * Hitung index soal terakhir yang belum dikerjakan
 * @param {object} progres - data progres dari Firestore
 * @returns {number} index soal berikutnya (0-100)
 */
function getNextSoalIndex(progres) {
  if (!progres || !progres.jawaban) return 0;
  return progres.jawaban.length;
}
