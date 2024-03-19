// import React from "react";
// import "../search/search.css";
// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Button, CardActionArea, CardActions } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Recommend from "../recommend/Recommend";
// import Pagination from "react-js-pagination";

// function Search() {
//   let [searchData, setSearchData] = useState("");
//   let [flag, setFlag] = useState(false);
//   let [items, setItems] = useState([]);
//   let {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   let [find, setFind] = useState(false);

//   const [brands] = useState(["", "hp", "apple", "asus", "samsung", "omen"]);
//   const [platforms] = useState(["", "amazon", "flipkart"]);
//   const [types] = useState(["", "laptop", "phone", "AC", "fridge"]);
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [selectedPlatform, setSelectedPlatform] = useState("");
//   const [selectedType, setSelectedType] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000000);
//   const handleBrandChange = (e) => setSelectedBrand(e.target.value);
//   const handlePlatformChange = (e) => setSelectedPlatform(e.target.value);
//   const handleTypeChange = (e) => setSelectedType(e.target.value);
//   const handleMinPriceChange = (e) => setMinPrice(e.target.value);
//   const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
//   //result per page
//   const [resultPerPage,setResultPerPage]=useState(10)
//   const [productsCount,setProductsCount]=useState(0)
//   const [currentPage, setCurrentPage] = useState(1);
//   const [keyword, setKeyword] = useState('')


//   useEffect(() => {

//       let call = async () => {
//         console.log("serach string is", searchData);
//         let res = await axios.get(
//           `http://localhost:3000/product/search?keyword=${keyword}&brand=${selectedBrand}&type=${selectedType}&platform=${selectedPlatform}&priceL=${minPrice}&priceH=${maxPrice}&page_no=${currentPage}&pageC=${resultPerPage}`
//         );
//         console.log(res);
//         if (res.data.message == "no items found") {
//           console.log("data not fodund");
//           setFind(false);
//         } else {
//           setItems(res.data.products);
//           setProductsCount(res.data.productsCount)
//           console.log("nuimber from server is", res.data.productCount);
//           setFind(true);
//           console.log("data found");
//         }
//       };

//       call();
//   }, [flag,currentPage]);

//   let [rec, setRec] = useState(false);
//   let [pro, setPro] = useState("");

//   let recommend = (title) => {
//     console.log(title);
//     console.log("done");
//     setRec(true);
//     setPro(title);
//     console.log(rec, pro);
//   };
//   let [recommendedProducts, setRecommendedProducts] = useState([]);

//   useEffect(() => {
//     if (rec) {
//       let fun = async () => {
//         try {
//           const response = await axios.get(
//             `http://127.0.0.1:5000/recommend/${pro}`
//           );
//           console.log(response.data.recommended_products);
//           setRecommendedProducts(response.data.recommended_products);
//         } catch (error) {
//           console.error("Error fetching recommendations:", error);
//         }
//       };
//       fun();
//     }
//   }, [rec, pro]);
//   useEffect(() => {
//     if (pro.length != 0) {
//       console.log(pro);
//     }
//   }, [pro, rec]);

//   return (
//     <div className="search-container">
//       <div className="content">
//         <div className="left-panel">
//           <div className="filter">
//             <div className="search-page">
//               <div className="search-bar">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   onChange={(e)=>{setKeyword(e.target.value)}}
//                 />
//               </div>
//               <label>Brand</label>
//               <select value={selectedBrand} onChange={handleBrandChange}>
//                 {brands.map((brand, index) => (
//                   <option key={index} value={brand}>
//                     {brand}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="filter">
//               <label>Platform</label>
//               <select value={selectedPlatform} onChange={handlePlatformChange}>
//                 {platforms.map((platform, index) => (
//                   <option key={index} value={platform}>
//                     {platform}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="filter">
//               <label>Type</label>
//               <select value={selectedType} onChange={handleTypeChange}>
//                 {types.map((type, index) => (
//                   <option key={index} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="filter">
//               <label>Price Range</label>
//               <div className="price-range">
//                 <input
//                   type="number"
//                   value={minPrice}
//                   onChange={handleMinPriceChange}
//                   placeholder="Min Price"
//                 />
//                 to
//                 <input
//                   type="number"
//                   value={maxPrice}
//                   onChange={handleMaxPriceChange}
//                   placeholder="Max Price"
//                 />
//               </div>
//             </div>
//             <div className="filter">
//                 <input type="text" placeholder="No Of Products per page" onChange={(e)=>setResultPerPage(e.target.value)} />
//               </div>
//             <button onClick={() => setFlag(!flag)}>filter</button>
//           </div>

//         </div>

//         <div className="right-panel">
//           {rec && <Recommend data={recommendedProducts} />}

//           {find ? (
//             <div className="search-results">
//               <h1>Searched Products</h1>
//               {items &&
//                 items.map((item, index) => (
//                   <Card
//                     sx={{ maxWidth: 345 }}
//                     style={{
//                       padding: "20px",
//                       margin: "20px 40px",
//                       "max-height": "600px",
//                     }}
//                   >
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={item.image}
//                         alt="green iguana"
//                         className="card-img"
//                         style={{ height: "250px" }}
//                       />
//                       <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                           {item.title}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {item.description}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {item.price}
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                       <Button
//                         size="small"
//                         color="primary"
//                         onClick={() => {
//                           setPro(item.title);
//                           setRec(true);
//                           return recommend(item.title);
//                         }}
//                       >
//                         recommend
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 ))}
//             </div>
//           ) : (
//             <h1>No items found</h1>
//           )}
//         </div>
//         {resultPerPage < productsCount ? (
//             <div className="paginationBox">
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={productsCount}
//                 onChange={setCurrentPage}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           ) : null}
//       </div>
//     </div>
//   );
// }

// export default Search;




// by chatgpt 1

import React, { useState, useEffect } from "react";
import "../search/search.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import Recommend from "../recommend/Recommend";
import Pagination from "react-js-pagination";
import { useForm } from 'react-hook-form'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Button from '@mui/material/Button';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'



function Search() {
  const [searchData, setSearchData] = useState("");
  const [flag, setFlag] = useState(false);
  const [items, setItems] = useState([]);
  const [find, setFind] = useState(false);
  const [brands] = useState(["", "hp", "apple", "asus", "samsung", "omen"]);
  const [platforms] = useState(["", "amazon", "flipkart"]);
  const [types] = useState(["", "Laptops", "phones", "AC","Fridges", "Watches","speakers","TV","EarPhones","WashingMachine"]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [productsCount, setProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [rec, setRec] = useState(false);
  const [pro, setPro] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  let { register, handleSubmit } = useForm()

  useEffect(() => {
    const call = async () => {
      console.log("search string is", searchData);
      let res = await axios.get(
        `http://localhost:3000/product/search?keyword=${keyword}&brand=${selectedBrand}&type=${selectedType}&platform=${selectedPlatform}&priceL=${minPrice}&priceH=${maxPrice}&page_no=${currentPage}&pageC=${resultPerPage}`
      );
      console.log(res);
      if (res.data.message === "no items found") {
        console.log("data not found");
        setFind(false);
      } else {
        setItems(res.data.products);
        setProductsCount(res.data.productsCount);
        console.log("number from server is", res.data.productCount);
        setFind(true);
        console.log("data found");
      }
    };

    call();
  }, [flag, currentPage, keyword, resultPerPage]);

  useEffect(() => {
    if (rec) {
      const fun = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/recommend/${pro}`
          );
          console.log(response.data.recommended_products);
          setRecommendedProducts(response.data.recommended_products);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };
      fun();
    }
  }, [rec, pro]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleBrandChange = (e) => setSelectedBrand(e.target.value);
  const handlePlatformChange = (e) => setSelectedPlatform(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const handleSearchSubmit = (e) => {
    setKeyword(e.userInput); // Update the keyword for search
    setFlag(!flag); // Trigger the search
  };


  let navigate = useNavigate()
  let token = localStorage.getItem("token")
  let { userData, success } = useSelector(state => state.user)
  let [added, setAdded] = useState(false)
  const addToCart = async (item) => {
    if (!localStorage.getItem("token") || userData == null) {
      alert("login to add to cart")
      navigate("/login")

    }
    else {
      const res = await axios.post("http://localhost:3000/cart/addproduct",
        { usename: userData.username, title: item.title, price: item.price, description: item.description, type: item.type, product_link: item.product_link, image: item.image, platform : item.platform },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }

      )

      console.log(userData.username, success, item)
      if (res.data.message == "success") {
        alert("added to cart")
        setAdded(true)
      }
      else {
        console.log(res.data.message)
        alert("login to add to cart")
        navigate("/login")
      }
    }
  }


  return (
    <div className="search-container">
      <div className="content">
        <div className="search-bar">
          <form onSubmit={handleSubmit(handleSearchSubmit)}>

            <input
              type="text"
              placeholder="Search..."
              {...register("userInput")}
            />
            <Button
              variant="contained"
              endIcon={<FaSearch />}
              type="submit"
            >
              Search
            </Button>
          </form>

        </div>
        <button className="filter-btn" onClick={toggleFilter}>

          Filters
        </button>

        <div className="left-panel">
          <div className={`off-canvas ${showFilter ? "show" : ""}`}>
            <div className="filter">
              <label>Brand</label>
              <select value={selectedBrand} onChange={handleBrandChange}>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <label>Platform</label>
              <select value={selectedPlatform} onChange={handlePlatformChange}>
                {platforms.map((platform, index) => (
                  <option key={index} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <label>Type</label>
              <select value={selectedType} onChange={handleTypeChange}>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label>Price Range</label>
              <div className="price-range">
                <input
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  placeholder="Min Price"
                />
                to
                <input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  placeholder="Max Price"
                />
              </div>
              <div className="filter">
                <input
                  type="text"
                  placeholder="No Of Products per page"
                  onChange={(e) => setResultPerPage(e.target.value)}
                />
              </div>
              <button onClick={() => setFlag(!flag)}>Apply Filters</button>
              <button onClick={toggleFilter}>Close</button>
            </div>
          </div>
        </div>

        <div className="right-panel">
          {rec && <Recommend data={recommendedProducts} />}
          {find ? (
            <div className="search-results">
              <h1 className="searched">Searched Products</h1>
              {items.map((item, index) => (
                <Card
                  key={index}
                  className="product-card"
                  onClick={() => {
                    setPro(item.title);
                    setRec(true);
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '90%',
                    overflow: 'hidden',
                    alignItems: 'start', // Align items to the start to handle varying content heights
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: '30%', height: 'auto' }}
                    image={item.image}
                    alt={item.title}
                    className="card-img"
                  />
                  <CardContent
                    sx={{
                      width: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between', // Distribute space between content and buttons
                      paddingLeft: 2,
                    }}
                  >
                    <div>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Description:</strong> {item.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Price:</strong> {item.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Platform:</strong> {item.platform}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Type:</strong> {item.type}
                      </Typography>
                    </div>
                    <div style={{ "display": "flex", "flex-direction": "row" }}>
                      <Button size="small" color="primary" sx={{ marginBottom: 1 }} onClick={() => { addToCart(item) }}>
                        Add to List
                      </Button>
                      <Link to={item.product_link}>
                        <Button size="small" color="primary">
                          Visit Product
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          setPro(item.title);
                          setRec(true);
                        }}
                      >
                        recommend
                      </Button>
                    </div>
                  </CardContent>
                </Card>



              ))}
            </div>
          ) : (
            <h1>No items found</h1>
          )}
        </div>
        {resultPerPage < productsCount ? (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPage}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="active"
            />
          </div>
        ) : null}

      </div>
    </div>
  );

}

export default Search;

