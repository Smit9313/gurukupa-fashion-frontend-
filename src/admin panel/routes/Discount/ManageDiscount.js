import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header'
import axios from 'axios';
import DataTable from "react-data-table-component";

function ManageDiscount() {


   const history = useHistory();
   const [discount, setDiscount] = useState([]);
   const [search, setSearch] = useState("");
   const [filteredSupplier, setFilteredSupplier] = useState([]);

   useEffect(() => {
     const token = sessionStorage.getItem("token");
     const headers = { Authorization: `Bearer ${token}` };
     try {
       axios
         .get("http://127.0.0.1:8000/product-discount/", { headers })
         .then((response) => {
           setDiscount(response.data.data);
           setFilteredSupplier(response.data.data);
         })
         .catch((error) => {
           console.log(error);
         });
     } catch (err) {}
   }, []);

   const columns = [
     {
       name: "Discount percentage",
       selector: (row) => row.disc_percent,
       sortable: true,
     },
     {
       name: "Valid From:",
       selector: (row) => row.valid_from,
       sortable: true,
     },
     {
       name: "Valid Until:",
       selector: (row) => row.valid_until,
       sortable: true,
     },
     {
       name: "Coupon Code",
       selector: (row) => row.coupon_code,
       sortable: true,
     },
     {
       name: "Minimum Order Value",
       selector: (row) => row.min_ord_val,
       sortable: true,
     },
     {
       name: "Maximum Discount Amount",
       selector: (row) => row.max_disc_amt,
       sortable: true,
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
     const result = discount.filter((supp) => {
       return supp.coupon_code.toLowerCase().match(search.toLowerCase());
     });
     setFilteredSupplier(result);
   }, [search]);
  
  return (
    <>
      <Header name="Manage Discount" path="admin / manageDiscount" />
      <div className="suplier-list">
        <DataTable
          columns={columns}
          data={filteredSupplier}
          pagination
          highlightOnHover
          actions={
            <button
              className="supplier-add-btn"
              onClick={() => history.push("/admin/addSupplier")}>
              Add new supplier
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
    </>
  );
}

export default ManageDiscount