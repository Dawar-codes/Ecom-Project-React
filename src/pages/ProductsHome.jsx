import { useEffect } from "react";
import ProductItem from "../components/products/ProductItem";
// import {Outlet} from 'react-router-dom';
import CartPage from "./Cart";
import { useSelector } from "react-redux";

export const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Leather wallet Brown",
    description: "Premium Leather Wallet Brown",
    price: 2999,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/A_men%27s_wallet.jpg",
  },
  {
    id: "p2",
    name: "Leather wallet Black",
    description: "Premium Leather Wallet Black",
    price: 2499,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/18-02-25-Lederfarbe-IMG_20180228_145109_887.jpg/1024px-18-02-25-Lederfarbe-IMG_20180228_145109_887.jpg",
  },
  {
    id: "p3",
    name: "Minimal Leather wallet brown",
    description: "Small Leather Wallet Brown",
    price: 2899,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Cub_Men%27s_Wallet.jpg",
  },
  {
    id: "p4",
    name: "Captian America Wallet",
    description: "Long Leather Wallet",
    price: 4999,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kyle%27s_Wallet_%284081125688%29.jpg/1024px-Kyle%27s_Wallet_%284081125688%29.jpg",
  },

  {
    id: "p5",
    name: "Antique Brown Leather Wallet",
    description:
      "Brown leather wallet.",
    price: 9999,
    image:
      "https://martboutique.com/cdn/shop/products/4ad90000243f9b585032c5ac00fa861b_800x.png?v=1625914650",
  },
  {
    id: "p6",
    name: "Python skin Wallet",
    description: "Original python skin wallet made with love",
    price: 14999,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Python_skin_wallet%2C_closed%2C_2015-03-18.jpg/1024px-Python_skin_wallet%2C_closed%2C_2015-03-18.jpg",
  },
];


export default function Products() {
    // const modal = useSelector((state) => state.open);
    // useEffect(() => {
    //   console.log(modal);
      
    // },[modal])
    
  return (
    <>
     {/* {modal && <CartPage/>} */}
      <h1 className="text-center text-4xl mt-6 font-extralight border-b pb-4">
        Our products
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mx-20 my-20">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
