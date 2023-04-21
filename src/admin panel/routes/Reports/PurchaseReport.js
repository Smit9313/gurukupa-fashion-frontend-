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

function PurchaseReport() {
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

      setDate(`${formattedDate1}-to-${formattedDate2}`);

      const jsonData = {
        from_date: selectedDates[0].$d,
        until_date: selectedDates[1].$d,
      };

      try {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/purchase-report/`, jsonData, {
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
      name: <h4>Purchase date</h4>,
      selector: (row) => row["Purchase date"],
      sortable: true,
    },
    {
      name: <h4>Supplier name</h4>,
      selector: (row) => row["Supplier name"],
      sortable: true,
    },
    {
      name: <h4>Product name</h4>,
      selector: (row) => row["Product name"],
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
      name: <h4>Size</h4>,
      selector: (row) => row["Size"],
      sortable: true,
    },
    {
      name: <h4>Purchase price</h4>,
      selector: (row) => row["Purchase price"],
      sortable: true,
    },
    {
      name: <h4>Quantity</h4>,
      selector: (row) => row["Quantity"],
      sortable: true,
    },
    {
      name: <h4>sub total</h4>,
      selector: (row) => row["Sub total"],
      sortable: true,
    },
  ];


  return (
    <>
      <Header name="Purchase Report" path="admin / purchaseReport" />
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
                window.open(`/admin/purchaseReportPdf/${date}`, "_blank")
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

export default PurchaseReport;
