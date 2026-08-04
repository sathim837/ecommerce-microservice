import { useEffect, useState } from "react";
import Loader from "./common/Loader";
import ProductGrid from "./product/ProductGrid";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      // Display only first 4 products on Home page
      setProducts(response.products.slice(0, 4));
    } catch (error) {
      console.error("Failed to load featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-bold text-white">
          Featured Products
        </h2>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}

export default FeaturedProducts;