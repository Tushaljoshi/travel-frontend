// auth.js
const BACKEND_URL = "http://127.0.0.1:5000";

// Handle Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = signupForm.name.value.trim();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    if (!emailValid) {
      alert("Please enter a valid email.");
      return;
    }
    if (!passwordValid) {
      alert("Password must be at least 6 characters with at least one number and one letter.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        alert("Signup successful!");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Something went wrong. Try again.");
    }
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    try {
      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); // or use cookies
        window.location.href = "index.html"; // redirect to home/dashboard
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong. Try again.");
    }
  });
}
