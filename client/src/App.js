import React from "react";

import Header from "./components/Header";
import AllProducts from "./components/AllProducts";
import ProductsByUser from "./components/ProductsByUser";
// import ProductsInCategory from "./components/ProductsInCategory";
import NewProduct from "./components/NewProduct";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/create" element={<NewProduct />} />
          {/* <Route path="/category/:slug">
              <ProductsInCategory />
            </Route> */}
          <Route path="/" element={<AllProducts />} />
          <Route path="/author/:userName" element={<ProductsByUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
