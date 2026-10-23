// js/firebase.js
console.log("🔥 Firebase script loaded!");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsJpE8rGdy_EDyeitpo47g_rnMoxLRBLs",
  authDomain: "haileportifolio.firebaseapp.com",
  projectId: "haileportifolio",
  storageBucket: "haileportifolio.firebasestorage.app",
  messagingSenderId: "324304784576",
  appId: "1:324304784576:web:f0658e126df8316fa2b125"
};

console.log("Initializing Firebase...");

try {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  console.log("✅ Firebase initialized successfully!");

  // ===== SIGN IN FORM =====
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    console.log("✅ Login form found!");
    
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("🚀 Form submitted!");
      
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      const statusEl = document.getElementById("authStatus");
      
      statusEl.textContent = "Signing in...";
      statusEl.style.color = "#6b7280";
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ Signed in:", userCredential.user);
        
        statusEl.textContent = "Success! Redirecting to Dashboard...";
        statusEl.style.color = "#10b981";
        
        setTimeout(() => {
          // 🎯 UPDATED: Redirects to dashboard instead of homepage
          window.location.href = "dashboard.html"; 
        }, 1500);
        
      } catch (error) {
        console.error("❌ Login error:", error.code, error.message);
        
        if (error.code === 'auth/user-not-found') {
          statusEl.textContent = "Error: No user found with this email";
        } else if (error.code === 'auth/wrong-password') {
          statusEl.textContent = "Error: Wrong password";
        } else if (error.code === 'auth/invalid-email') {
          statusEl.textContent = "Error: Invalid email format";
        } else {
          statusEl.textContent = "Error: " + error.message;
        }
        statusEl.style.color = "#ef4444";
      }
    });
  } else {
    console.warn("⚠️ Login form not found!");
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    console.log("📝 Contact form found!");
    
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("🚀 Contact form submitted!");
      
      const submitBtn = contactForm.querySelector(".form-submit");
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = "Sending...";
      submitBtn.disabled = true;
      
      try {
        await addDoc(collection(db, "messages"), {
          name: contactForm.name.value,
          email: contactForm.email.value,
          subject: contactForm.subject.value,
          message: contactForm.message.value,
          timestamp: serverTimestamp()
        });
        
        alert("✅ Message sent successfully!");
        contactForm.reset();
        
      } catch (error) {
        console.error("❌ Error sending message:", error);
        alert("❌ Failed to send message: " + error.message);
        
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
  alert("Firebase error: " + error.message);
}