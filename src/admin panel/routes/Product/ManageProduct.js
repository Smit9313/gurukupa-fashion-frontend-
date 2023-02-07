import React,{useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from "axios";
import DataTable from "react-data-table-component";
import { width } from '@mui/system';

function ManageProduct() {

  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);


   useEffect(() => {
     const token = sessionStorage.getItem("token");
     const headers = { Authorization: `Bearer ${token}` };
     try {
       axios
         .get("http://127.0.0.1:8000/admin-product/", { headers })
         .then((response) => {
          // console.log(response.data.data);
          setProduct(response.data.data);
           setFilteredProduct(response.data.data);
         })
         .catch((error) => {
           console.log(error);
         });
     } catch (err) {}
   }, []);


   const columns = [
     {
       name: "Product name",
       selector: (row) => row.prod_name,
       sortable: true,
     },
     {
       name: " Category",
       selector: (row) => row.cat_title,
       sortable: true,
     },
     {
       name: "Desccription",
       selector: (row) => row.prod_desc,
       sortable: true,
     },
     {
       name: "created_at",
       selector: (row) => row.created_at,
       sortable: true,
     },
     {
       name: "prod_price",
       selector: (row) => row.prod_price,
       sortable: true,
     },
     {
       name: "active",
       selector: (row) => row.active.toString(),
       sortable: true,
     },
     {
       name: "Images",
       selector: (row) => (
         <>
           <img width="45px" height="50px" src={row.prod_image[0]} />{" "}
           <img width="45px" height="50px" src={row.prod_image[1]} />{" "}
           <img width="45px" height="50px" src={row.prod_image[2]} />
         </>
       ),
       width: "200px",
     },
     {
       name: "Action",
       cell: (row) => (
         <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
           Edit
         </button>
       ),
     },
     {
       name: "Action",
       cell: (row) => (
         <button className="supplier-delete-btn" onClick={() => alert(row._id)}>
           Delete
         </button>
       ),
     },
   ];

   useEffect(() => {
     const result = product.filter((supp) => {
       return supp.prod_name.toLowerCase().match(search.toLowerCase());
     });
     setFilteredProduct(result);
   }, [search]);
  

  return (
    <>
      <Header name="Manage Product" path="admin / manageProduct" />
      <div className="suplier-list">
        <DataTable
          columns={columns}
          data={filteredProduct}
          pagination
          highlightOnHover
          actions={
            <button
              className="supplier-add-btn"
              onClick={() => history.push("/admin/addProduct")}>
              Add new Product
            </button>
          }
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="search-supplier"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here"
            />
          }
          subHeaderAlign="left"
        />
      </div>
      <Footer />
    </>
  );
}

export default ManageProduct