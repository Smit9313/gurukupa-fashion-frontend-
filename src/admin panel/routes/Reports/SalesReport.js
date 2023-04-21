import React, { useState } from "react";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { DatePicker } from "antd";
import { isEmpty } from "lodash";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import dayjs from "dayjs";
import moment from "moment";
import DataTable from "react-data-table-component";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

function SalesReport() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [data, setData] = useState("");
  const [date, setDate] = useState();

  function handleDateChange(dates) {
    setSelectedDates(dates);
  }

  const handleClick = async () => {
    if (!isEmpty(selectedDates)) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      var date1 = new Date(selectedDates[0].$d);
      var day1 = ("0" + date1.getDate()).slice(-2);
      var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
      var year1 = date1.getFullYear();
      var formattedDate1 = month1 + "-" + day1 + "-" + year1;

      var date2 = new Date(selectedDates[1].$d);
      var day2 = ("0" + date2.getDate()).slice(-2);
      var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
      var year2 = date1.getFullYear();
      var formattedDate2 = month2 + "-" + day2 + "-" + year2;
      
      setDate(`${formattedDate1}-to-${formattedDate2}`)

      console.log(selectedDates[0].$d);
      const jsonData = {
        from_date: selectedDates[0].$d,
        until_date: selectedDates[1].$d,
      };

      // setDate(jsonData)
      
      try {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/sales-report/`, jsonData, {
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
    } else {
      toast.error("Select date!", {
        duration: 3000,
      });
    }
  };

  const columns = [
    {
      name: <h4>Product Name</h4>,
      selector: (row) => row["Product name"],
      sortable: true,
    },
    {
      name: <h4>Price</h4>,
      selector: (row) => row["Product price"],
      sortable: true,
    },
    {
      name: <h4>Size</h4>,
      selector: (row) => row["Product size"],
      sortable: true,
    },
    {
      name: <h4>Total quantity</h4>,
      selector: (row) => row["Total quantity"],
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
      <Header name="Sales Report" path="admin / salesReport" />
      {/* <div className="add-suplier supplier-report"> */}
      <div className="add-suplier-sub1">
        <div className="box">
          <h3>Select date:</h3>
        </div>
        <RangePicker
          onChange={handleDateChange}
          format={dateFormat}
          defaultValue={[dayjs("2023-02-03", dateFormat), dayjs(dayjs())]}
          disabledDate={(current) => {
            const now = new Date();
            const abc = new Date(now.getFullYear(), 0, 1);
            const abc1 = new Date(now.getFullYear(), 11, 31);
            return (
              current < abc ||
              current > abc1 ||
              current.isAfter(moment().subtract(1, "day"))
            );
          }}
        />
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
                  window.open(`/admin/salesReportPdf/${date}`, "_blank")
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
      <div className="suplier-list">
        
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

export default SalesReport;
