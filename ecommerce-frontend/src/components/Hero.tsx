import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center text-center py-28 px-6">

      <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full">
        Production Ready Project
      </span>

      <h1 className="mt-8 text-7xl font-extrabold">
        Build for Scale
      </h1>

      <p className="mt-8 text-slate-300 text-xl max-w-3xl leading-9">
        A modern microservices based E-Commerce platform built with
        React, Node.js, RabbitMQ, Docker, Prisma,
        MongoDB and MySQL.
      </p>

      <div className="mt-12 flex gap-6">

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/products")}
          className="border border-slate-400 px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
        >
          Browse Products
        </button>

      </div>

    </section>
  );
}

export default Hero;