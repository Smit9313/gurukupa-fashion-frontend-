import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DataTable from "react-data-table-component";
import axios from "axios";

function ManageCategory() {
  
    const history = useHistory();
    const [catType, setCatType] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCatType, setFilteredCatType] = useState([]);

    const [category, setCategory] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");
    const [filteredCategory, setFilteredCategory] = useState([]);

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .get("http://127.0.0.1:8000/admin-category-type/", { headers })
          .then((response) => {
            // console.log(response)
            setCatType(response.data.data);
            setFilteredCatType(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}

       try {
         axios
           .get("http://127.0.0.1:8000/admin-category/", { headers })
           .then((response) => {
            //  console.log(response)
             setCategory(response.data.data);
             setFilteredCategory(response.data.data);
           })
           .catch((error) => {
             console.log(error);
           });
       } catch (err) {}

    }, []);

    const columns = [
      {
        name: "Cat_type",
        selector: (row) => row.cat_type,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.active.toString(),
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
            Edit
          </button>
        ),
        right: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <button
            className="supplier-delete-btn"
            onClick={() => alert(row._id)}>
            Delete
          </button>
        ),
      },
    ];

    const columns1 = [
      {
        name: "Cat_type",
        selector: (row) => row.cat_type,
        sortable: true,
        // right:true,
      },
      {
        name: "Title",
        selector: (row) => row.cat_title,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.cat_desc,
        sortable: true,
      },
      {
        name: "Active",
        selector: (row) => row.active.toString(),
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
            Edit
          </button>
        ),
        right: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <button
            className="supplier-delete-btn"
            onClick={() => alert(row._id)}>
            Delete
          </button>
        ),
      },
    ];

    useEffect(() => {
      const result = catType.filter((type) => {
        return type.cat_type.toLowerCase().match(search.toLowerCase());
      });
      setFilteredCatType(result);
    }, [search]);

    useEffect(() => {
      const result = category.filter((type) => {
        return type.cat_type.toLowerCase().match(searchCategory.toLowerCase());
      });
      setFilteredCategory(result);
    }, [searchCategory]);


  return (
    <>
      <Header name="Manage Category" path="admin / manageCategory" />
      <div className="suplier-list">
        <DataTable
          columns={columns}
          data={filteredCatType}
          title="Manage Cat_type"
          pagination
          highlightOnHover
          actions={
            <button
              className="supplier-add-btn"
              onClick={() => history.push("/admin/addCategory")}>
              Add new category_type
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

      <div className="suplier-list">
        <DataTable
          columns={columns1}
          data={filteredCategory}
          title="Manage category"
          pagination
          highlightOnHover
          actions={
            <button
              className="supplier-add-btn"
              onClick={() => history.push("/admin/addCategory")}>
              Add new category
            </button>
          }
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="search-supplier"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
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

export default ManageCategory