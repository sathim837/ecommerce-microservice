import { ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-500 cursor-pointer"
        >
          E-Commerce
        </h1>

        <nav className="flex items-center gap-8">

          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-400 transition"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/products")}
            className="hover:text-blue-400 transition"
          >
            Products
          </button>

          <ShoppingCart
            className="cursor-pointer hover:text-blue-400"
            size={22}
          />

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <User size={18} />
            Login
          </button>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;