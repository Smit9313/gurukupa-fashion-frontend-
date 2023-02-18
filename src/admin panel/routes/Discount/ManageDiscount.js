import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header'
import axios from 'axios';
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function ManageDiscount() {


   const history = useHistory();
   const [discount, setDiscount] = useState([]);
   const [search, setSearch] = useState("");
   const [filteredSupplier, setFilteredSupplier] = useState([]);
   const [deleteFlag, setDeleteFlag] = useState(false);

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
   }, [deleteFlag]);

   const confirm = (discid) => {
     console.log(discid);

     const token = sessionStorage.getItem("token");
     const headers = { Authorization: `Bearer ${token}` };

     try {
       axios
         .delete(`http://127.0.0.1:8000/product-discount/${discid}/`, {
           headers,
         })
         .then((response) => {
           console.log(response);
           if (response.data.message === "Success!") {
             message.success("deleted successfully!");
             setDeleteFlag(!deleteFlag);
           } else {
             toast.error(response.data.message, {
               duration: 3000,
             });
           }
         })
         .catch((error) => {
           console.log(error);
         });
     } catch (err) {
       console.log("Error");
     }
   };
   const cancel = (e) => {
     console.log(e);
     message.error("Click on No");
   };

   const columns = [
     {
       name: <h4>Edit</h4>,
       cell: (row) => (
         <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
       ),
       //  right:true,
       width: "100px",
     },
     {
       name: <h4>Delete</h4>,
       cell: (row) => (
         //  <button className="supplier-delete-btn" onClick={() => alert(row._id)}>
         //    Delete
         //  </button>

         <ConfigProvider
           theme={{
             components: {
               Button: {
                 colorPrimary: "rgb(140, 2, 2)",
                 colorPrimaryHover: "#000",
                 colorPrimaryClick: "#000",
               },
             },
           }}>
           <Popconfirm
             title="Delete"
             description="Are you sure to delete this record?"
             onConfirm={() => confirm(row._id)}
             onCancel={cancel}
             okText="Yes"
             cancelText="No">
             {" "}
             {/* <button className="supplier-delete-btn">Delete </button> */}
             <FontAwesomeIcon className="edit-supplier" icon={faTrashCan} />
           </Popconfirm>
         </ConfigProvider>
       ),
       width: "100px",
     },
     {
       name: <h4>Discount percentage</h4>,
       selector: (row) => row.disc_percent,
       sortable: true,
     },
     {
       name: <h4>Valid From:</h4>,
       selector: (row) => row.valid_from.substring(0, 10),
       sortable: true,
     },
     {
       name: <h4>Valid Until:</h4>,
       selector: (row) => row.valid_until.substring(0, 10),
       sortable: true,
     },
     {
       name: <h4>Coupon Code</h4>,
       selector: (row) => row.coupon_code,
       sortable: true,
     },
     {
       name: <h4>Minimum Order Value</h4>,
       selector: (row) => row.min_ord_val,
       sortable: true,
     },
     {
       name: <h4>Maximum Discount Amount</h4>,
       selector: (row) => row.max_disc_amt,
       sortable: true,
     },
     //  {
     //    name: <h4>Edit</h4>,
     //    cell: (row) => (
     //      <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
     //        Edit
     //      </button>
     //    ),
     //  },
     //  {
     //    name: <h4>Delete</h4>,
     //    cell: (row) => (
     //      <button className="supplier-delete-btn" onClick={() => alert(row._id)}>
     //        Delete
     //      </button>
     //    ),
     //  },
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
      <Toaster
        position="top-center"
        containerStyle={{
          top: 10,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default ManageDiscount