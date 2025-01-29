import ProductItem from "../components/products/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/https.js";


// export const DUMMY_PRODUCTS = [
//   {
//     id: "p1",
//     name: "Leather wallet Brown",
//     description: "Premium Leather Wallet Brown",
//     price: 2999,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/c/c4/A_men%27s_wallet.jpg",
//   },
//   {
//     id: "p2",
//     name: "Leather wallet Black",
//     description: "Premium Leather Wallet Black",
//     price: 2499,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/18-02-25-Lederfarbe-IMG_20180228_145109_887.jpg/1024px-18-02-25-Lederfarbe-IMG_20180228_145109_887.jpg",
//   },
//   {
//     id: "p3",
//     name: "Minimal Leather wallet brown",
//     description: "Small Leather Wallet Brown",
//     price: 1999,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6a/Cub_Men%27s_Wallet.jpg",
//   },
//   {
//     id: "p4",
//     name: "Captian America Wallet",
//     description: "Long Leather Wallet",
//     price: 4999,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kyle%27s_Wallet_%284081125688%29.jpg/1024px-Kyle%27s_Wallet_%284081125688%29.jpg",
//   },
// ];



export default function Products() {

  const {data, isPending, isError} = useQuery({
    queryKey:["products"],
    queryFn: fetchProducts
  })
 
  
if(isPending) {
  return <h1>Loading...</h1>
}  
if(isError) {
  return <h1>Error retrieving data.</h1>
}

  return (
    <>
      <h1 className="text-center text-4xl mt-6 font-extralight border-b pb-4">
        Our products
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5 lg:mx-20 my-20">
        {data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
