// auth.js — Autentikasi Firebase (Google + Email/Password)

/**
 * Login dengan Google
 */
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
}

/**
 * Daftar dengan email + password
 */
function signupWithEmail(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

/**
 * Login dengan email + password
 */
function loginWithEmail(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

/**
 * Logout
 */
function logout() {
  return auth.signOut();
}

/**
 * Cek apakah user sudah punya username di Firestore
 * @returns {Promise<boolean>}
 */
async function hasUsername(uid) {
  const doc = await db.collection("users").doc(uid).get();
  return doc.exists && doc.data().username;
}

/**
 * Simpan user profile ke Firestore (saat pertama kali login)
 */
async function saveUserProfile(user) {
  const userRef = db.collection("users").doc(user.uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    await userRef.set({
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      username: "", // belum diisi, redirect ke setup
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

/**
 * Cek ketersediaan username (harus unik)
 * Pakai collection terpisah "usernames" (doc id = username) supaya rules
 * Firestore bisa tetap ketat "users/{uid} cuma bisa dibaca pemiliknya
 * sendiri" — collection registry ini cuma simpan uid, bukan data pribadi.
 * @param {string} username
 * @returns {Promise<boolean>} true jika tersedia
 */
async function isUsernameAvailable(username) {
  const doc = await db.collection("usernames").doc(username.toLowerCase().trim()).get();
  return !doc.exists;
}

/**
 * Simpan username yang dipilih siswa — update profil + daftarkan di
 * registry "usernames" sekaligus (batch, supaya konsisten)
 */
async function saveUsername(uid, username) {
  const clean = username.toLowerCase().trim();
  const batch = db.batch();
  batch.update(db.collection("users").doc(uid), { username: clean });
  batch.set(db.collection("usernames").doc(clean), { uid });
  await batch.commit();
}

/**
 * Ambil username user
 */
async function getUsername(uid) {
  const doc = await db.collection("users").doc(uid).get();
  return doc.exists ? doc.data().username : null;
}

/**
 * Auth state listener — redirect logic
 */
auth.onAuthStateChanged(async (user) => {
  const currentPage = window.location.pathname.split("/").pop();

  if (!user) {
    // Belum login → redirect ke login (kecuali di halaman login)
    if (currentPage !== "login.html") {
      window.location.href = "login.html";
    }
    return;
  }

  // Sudah login, simpan profile jika baru pertama kali
  await saveUserProfile(user);

  // Cek apakah sudah punya username
  const hasName = await hasUsername(user.uid);

  if (!hasName && currentPage !== "setup-username.html") {
    // Belum punya username → redirect ke setup
    window.location.href = "setup-username.html";
    return;
  }

  if (hasName && (currentPage === "setup-username.html" || currentPage === "login.html")) {
    // Sudah punya username tapi masih di halaman setup/login → redirect ke dashboard
    window.location.href = "dashboard.html";
  }
});
