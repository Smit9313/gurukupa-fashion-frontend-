import React,{useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import '../../Style/managesuplier.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import axios from 'axios';
import DataTable from 'react-data-table-component';



function ManageSuplier() {
  
    const history = useHistory();
    const [supplier, setSupplier] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredSupplier, setFilteredSupplier] = useState([]);


  useEffect(() => {
     const token = sessionStorage.getItem("token");
     const headers = { Authorization: `Bearer ${token}` };
     try {
       axios
         .get("http://127.0.0.1:8000/admin-supplier/", { headers })
         .then((response) => {
           setSupplier(response.data.data);
           setFilteredSupplier(response.data.data);
         })
         .catch((error) => {
           console.log(error);
         });
     } catch (err) {

     }
  }, [])
  
  const columns = [
    {
      name: "Supplier Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile no",
      selector: (row) => row.mobile_no,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "shop_no",
      selector: (row) => row.shop_no,
      sortable: true,
    },
    {
      name: "Area street",
      selector: (row) => row.area_street,
      sortable: true,
    },
    {
      name: "Landmark",
      selector: (row) => row.landmark,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode,
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
    const result = supplier.filter((supp)=>{
        return supp.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredSupplier(result);
  }, [search])
  


  return (
    <>
      <Header name="Suplier List" path="admin / manageSuplier" />
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
            <input type="text"  
              className='search-supplier'
              value={search}
              onChange={(e)=>setSearch(e.target.value)} 
              placeholder="Search here" />
          }
          subHeaderAlign="left"
        />
      </div>
      <Footer />
    </>
  );
}

export default ManageSuplier