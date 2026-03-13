import React from "react";
import { useRouteError, Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <div className="error-box">
        <h1 className="error-code">
          {error?.status || "404"}
        </h1>

        <h2 className="error-title">
          {error?.statusText || "Something went wrong"}
        </h2>

        <p className="error-message">
          {error?.message || "The page you are looking for does not exist."}
        </p>

        <Link to="/" className="home-btn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;