import { useState } from "react";

export default function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const saved = localStorage.getItem("users");
    const users = saved ? JSON.parse(saved) : [];

    if (users.find((u) => u.email === email)) {
      alert("User already exists. Please login.");
      goToLogin();
      return;
    }

    const newUser = {
      email,
      passwordHash: btoa(password),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful. Please log in.");
    goToLogin();
  };

  return (
    <div className="card auth-card">
      <h2>Create an account</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          required
          minLength="4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign up</button>

        <p>
          Already have an account?{" "}
          <button type="button" onClick={goToLogin}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
