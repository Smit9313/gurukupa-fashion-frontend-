import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { DatePicker } from "antd";
import { isEmpty } from "lodash";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

function StockReport() {
  // const [selectedDates, setSelectedDates] = useState([]);

  // function handleDateChange(dates) {
  //   setSelectedDates(dates);
  // }

  const history = useHistory();

  const [data, setData] = useState("");
  const [date, setDate] = useState();

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // const jsonData = {
    //   from_date: selectedDates[0].$d,
    //   until_date: selectedDates[1].$d,
    // };

    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    setDate(formattedDate);


    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/stock-report/`, {
          headers,
          // responseType: "blob",
        })
        .then((response) => {
          console.log(response);
          setData(response.data.data);
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
      name: <h4>Product Name</h4>,
      selector: (row) => row["Product name"],
      sortable: true,
    },
    {
      name: <h4>Size</h4>,
      selector: (row) => row.Size,
      sortable: true,
    },
    {
      name: <h4>Category-type</h4>,
      selector: (row) => row["Category-type"],
      sortable: true,
    },
    {
      name: <h4>Category</h4>,
      selector: (row) => row.Category,
      sortable: true,
    },
    {
      name: <h4>Description</h4>,
      selector: (row) => row["Product description"],
      sortable: true,
    },
    {
      name: <h4>Quantity</h4>,
      selector: (row) => row["Quantity"],
      sortable: true,
    },
    {
      name: <h4>Price</h4>,
      selector: (row) => row["Product price"],
      sortable: true,
    },
    {
      name: <h4>sub total</h4>,
      selector: (row) => row["Sub total"],
      sortable: true,
    },
  ];

  const printClass = (className) => {
    var elements = document.getElementsByClassName(className);
    var container = document.createElement("div");
    for (var i = 0; i < elements.length; i++) {
      container.appendChild(elements[i].cloneNode(true));
    }
    var printContents = container.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      <Header name="Stock Report" path="admin / stockReport" />
      {/* <div className="add-suplier supplier-report"> */}
      <div className="add-suplier-sub1">
        {/* <div className="box">
            <h3>Select date:</h3>
          </div> */}
        {/* <RangePicker onChange={handleDateChange} format={dateFormat} /> */}
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
                  window.open(`/admin/stockReportPdf/${date}`, "_blank")
                  // history.push(`/admin/stockReportPdf/${date}`)
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

export default StockReport;
