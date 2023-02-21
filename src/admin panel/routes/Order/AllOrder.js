import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { ColorRing } from "react-loader-spinner";
import "../../Style/allorder.css";
import { Button, Input, Space, Switch } from "antd";
import qs from "qs";

function AllOrder() {
  const [pendingOrderData, setPendingOrderData] = useState();

  const [flag, setFlag] = useState(false);
  const [input, setInput] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(
          "http://127.0.0.1:8000/admin-order?order_status=Pending",
          // { order_status: "All"},
          { headers }
        )
        .then((response) => {
          setFlag(false);
          console.log(response);
          setPendingOrderData(response.data.data);
          setFlag(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("dshbhj");
    }
  }, []);

  const CustomTitle = ({ row }) => (
    <div>
      <div className="single-purchase">
        <div>
          <table className="order-data-table">
            <thead>
              <tr>
                <th>prod_disc</th>
                <th>prod_name</th>
                <th>prod_price</th>
                <th>size</th>
                <th>qty</th>
              </tr>
            </thead>
            <tbody>
              {row.Order_details.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{val.prod_disc}</td>
                    <td width="150px">{val.prod_name}</td>
                    <td width="100px">{val.prod_price}</td>
                    <td width="60px">{val.size}</td>
                    <td width="60px">{val.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>{row.title}</div>
      <div>
        <div
          data-tag="allowRowEvents"
          style={{
            color: "grey",
            overflow: "hidden",
            whiteSpace: "wrap",
            textOverflow: "ellipses",
          }}>
          {}
          {row.plot}
        </div>
      </div>
    </div>
  );

  const CustomTitle1 = ({ row }) => (
    <div>
      {row.order_status === "Pending" && (
        <>
          <Switch
            checked={input}
            checkedChildren="Input"
            unCheckedChildren="TextArea"
            onChange={() => {
              setInput(true);

               const token = sessionStorage.getItem("token");
               const headers = { Authorization: `Bearer ${token}` };
               try {
                 axios
                   .patch(
                     `http://127.0.0.1:8000/admin-order/${row._id}/`,
                     qs.stringify({ order_status: "Delivered"}),
                     { headers }
                   )
                   .then((response) => {
                     console.log(response)
                   })
                   .catch((error) => {
                     console.log(error);
                   });
               } catch (err) {
                 console.log("dshbhj");
               }


            }}
          />
        </>
      )}
      {row.order_status === "Delivered" && (
        <>
          <Switch
            checked={true}
            checkedChildren="Input"
            unCheckedChildren="TextArea"
            // onChange={() => {
            //   setInput(true);
            // }}
          />
        </>
      )}
      {row.order_status === "Failed" && (
        <>
          <h4>Failed</h4>
        </>
      )}{" "}
    </div>
  );

  const columns = [
    {
      name: <h4>Status</h4>,
      selector: (row) => row.Order_details,
      cell: (row) => <CustomTitle1 row={row} />,
      sortable: true,
      width: "130px",
    },
    {
      name: <h4>Name</h4>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <h4>Email</h4>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <h4>Mobile_no</h4>,
      selector: (row) => row.mobile_no,
      sortable: true,
    },
    {
      name: <h4>Address type</h4>,
      selector: (row) => row.add_type,
      sortable: true,
    },
    {
      name: <h4>House_no</h4>,
      selector: (row) => row.house_no,
      sortable: true,
    },
    {
      name: <h4>Area street</h4>,
      selector: (row) => row.area_street,
      sortable: true,
    },
    {
      name: <h4>City</h4>,
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: <h4>State</h4>,
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: <h4>Pincode</h4>,
      selector: (row) => row.pincode,
      sortable: true,
    },
    {
      name: <h4>Order date</h4>,
      selector: (row) => row.order_date.substring(0, 10),
      sortable: true,
    },
    {
      name: <h4>Total amount</h4>,
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name: <h4>Discount</h4>,
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: <h4>Payment method</h4>,
      selector: (row) => row.payment_method,
      sortable: true,
    },
    {
      name: <h4>Card last4</h4>,
      selector: (row) => row.card_last4,
      sortable: true,
    },
    {
      name: <h4>Purchase Details</h4>,
      selector: (row) => row.Order_details,
      cell: (row) => <CustomTitle row={row} />,
      width: "600px",
    },
  ];

  return (
    <>
      <Header name="All Order" path="admin / allOrder" />
      {flag ? (
        <div className="suplier-list">
          <DataTable
            columns={columns}
            data={pendingOrderData}
            pagination
            highlightOnHover
            subHeader
          />
        </div>
      ) : (
        <div className="color-ring">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#000", "#000", "#000", "#000", "#000"]}
          />
        </div>
      )}
    </>
  );
}

export default AllOrder;
