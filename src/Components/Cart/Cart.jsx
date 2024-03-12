import React,{ useContext, useState, useEffect} from 'react'
import axios from 'axios';
import { Triangle } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';
export default function Cart() {
  const [numberOfItems, setNumberOfItems] = useState(0)
  const [finallyTotal, setFinallyTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  let {getCartItems,showCartItems, setShowCartItems} = useContext(cartContext)
  function deleteItem(id){
    removeFromCart(id)
  }
   async function removeFromCart(id){
    setIsLoading(true)
  
        const data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/` + id, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setShowCartItems(data.data.data.products)
        cartItems()
        setIsLoading(false)
}

   async function updateCount(id, count){
        if(count < 1){
          removeFromCart(id)
        }else{
          const data = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/` + id, {
          count
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setShowCartItems(data.data.data.products)
        setFinallyTotal(data.data.data.totalCartPrice)
        }
}

  async function cartItems(){
    
        const data = await getCartItems();
        setIsLoading(false)
        if(data?.data.status == "success"){
          setFinallyTotal(data?.data.data.totalCartPrice)
          setNumberOfItems(data?.data.numOfCartItems)
      setShowCartItems(data?.data.data.products)
    }else{
      setNumberOfItems(0)
    }
       
}
useEffect(() => {
  cartItems()
}, [])

  return (
    <>
    {isLoading? <div className='loading d-flex align-items-center justify-content-center'>
         <Triangle
          visible={true}
          height="80"
          width="80"
          color="var(--main-color)"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""/> </div>:
  <div className="container mt-5 pt-1">
    {showCartItems && numberOfItems>=1? 
    <>
    <h2 className=' text-center my-3 bg-main text-light p-2 fw-bolder'>cart Items : {numberOfItems}</h2> 
  {showCartItems.map((data)=>
<div key={data.product._id} className="card my-3">
  <div className="row g-0">
    <div className="col-md-2">
      <img src={data.product.imageCover} className="img-fluid rounded-start w-100" alt={data.product.imageCover}/>
    </div>
    <div className="col-md-10 position-relative">
      <div className ="card-body">
        <h5 className="card-title mb-4 fw-bolder">{data.product.title.split(" ").slice(0,3).join(' ')}</h5>
        <ul className=' list-unstyled'>
          <li className='fw-bolder mb-2'>Brand: <span className='color-main'>{data.product.brand.name}</span></li>
          <li className='fw-bolder mb-2'>Category: <span className='color-main'>{data.product.category.name}</span></li>
          <li className='fw-bolder mb-2'>Rating: <i className="fa fa-star rating-color"></i>{data.product.ratingsAverage}</li>
        </ul>
        <p className='fw-bolder'> Price: {data.price} L.E</p>
        <div className='badge text-dark'>
        <i className="fa-solid fa-minus p-2 count-btn rounded-2 cursor-pointer" onClick={()=>updateCount(data.product._id, data.count - 1)}></i>
        <span className='fw-bolder p-2'>{data.count}</span>
        <i className="fa-solid fa-plus p-2 count-btn rounded-2 cursor-pointer" onClick={()=>updateCount(data.product._id, data.count + 1)}></i>
        </div>
        <p className='fw-bolder position-absolute top-0 end-0 bg-main p-1 text-light'>Total: {(data.price)*(data.count)} L.E</p>
        <i className="fa-solid fa-xmark p-2 close-btn rounded-2 position-absolute cursor-pointer bottom-0 end-0 m-3" onClick={()=>deleteItem(data.product._id)}></i>
      </div>
    </div>
</div>
</div>
)}
<div className=' d-flex justify-content-around bg-main p-2'>
  <h3 className='fw-bolder'>Total:</h3>
  <h3 className='fw-bolder'>{finallyTotal} L.E</h3>
</div> 
<Link className='badge bg-main cursor-pointer p-2 text-light fw-bolder fs-6 mt-2' to="/checkout">
  Checkout
</Link>
</>
: <h2 className=' text-center my-3 bg-danger bg-gradient text-light p-2 fw-bolder'>There are no items in your cart</h2>}
  </div>
}
    </>
  )
}
