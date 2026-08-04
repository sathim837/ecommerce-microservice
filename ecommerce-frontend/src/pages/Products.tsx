import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductGrid from "../components/product/ProductGrid";
import ProductSearch from "../components/product/ProductSearch";
import Loader from "../components/common/Loader";

import { getProducts } from "../services/product.service";

import type { Product } from "../types/product";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/common/Pagination";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    loadProducts();
    setPage(1); // Reset to first page when search changes
  }, [page, debouncedSearch]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts({
        page: 1,
        limit: 9,
        search: debouncedSearch,
      });

      setProducts(response.products);
      setTotalPages(response.totalPages);
      setTotalProducts(response.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">Products</h1>

        {/* <p className="text-slate-400 mt-2 mb-8">
          Browse our latest collection
        </p> */}

        <p className="text-slate-400 mt-2">Showing {totalProducts} Products</p>

        <ProductSearch value={search} onChange={setSearch} />

        <div className="mt-10">
          {loading ? (
            <Loader />
          ) : (
            <>
              <ProductGrid products={products} />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
