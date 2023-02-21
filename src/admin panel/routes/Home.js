import React from "react";
import "../Style/home.css";
import { useParams } from "react-router-dom";
import ManageSupplier from "./Supplier/ManageSupplier";
import AddSupplier from "./Supplier/AddSupplier";
import ManagePurchase from "./Purchase/ManagePurchase";
import AddPurchase from "./Purchase/AddPurchase";
import AddCategory from "./Category/AddCategory";
import ManageCategory from "./Category/ManageCategory";
import ManageProduct from "./Product/ManageProduct";
import AddProduct from "./Product/AddProduct";
import ManageDiscount from "./Discount/ManageDiscount";
import AddDiscount from "./Discount/AddDiscount";
import Error from "../../routes/Error";
import Dashboard from "./Dashboard";

function Home({ path }) {
  let { id } = useParams();

  return (
    <>
      {id === "dashboard" && (
        <section className="home">
          <Dashboard />
          {/* <h1>Admin Dashboard</h1> */}
        </section>
      )}
      {id === "manageSupplier" && (
        <section className="home">
          <ManageSupplier />
        </section>
      )}
      {id === "addSupplier" && (
        <section className="home">
          <AddSupplier />
        </section>
      )}
      {id === "managePurchase" && (
        <section className="home">
          <ManagePurchase />
        </section>
      )}
      {id === "addPurchase" && (
        <section className="home">
          <AddPurchase />
        </section>
      )}
      {id === "addCategory" && (
        <section className="home">
          <AddCategory />
        </section>
      )}
      {id === "manageCategory" && (
        <section className="home">
          <ManageCategory />
        </section>
      )}
      {id === "manageProduct" && (
        <section className="home">
          <ManageProduct />
        </section>
      )}
      {id === "addProduct" && (
        <section className="home">
          <AddProduct />
        </section>
      )}
      {id === "manageDiscount" && (
        <section className="home">
          <ManageDiscount />
        </section>
      )}
      {id === "addDiscount" && (
        <section className="home">
          <AddDiscount />
        </section>
      )}
      {id !== "dashboard" &&
        id !== "manageSupplier" &&
        id !== "addSupplier" &&
        id !== "managePurchase" &&
        id !== "addPurchase" &&
        id !== "addCategory" &&
        id !== "manageCategory" &&
        id !== "addProduct" &&
        id !== "manageProduct" &&
        id !== "manageDiscount" &&
        id !== "addDiscount" && (
          <>
            <section className="home">
              <Error/>
            </section>
          </>
        )}
    </>
  );
}

export default Home;
