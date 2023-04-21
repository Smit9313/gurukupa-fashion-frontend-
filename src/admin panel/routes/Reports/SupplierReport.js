import React, { useState } from "react";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { isEmpty } from "lodash";
import axios from "axios";
import DataTable from "react-data-table-component";
import ClipLoader from "react-spinners/ClipLoader";

function SupplierReport() {
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState();

  const handleClick = async () => {
    setLoader(true);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    setDate(formattedDate);

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/supplier-report/`, {
          headers,
          // responseType: "blob",
        })
        .then((response) => {
          console.log(response);
          setData(response.data.data);
          setLoader(false);
          //  console.log(response.headers);
          const contentDisposition = response.headers["content-disposition"];
          //  console.log(contentDisposition);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          //  console.log(url);
          const link = document.createElement("a");
          //  console.log(link);
          link.href = url;
          link.setAttribute(
            "download",
            contentDisposition.split(";")[1].split("=")[1].replaceAll('"', "")
          );
          document.body.appendChild(link);
          link.click();
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
      name: <h4>Name</h4>,
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: <h4>Mobile no</h4>,
      selector: (row) => row["Mobile No"],
      sortable: true,
    },
    {
      name: <h4>Email</h4>,
      selector: (row) => row.Email,
      sortable: true,
    },
    {
      name: <h4>Shop no</h4>,
      selector: (row) => row["Shop No"],
      sortable: true,
    },
    {
      name: <h4>Area/Street</h4>,
      selector: (row) => row["Area/Street"],
      sortable: true,
    },
    {
      name: <h4>City</h4>,
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: <h4>State</h4>,
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: <h4>Pincode</h4>,
      selector: (row) => row.Pincode,
      sortable: true,
    },
  ];


  return (
    <>
      <Header name="Supplier Report" path="admin / supplierReport" />
      {/* <div className="add-suplier supplier-report"> */}
      <div className="add-suplier-sub1">
        <button
          className="button-311 supplier-report-button"
          onClick={handleClick}>
          Generate report
        </button>
      </div>
      {/* </div> */}
      <div className="suplier-list">
        {!isEmpty(data) && (
          <DataTable
            columns={columns}
            data={data}
            // title="Manage Category_type"
            pagination
            highlightOnHover
            actions={
              <button
                className="supplier-add-btn"
                onClick={() => 
                // history.push("/admin/addCategory")
                window.open(`/admin/supplierReportPdf/${date}`, "_blank")
                }>
                pdf
              </button>
            }
            subHeader
            // subHeaderComponent={
            //   <input
            //     type="text"
            //     className="search-supplier"
            //     value={search}
            //     onChange={(e) => setSearch(e.target.value)}
            //     placeholder="Search here"
            //   />
            // }
            subHeaderAlign="left"
          />
        )}
        {loader ?? (
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
        )}
      </div>
    </>
  );
}

export default SupplierReport;
