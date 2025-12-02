import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Navbar({ currentView, goToLogin, goToSignup, goToTracker }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    goToLogin();
  };

  return (
    <nav className="navbar">
      <button className="brand" onClick={user ? goToTracker : goToLogin}>
        Menstruation Tracker
      </button>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-email">{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button
              className={currentView === "login" ? "secondary" : ""}
              onClick={goToLogin}
            >
              Login
            </button>
            <button
              className={currentView === "signup" ? "secondary" : ""}
              onClick={goToSignup}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
