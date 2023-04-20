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

  const handleClick = async () => {
    setLoader(true);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

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


  const printClass = (className) => {
    console.log("njfnkj")
    var elements = document.getElementsByClassName(className);
    var printContents = "";
    for (var i = 0; i < elements.length; i++) {
      printContents += elements[i].outerHTML;
    }
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

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
        {loader ?? (
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
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
                        Supplier Report
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
                        Date:{" "}
                        <b className="tm_primary_color">
                          {/* {data.order_date.substring(0, 10)} */}
                          20/4/2023
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
                                Name
                              </th>
                              <th className="th-style tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">
                                Mobile no
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Email
                              </th>
                              {/* <th className="th-style tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg">
                                Shop No
                              </th> */}
                              {/* <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                                Area/Street
                              </th> */}
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                                City
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                                State
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                                Pincode
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((val, index) => {
                            

                              return (
                                <>
                                  <tr className="tm_table_baseline" key={index}>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val.Name}
                                    </td>
                                    <td className="td-style tm_width_4">
                                      {val["Mobile No"]}
                                    </td>
                                    <td className="td-style tm_width_2">
                                      {val.Email}
                                    </td>
                                    {/* <td className="td-style tm_width_1">
                                      {val["Shop No"]}
                                    </td> */}
                                    {/* <td className="td-style tm_width_2 tm_text_right">
                                      {val["Area/Street"]}
                                    </td> */}
                                    <td className="td-style tm_width_2 tm_text_right">
                                      {val["City"]}
                                    </td>
                                    <td className="td-style tm_width_2 tm_text_right">
                                      {val["State"]}
                                    </td>
                                    <td className="td-style tm_width_2 tm_text_right">
                                      {val["Pincode"]}
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
    </>
  );
}

export default SupplierReport;
