import React, { useState } from "react";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { DatePicker } from "antd";
import { isEmpty } from "lodash";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

function PurchaseReport() {
  const [selectedDates, setSelectedDates] = useState([]);

  function handleDateChange(dates) {
    setSelectedDates(dates);
  }

  const handleClick = async () => {
    if (!isEmpty(selectedDates)) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const jsonData = {
        from_date: selectedDates[0].$d,
        until_date: selectedDates[1].$d,
      };

      try {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/purchase-report/`, jsonData, {
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
    } else {
      toast.error("Select date!", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Header name="Purchase Report" path="admin / purchaseReport" />
      <div className="add-suplier supplier-report">
        <div className="add-suplier-sub1">
          <div className="box">
            <h3>Select date:</h3>
          </div>
          <RangePicker onChange={handleDateChange} format={dateFormat}
            defaultValue={[
              dayjs("2023-02-03", dateFormat),
              dayjs(dayjs()),
            ]}/>
          <button
            className="button-311 supplier-report-button"
            onClick={handleClick}>
            Generate report
          </button>
        </div>
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
