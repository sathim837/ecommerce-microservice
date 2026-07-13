import { useEffect, useState } from "react";

import { getProducts } from "../services/product.service";

import type { Product } from "../types/product";

import Loader from "./common/Loader";

import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Products
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;