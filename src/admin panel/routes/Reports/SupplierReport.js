import React, { useState } from "react";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import axios from "axios";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

function SupplierReport() {
  const [selectedDates, setSelectedDates] = useState([]);

  function handleDateChange(dates) {
    setSelectedDates(dates);
  }

  const handleClick = async () => {
    if (!isEmpty(selectedDates)) {
      console.log(selectedDates[0].$d);
      console.log(selectedDates[1].$d);
    }

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const jsonData = {
      from_date: selectedDates[0].$d,
      until_date: selectedDates[1].$d,
    };

    try {
      axios
        .get("http://127.0.0.1:8000/supplier-report/", {
          headers: headers,
          responseType: "blob",
        })
        .then((response) => {
          console.log(response);
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

  return (
    <>
      <Header name="Supplier Report" path="admin / supplierReport" />
      <div className="add-suplier supplier-report">
        <div className="add-suplier-sub1">
          <div className="box">
            <h3>Select date:</h3>
          </div>
          <RangePicker onChange={handleDateChange} format={dateFormat} />
          <button
            className="button-311 supplier-report-button"
            onClick={handleClick}>
            Generate report
          </button>
        </div>
      </div>
    </>
  );
}

export default SupplierReport;
