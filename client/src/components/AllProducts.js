import { useQuery } from "@apollo/client";
import ProductsList from "./ProductsList";
import { GET_ALL_PRODUCTS } from "./queries";

import React from "react";

export default function AllProducts() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_PRODUCTS);

  /**
   * Or we could use lazy query
   * const [getProducts, { loading, error, data, refetch }] = useLazyQuery(GET_ALL_PRODUCTS);
   */

  return (
    <>
      <h3 variant="h3">Products</h3>
      <ProductsList
        products={data?.allProducts || []}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </>
  );
}
