import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import "./ProductList.css";

const ProductsList = ({ products, error, loading, refetch }) => {
  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return (
      <>
        <div>An error has occurred: {error.message}</div>
        <button onClick={() => refetch()}>Refetch</button>
      </>
    );
  }
  return (
    <div className="grid-container">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsList;
