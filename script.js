import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZUF-nb3a1_VH8NnGiWSpmaywKTeYaP9E",
  authDomain: "sofer-stam-crm-e9e0a.firebaseapp.com",
  projectId: "sofer-stam-crm-e9e0a",
  storageBucket: "sofer-stam-crm-e9e0a.appspot.com",
  messagingSenderId: "582539972037",
  appId: "1:582539972037:web:7905e03773105efd4bcfac",
  measurementId: "G-YB70WJQRY1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// מעבר בין מסכים
window.toggleScreens = function (screen) {
  document.getElementById("registerScreen").style.display = screen === "register" ? "block" : "none";
  document.getElementById("loginScreen").style.display = screen === "login" ? "block" : "none";
};

// רישום
window.register = async function (e) {
  e.preventDefault();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    alert("נרשמת בהצלחה! נשלח אליך אימייל לאימות.");
  } catch (error) {
    alert("שגיאה ברישום: " + error.message);
  }
};

// התחברות
window.login = async function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user.emailVerified) {
      document.getElementById("loginScreen").style.display = "none";
      document.getElementById("choiceScreen").style.display = "block";
    } else {
      document.getElementById("loginScreen").style.display = "none";
      document.getElementById("verifyScreen").style.display = "block";
    }
  } catch (error) {
    alert("שגיאה בהתחברות: " + error.message);
  }
};

// המשך לאחר אימות
window.continueAfterVerification = function () {
  const user = auth.currentUser;
  if (user && user.emailVerified) {
    document.getElementById("verify
