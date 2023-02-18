import React,{useState,useEffect} from 'react';
import Header from '../../components/Header';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Footer from "../../components/Footer";
import '../../Style/addproduct.css';
import axios from 'axios';
import { Form, Select } from 'antd';
import Switch from "@mui/material/Switch";
import { Upload , message} from 'antd';
import { ToastContainer, toast } from "react-toastify";



function AddProduct() {
  const width = true;
  const [cat_typeflag, setCat_typeFlag] = useState(false);
  const [catid, setCatid] = useState("");
  const [cat_data, setCat_Data] = useState();
  const [sub_data , setSub_Data] = useState();
  const [images, setImages] = useState([]);

  const [name, setName] = useState(""); 
  const [subcatid, setSubCatid] = useState("");
  const [active,setActive] = useState(true);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");


   const toast_message = (message) => {
     if (message === "Success") {
       return toast.success("Category added", {
         position: "top-center",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
     } else if (message === "warning") {
       return toast.warn("Somthing wrong!", {
         position: "top-center",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
     } else {
     }
   };




  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(
          "http://127.0.0.1:8000/admin-category-type/",
          //  qs.stringify({ cat_type: cat_type, active: cat_status }),
          { headers }
        )
        .then((response) => {
          //  console.log(response.data.data);
          setCat_Data(
            response.data.data.map(({ cat_type, _id }) => ({
              label: cat_type,
              value: _id,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [cat_typeflag]);




  const handleChange = ({ fileList }) => setImages(fileList);
    // const formData = new FormData();

  // images.forEach((file) => {
  //   formData.append("images", file.originFileObj);
  // });

   const props = {
     multiple: true,
     onChange: handleChange,
     beforeUpload: (file) => {
       const isJpgOrPng =
         file.type === "image/jpeg" ||
         file.type === "image/png" ||
         file.type === "image/jpg";
       if (!isJpgOrPng) {
         message.error("You can only upload JPG/PNG file!");
       }
       const isLt2M = file.size / 1024 / 1024 < 2;
       if (!isLt2M) {
         message.error("Image must be smaller than 2MB!");
       }
       return !isJpgOrPng && !isLt2M;
     },
   };
  //  console.log(images)


   const handleProduct = async (e)=>{
       e.preventDefault();
    // console.log(images[0].originFileObj);
       const formData = new FormData();
       images.map(async (file,index) => {
         formData.append(index, file.originFileObj, file?.name);
         console.log(file.originFileObj)
         console.log()
       });

       if (name === "" || subcatid === "" 
            || description === "" || price === "" || 
              images === []){
          toast_message("warning"); 
       }


         if (
           name !== "" &&
           subcatid !== "" &&
           description !== "" &&
           price !== ""
         ) {
           const token = sessionStorage.getItem("token");
           // const headers = { Authorization: `Bearer ${token}`,
           // Content-Type: 'multipart/form-data',
           // };

           formData.append("prod_name", name);
           formData.append("cat_id", subcatid);
           formData.append("active", active);
           formData.append("prod_desc", description);
           formData.append("prod_price", price);

           try {
             axios
               .post(
                 "http://127.0.0.1:8000/admin-product/",
                 // qs.stringify({
                 // prod_name: name,
                 // cat_id: subcatid,
                 // active: active,
                 // prod_desc: description,
                 // prod_image: images[0].originFileObj,
                 formData,
                 {
                   headers: {
                     Authorization: `Bearer ${token}`,
                     "Content-Type": `multipart/form-data`,
                   },
                 }
               )
               .then((response) => {
                 console.log(response.data.message);
                 if(response.data.message === "Success!"){
                    toast_message("Success");
                    setName("")
                    setImages([]);
                    setActive(true);
                    setDescription("");
                    setPrice("");
                 }else{
                  toast_message("warning");
                 }

                 
                 
               })
               .catch((error) => {
                 console.log(error);
               });
           } catch (err) {}
         }
   }


  return (
    <>
      <Header name="Add Product" path="admin / addProduct" />
      <div className="add-suplier">
        <div className="add-suplier-sub1">
          <div className="box">
            <p>Enter product name:</p>
            <TextField
              label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              fullWidth={width}
            />
          </div>

          <div className="box">
            <p>Select category-type</p>
            <Select
              showSearch
              style={{ width: 332 }}
              placeholder="Search to Select"
              // value={}
              onChange={(value1) => {
                console.log(value1);
                const token = sessionStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                try {
                  axios
                    .get(
                      `http://127.0.0.1:8000/admin-cat-type-to-category/${value1}/`,
                      //  qs.stringify({ cat_type: cat_type, active: cat_status }),
                      { headers }
                    )
                    .then((response) => {
                      console.log(response.data.data.Category);
                      setSub_Data(
                        response.data.data.Category.map(
                          ({ cat_title, cat_id }) => ({
                            label: cat_title,
                            value: cat_id,
                          })
                        )
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } catch (err) {}
              }}
              size="medium"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={cat_data}
            />
          </div>

          <div className="box">
            <p>Select category</p>
            <Select
              showSearch
              style={{ width: 332 }}
              placeholder="Select category"
              value={subcatid}
              onChange={(value) => setSubCatid(value)}
              size="mediam"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={sub_data}
            />
          </div>

          <div className="box">
            <p>Enter status:</p>
            <Switch
              defaultChecked
              // checked={true}
              onChange={(e) => {
                console.log(e.target.checked);
                setActive(e.target.checked);
              }}
            />
          </div>

          <div className="box">
            <p>Enter product description:</p>
            <TextField
              label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="small"
              fullWidth={width}
            />
          </div>

          <div className="box">
            <p>Enter price:</p>
            <TextField
              label="price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              size="small"
              fullWidth={width}
            />
          </div>

          <div className="suplier-button">
            <button
              // variant="contained"
              className="button-311"
              type="submit"
              onClick={handleProduct}
              // endIcon={<SendIcon />}
              // fullWidth={width}
            >
              Add
            </button>
          </div>
        </div>

        <div className="add-suplier-sub1">
          <div className="box box-qty ds-flex">
            <p>select Product image:</p>
            <br />
            <Upload.Dragger
              {...props}
              fileList={images}
              multiple
              accept=".jpg,.png,.jpeg"
              listType="picture">
              Drag file here OR
              <br />
              <Button>upload</Button>
            </Upload.Dragger>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>
  );
}

export default AddProduct