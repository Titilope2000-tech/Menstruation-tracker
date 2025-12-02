import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";

export default function Login({ goToSignup }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const saved = localStorage.getItem("users");
    const users = saved ? JSON.parse(saved) : [];

    const found = users.find(
      (u) => u.email === email && u.passwordHash === btoa(password)
    );

    if (!found) {
      alert("Invalid email or password");
      return;
    }

    login(email);
  };

  return (
    <div className="card auth-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          No account yet?{" "}
          <button type="button" onClick={goToSignup}>
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
