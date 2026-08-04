import type { Product } from "../../types/product";
import ProductCard from "../ProductCard";


interface Props {
  products: Product[];
}


function ProductGrid({ products }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;