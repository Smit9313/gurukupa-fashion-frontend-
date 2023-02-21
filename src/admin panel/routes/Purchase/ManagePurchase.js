import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import "../../Style/managepurchase.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function ManagePurchase() {
  const [purchaseData, setpurchaseData] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get("http://127.0.0.1:8000/admin-purchase/", { headers })
        .then((response) => {
          console.log(response);
          setpurchaseData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  const CustomTitle = ({ row }) => (
    <div>
      {row.Purchase_details.map((val, index) => {
        return (
          <div key={index} className="single-purchase">
            <p>Name : {val.prod_name}</p>
            <p>Price : {val.purch_price}</p>

            <div>
              <table className="purchase-data-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {val.purch_qty.map((val1, index1) => {
                    return (
                      <tr key={index1}>
                        <td>{val1.size}</td>
                        <td>{val1.qty}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

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

  

  const columns = [
    {
      name: <h4>Edit</h4>,
      cell: (row) => (
        <Link to={`updatePurchase/${row._id}`}>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        </Link>
      ),
      //  right:true,
      width: "100px",
    },
    {
      name: <h4>Supplier name</h4>,
      selector: (row) => row.supp_name,
      sortable: true,
    },
    {
      name: <h4>Purchase date</h4>,
      selector: (row) => row.date.substring(0, 10),
      sortable: true,
    },
    {
      name: <h4>Purchase Details</h4>,
      selector: (row) => row.Purchase_details,
      cell: (row) => <CustomTitle row={row} />,
    },
  ];

  return (
    <>
      <Header name="Manage Purchase" path="admin / managePurchase" />
      <div className="suplier-list">
        <DataTable
          columns={columns}
          data={purchaseData}
          pagination
          highlightOnHover
        />
      </div>
    </>
  );
}

export default ManagePurchase;
