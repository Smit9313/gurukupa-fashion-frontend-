import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DataTable from "react-data-table-component";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function ManageCategory() {
  
    const history = useHistory();
    const [catType, setCatType] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCatType, setFilteredCatType] = useState([]);

    const [category, setCategory] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);

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

    }, [deleteFlag]);


    const confirm = (typeid) => {
      console.log(typeid);

      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        axios
          .delete(`http://127.0.0.1:8000/admin-category-type/${typeid}`, {
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

    const confirm1 = (catid) => {
      console.log(catid);

      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        axios
          .delete(`http://127.0.0.1:8000/admin-category/${catid}`, {
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



    const columns = [
      {
        name: <h4>Cat_type</h4>,
        selector: (row) => row.cat_type,
        sortable: true,
      },
      {
        name: <h4>Status</h4>,
        selector: (row) => row.active.toString(),
        sortable: true,
      },
      {
        name: <h4>Action</h4>,
        cell: (row) => (
          // <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
          //   Edit
          // </button>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        ),
        // right: true,
      },
      {
        name: <h4>Action</h4>,
        cell: (row) => (
          // <button
          //   className="supplier-delete-btn"
          //   onClick={() => alert(row._id)}>
          //   Delete
          // </button>
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
              title="Delete the task"
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
      },
    ];

    const columns1 = [
      {
        name: <h4>Cat_type</h4>,
        selector: (row) => row.cat_type,
        sortable: true,
        // right:true,
      },
      {
        name: <h4>Title</h4>,
        selector: (row) => row.cat_title,
        sortable: true,
      },
      {
        name: <h4>Description</h4>,
        selector: (row) => row.cat_desc,
        sortable: true,
      },
      {
        name: <h4>Active</h4>,
        selector: (row) => row.active.toString(),
        sortable: true,
      },
      {
        name: <h4>Edit</h4>,
        cell: (row) => (
          // <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
          //   Edit
          // </button>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        ),
        // right: true,
      },
      {
        name: <h4>Delete</h4>,
        cell: (row) => (
          // <button
          //   className="supplier-delete-btn"
          //   onClick={() => alert(row._id)}>
          //   Delete
          // </button>

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
              title="Delete the task"
              description="Are you sure to delete this record?"
              onConfirm={() => confirm1(row._id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              {" "}
              {/* <button className="supplier-delete-btn">Delete </button> */}
              <FontAwesomeIcon className="edit-supplier" icon={faTrashCan} />
            </Popconfirm>
          </ConfigProvider>
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

export default ManageCategory