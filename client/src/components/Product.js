import React from "react";
import { Link } from "react-router-dom";
import { UPVOTE_PRODUCT } from "./queries";
import { useMutation } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "./queries";
import "./Product.css";

const Product = ({ product }) => {
  const {
    id,
    publishedAt,
    name,
    url,
    description,
    author,
    categories,
    numberOfVotes,
  } = product;

  const [mutateFunction, { loading }] = useMutation(UPVOTE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
  });

  return (
    <article className="card" aria-labelledby={`product-name-${id}`}>
      <section className="card-body">
        <h5 id={`product-name-${id}`} className="card-title">
          <a
            href={url}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read more about ${name}`}
          >
            {name}
          </a>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Published on:{" "}
          <time dateTime={publishedAt}>{publishedAt.split("T")[0]}</time>
        </h6>
        <p className="card-text">{description}</p>
      </section>

      <footer className="card-footer">
        <section className="footer-left">
          <Link
            to={`/author/${author.userName}`}
            className="card-link"
            aria-label={`View more from author ${author.fullName}`}
          >
            {author.fullName}
          </Link>
          <nav className="category-container" aria-label="Product categories">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="badge badge-primary"
                aria-label={`View more in the category ${category.name}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </section>
        <div className="footer-right">
          <p>
            Votes: <span aria-live="polite">{numberOfVotes}</span>
          </p>
          <button
            aria-label="vote up"
            onClick={() => {
              console.log(`Upvoting product with ID ${id}`);
              mutateFunction({
                variables: {
                  productId: id,
                },
              });
            }}
            disabled={loading}
          >
            upVote
          </button>
        </div>
      </footer>
    </article>
  );
};

export default Product;
