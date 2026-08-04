import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-slate-800 text-white px-8 py-4 flex justify-between">

      <Link to="/">
        Ecommerce
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {isAuthenticated ? (
          <>
            <span>
              👤 {user?.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;