import React, { useState } from "react";
import { CartState } from "../context/context";
import Filterts from "./Filterts";
import SingleProduct from "./SingleProduct";
import "./Home.css";

function Home() {
  const {
    state: { products },
    prodState: { byFastDelivery, byStock, byRating, searchQuery, sort },
  } = CartState();

  const tranformProduct = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh"
          ? Number(a.price) - Number(b.price)
          : Number(b.price) - Number(a.price)
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }
    console.log(byRating);
    if (byRating) {
      console.log(sortedProducts);
      sortedProducts = sortedProducts.filter(
        (prod) => Number(prod.ratings) >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filterts />
      <div className="productContainer">
        {tranformProduct().map((prod) => {
          return <SingleProduct key={prod.id} prod={prod} />;
        })}
      </div>
    </div>
  );
}

export default Home;
