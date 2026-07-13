import type { Product } from "../types/product";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition hover:-translate-y-2">

      <div className="h-56 bg-slate-700 flex items-center justify-center text-7xl">
        📱
      </div>

      <div className="p-6">

        <h3 className="text-2xl font-semibold">
          {product.name}
        </h3>

        <p className="text-slate-400 mt-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-blue-400 font-bold text-2xl">
            ${product.price}
          </span>

          {product.stock > 0 ? (
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
              In Stock
            </span>
          ) : (
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
              Out of Stock
            </span>
          )}

        </div>

        <button
          className="w-full mt-6 bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default ProductCard;