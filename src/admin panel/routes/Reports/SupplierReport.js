import React, { useState } from "react";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { isEmpty } from "lodash";
import axios from "axios";


function SupplierReport() {

  const handleClick = async () => {

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };



    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/supplier-report/`, {
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
          
          </div>
          
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
