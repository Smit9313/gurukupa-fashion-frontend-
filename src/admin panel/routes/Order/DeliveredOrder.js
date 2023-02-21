import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";


function DeliveredOrder() {
  const [pendingOrderData, setPendingOrderData] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get("http://127.0.0.1:8000/admin-purchase/", { headers })
        .then((response) => {
          console.log(response);
          pendingOrderData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

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
  ];

  return (
    <>
      <Header name="Delivered Order" path="admin / deliveredOrder" />
      <div className="suplier-list">
        <DataTable
          columns={columns}
          data={pendingOrderData}
          pagination
          highlightOnHover
        />
      </div>
    </>
  );
}

export default DeliveredOrder;
