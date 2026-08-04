import {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/product.service";

import Navbar from "../components/Navbar";
import Loader from "../components/common/Loader";

import type { Product } from "../types/product";

function ProductDetails() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(id){
            loadProduct(id);
        }
    }, [id]);

    const loadProduct = async (productId: string) => {
        try 
        {
            setLoading(true);
            const productData = await getProductById(productId);
            console.log(productData);
            console.log({product});
            setProduct(productData);
        }
        catch (error)
        {
            console.error("Error fetching product details:", error);
            navigate("/products");
        }
        finally
        {
            setLoading(false);
        
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!product) {
        return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white">
        Product not found.
      </div>
    );
    }
    

    return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-blue-400 hover:text-blue-300"
        >
          ← Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Product Image */}

          <div className="bg-slate-800 rounded-xl flex items-center justify-center h-[500px]">

            <div className="text-8xl">
              📱
            </div>

          </div>

          {/* Product Info */}

          <div>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="text-slate-400 mt-6">
              {product.description}
            </p>

            <div className="mt-8 space-y-4">

              <p className="text-3xl font-bold text-blue-400">
                ${product.price}
              </p>

              <p>
                Category :
                <span className="ml-2 text-green-400">
                  {product.category?.name ?? "N/A"}
                </span>
              </p>

              <p>
                Stock :
                <span
                  className={`ml-2 font-semibold ${
                    product.stock > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} Available`
                    : "Out of Stock"}
                </span>
              </p>

            </div>

            {/* Quantity */}

            <div className="flex items-center gap-4 mt-10">

              <button className="bg-slate-700 w-10 h-10 rounded-lg">
                -
              </button>

              <span className="text-xl">
                1
              </span>

              <button className="bg-slate-700 w-10 h-10 rounded-lg">
                +
              </button>

            </div>

            <button
              className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition"
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;