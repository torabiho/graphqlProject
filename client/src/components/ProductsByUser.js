import React from "react";
import ProductsList from "./ProductsList";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_AUTHOR } from "./queries";
import { useParams } from "react-router-dom";

export default function ProductsByUser() {
  const { userName } = useParams();

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS_BY_AUTHOR, {
    variables: { authorName: userName },
  });

  return (
    <>
      <h3 variant="h3">Products by user {userName}</h3>
      <ProductsList
        products={data?.productsByAuthor || []}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </>
  );
}
