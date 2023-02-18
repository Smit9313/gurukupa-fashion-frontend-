import React,{useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from "axios";
import DataTable from "react-data-table-component";
import { width } from '@mui/system';
import { Toaster, toast } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function ManageProduct() {

  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
     const [deleteFlag, setDeleteFlag] = useState(false);


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
   }, [deleteFlag]);

    const confirm = (prodid) => {
      console.log(prodid);

      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        axios
          .delete(`http://127.0.0.1:8000/admin-product/${prodid}/`, {
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
       name: <h4>Images</h4>,
       selector: (row) => (
         <>
           <img width="40px" height="50px" src={row.prod_image[0]} />{" "}
           <img width="40px" height="50px" src={row.prod_image[1]} />{" "}
           <img width="40px" height="50px" src={row.prod_image[2]} />
         </>
       ),
       width: "200px",
     },

     {
       name: <h4>Product name</h4>,
       selector: (row) => row.prod_name,
       sortable: true,
       width: "170px",
     },
     {
       name: <h4>Category</h4>,
       selector: (row) => row.cat_title,
       sortable: true,
       width: "170px",
     },
     {
       name: <h4>Desccription</h4>,
       selector: (row) => row.prod_desc,
       sortable: true,
     },
     {
       name: <h4>created_at</h4>,
       selector: (row) => row.created_at.substring(0, 10),
       sortable: true,
       width: "200px",
     },
     {
       name: <h4>prod_price</h4>,
       selector: (row) => row.prod_price,
       sortable: true,
       width: "130px",
     },
     {
       name: <h4>active</h4>,
       selector: (row) => row.active.toString(),
       sortable: true,
       width: "100px",
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

export default ManageProduct