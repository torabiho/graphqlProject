import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./NewProduct.css";
import { useFormik } from "formik";
import { GET_ALL_CATEGORIES, CREATE_PRODUCT } from "./queries.js";

const NewProduct = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_CATEGORIES);

  const [mutateFunction, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_PRODUCT, {
      update(cache, { data: { createProduct } }) {
        cache.modify({
          fields: {
            allProducts(existingProducts = []) {
              return [...existingProducts, createProduct];
            },
          },
        });
      },
    });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      url: "",
      categoriesIds: [],
    },
    validationSchema: yup.object({
      name: yup.string().required("Product name is required"),
      description: yup.string().required("Product description is required"),
      url: yup.string().required("Product URL is required"),
      categoriesIds: yup.array().min(1, "At least one category is required"),
    }),
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2));
      await mutateFunction({
        variables: {
          input: values,
        },
      });
      navigate("/");
    },
  });

  if (error) {
    return (
      <>
        <div>An error has occurred: {error.message}</div>
        <button onClick={() => refetch()}>Refetch</button>
      </>
    );
  }

  const categories = data?.allCategories || [];
  return (
    <>
      <h3>Create New Product</h3>
      {mutationError && (
        <p style={{ color: "#c62828" }}>Failed to create a new product</p>
      )}
      <form noValidate onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Product name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <label htmlFor="description">Product description</label>
        <textarea
          id="description"
          name="description"
          required
          rows="5"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          type="text"
          required
          value={formik.values.url}
          onChange={formik.handleChange}
        />
        <label htmlFor="categoriesIds">Categories</label>
        <select
          id="categoriesIds"
          name="categoriesIds"
          multiple={true}
          value={formik.values.categoriesIds}
          onChange={(e) =>
            formik.setFieldValue(
              "categoriesIds",
              [].slice
                .call(e.target.selectedOptions)
                .map((option) => option.value)
            )
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading || mutationLoading}>
          Create
        </button>
      </form>
    </>
  );
};

export default NewProduct;
