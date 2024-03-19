import React from 'react'
import './Cart.css'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom'
function Cart() {

  let [data,setData] = useState([])
  let {userData} = useSelector(state => state.user)
  useEffect(()=>{
    axios.get(`http://localhost:3000/cart/getproducts/${userData.username}`)
    .then((res)=>{
        let products = res.data.payload
        setData([...products])

        
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div>
      {data.map((item,index) =>{
          return (
            <Card
                  key={index}
                  className="product-card"
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
                      
                      <Link to={item.product_link}>
                        <Button size="small" color="primary">
                          Visit Product
                        </Button>
                      </Link>
                     
                    </div>
                  </CardContent>
                </Card>

      )})}
    </div>
  )
}

export default Cart