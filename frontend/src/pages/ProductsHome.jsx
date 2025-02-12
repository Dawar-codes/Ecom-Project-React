import ProductItem from "../components/products/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/https.js";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => fetchProducts(searchTerm),
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error retrieving data.</h1>;
  }

  return (
    <>
      <h1 className="text-center text-xl md:text-4xl mt-6 font-extralight border-b pb-4">
        Our products
      </h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5 lg:mx-20 my-20">
          {data.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <h1 className="flex justify-center mt-5">No products found</h1>
      )}
    </>
  );
}
