import React,{useState,useEffect} from 'react';
import '../Style/dashboard.css';
import DataTable from "react-data-table-component";
import { ConfigProvider, Badge } from "antd";
import axios from 'axios';
import SortIcon from "@mui/icons-material/ArrowDownward";


const CustomTitle = ({ row }) => (
  <div>
    {}
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
        {row.message}
      </div>
    </div>
  </div>
);

function Dashboard() {

const [search, setSearch] = useState("");
const [filteredCategory, setFilteredCategory] = useState([]);
 const [category, setCategory] = useState([]);
 
 const [searchCategory, setSearchCategory] = useState("");
 const [filteredCatType, setFilteredCatType] = useState([]);

 const [count,setCount] = useState();

 const [data,setData] = useState();


 useEffect(() => {
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .get("http://127.0.0.1:8000/admin-contact-us/", { headers })
          .then((response) => {
            console.log(response)
            // setCatType(response.data.data);
            setData(response.data.data);
            
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}

       try {
         axios
           .get("http://127.0.0.1:8000/admin-count-messages/", { headers })
           .then((response) => {
             console.log(response);
             // setCatType(response.data.data);
            //  setData(response.data.data);
            setCount(response.data.data["message_count"]);
           })
           .catch((error) => {
             console.log(error);
           });
       } catch (err) {}
    }, []);


    const customStyles = {
      rows: {
        style: {
          minHeight: "72px", // override the row height
        },
      },
      headCells: {
        style: {
          paddingLeft: "8px", // override the cell padding for head cells
          paddingRight: "8px",
        },
      },
      cells: {
        style: {
          paddingLeft: "18px", // override the cell padding for data cells
          paddingRight: "8px",
          paddingTop: "8px",
          paddingBottom: "8px",
        },
      },
    };


    const columns = [
      {
        name: <h4>gh</h4>,
        cell: (row) => row.name,
        sortable: true,
        // right: true,
      },
      {
        name: <h4>Name</h4>,
        cell: (row) => row.name,
        sortable: true,
      },
      {
        name: <h4>Date</h4>,
        selector: (row) => row.date.substring(0, 10),
        sortable: true,
      },
      {
        name: <h4>Email</h4>,
        cell: (row) => row.email,
        sortable: true,
      },
      {
        name: <h4>Status</h4>,
        selector: (row) => row.is_user,
        sortable: true,
      },
      {
        name: <h4>Subject</h4>,
        selector: (row) => row.subject,
        sortable: true,
      },
      {
        name: <h4>Message</h4>,
        selector: (row) => row.message,
        sortable: true,
        // maxWidth: "600px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: (row) => <CustomTitle row={row} />,
        width:"400px"
      },
    ];


  return (
    <>
      <div className="dashboard-container">
        <div className="dashboaed-header">
          <div></div>
          <div className="icon-header">
            <ConfigProvider
              theme={{
                colorPrimary: "#000",
                colorPrimaryHover: "#000",
                colorErrorText: "#000",
                colorError: "#000",
              }}>
              <Badge
                count={count}
                showZero
                className="cart-img"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}>
                {/* <i class="bx bxs-bell bell-icon" /> */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2645/2645897.png"
                  alt=""
                  className="bell-icon"
                />
              </Badge>
            </ConfigProvider>
          </div>
        </div>

        <div className="suplier-list">
          <DataTable
            columns={columns}
            data={data}
            title="Manage Messages"
            pagination
            sortable
            sortIcon={<SortIcon />}
            customStyles={customStyles}
            highlightOnHover
            subHeader
            subHeaderAlign="left"
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard