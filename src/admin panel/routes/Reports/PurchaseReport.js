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
      var formattedDate1 = day1 + "/" + month1 + "/" + year1;

      var date2 = new Date(selectedDates[1].$d);
      var day2 = ("0" + date2.getDate()).slice(-2);
      var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
      var year2 = date1.getFullYear();
      var formattedDate2 = day2 + "/" + month2 + "/" + year2;

      setDate([formattedDate1, formattedDate2]);

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
            // actions={
            //   <button
            //     className="supplier-add-btn"
            //     onClick={() => history.push("/admin/addCategory")}>
            //     Add new category_type
            //   </button>
            // }
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
        {!isEmpty(data) && (
          <div className="gamme-te tm_container">
            <div className="gamme-te tm_invoice_wrap">
              <div
                className="gamme-te tm_invoice tm_style1"
                id="tm_download_section">
                <div className="gamme-te tm_invoice_in">
                  <div className="gamme-te tm_invoice_head tm_align_center tm_mb20">
                    <div className="gamme-te tm_invoice_left">
                      <div className="gamme-te tm_logo">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2Fgurukrupa.png?alt=media&token=f6246337-bbac-46a9-b2bf-1abaac2de541"
                          alt="Logo"
                        />
                      </div>
                    </div>
                    <div className="gamme-te tm_invoice_right tm_text_right">
                      <div className="gamme-te tm_primary_color tm_f50 tm_text_uppercase">
                        Purchase Report
                      </div>
                    </div>
                  </div>
                  <div className="gamme-te tm_invoice_info tm_mb20">
                    <div className="gamme-te tm_invoice_seperator tm_gray_bg"></div>
                    <div className="gamme-te tm_invoice_info_list">
                      <p className="tm_invoice_number tm_m0 mar-b">
                        {/* Invoice No:{" "} */}
                        <b className="tm_primary_color">{data._id}</b>
                      </p>
                      <p className="tm_invoice_date tm_m0 mar-b">
                        <b className="tm_primary_color">
                          {/* {data.order_date.substring(0, 10)} */}
                          {console.log(date)}
                          {/* Sales Report : */}
                          {date[0]} to
                          {date[1]}
                        </b>
                      </p>
                    </div>
                  </div>

                  <div className="gamme-te tm_table tm_style1">
                    <div className="gamme-te tm_round_border tm_radius_0">
                      <div className="gamme-te tm_table_responsive">
                        <table className="table-style">
                          <thead>
                            <tr>
                              <th className="th-style tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg">
                                Purchase date
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Supplier name
                              </th>
                              <th className="th-style tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">
                                Product name
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Category-type
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Category
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Size
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Price
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Quantity
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Sub total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((val, index) => {
                              return (
                                <>
                                  <tr className="tm_table_baseline" key={index}>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Purchase date"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Supplier name"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Product name"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Category-type"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Category"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Size"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Purchase price"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Quantity"]}
                                    </td>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val["Sub total"]}
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <hr className="tm_mb20" />
                  <div className="gamme-te tm_text_center">
                    <p className="tm_mb5 mar-b">
                      <b className="tm_primary_color">Terms & Conditions:</b>
                    </p>
                    <p className="tm_m0 mar-b">
                      Your use of the Website shall be deemed to constitute your
                      understanding and approval of, and agreement{" "}
                      <br className="tm_hide_print" />
                      to be bound by, the Privacy Policy and you consent to the
                      collection.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="gamme-te tm_invoice_btns tm_hide_print"
                onClick={() => printClass("tm_container")}>
                <div className="tm_invoice_btn tm_color1">
                  <span className="tm_btn_icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ionicon"
                      viewBox="0 0 512 512">
                      <path
                        d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <rect
                        x="128"
                        y="240"
                        width="256"
                        height="208"
                        rx="24.32"
                        ry="24.32"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <path
                        d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle cx="392" cy="184" r="24" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="tm_btn_text">Print</span>
                </div>
              </div>
            </div>
          </div>
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
