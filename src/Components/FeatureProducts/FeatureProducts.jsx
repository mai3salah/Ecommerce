import React, {useContext, useState} from 'react'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
export default function FeatureProducts() {  
 
  let {AddToCart, AddToFavourite, color, setColor} = useContext(cartContext)
  function addCart(id){
    AddToCart(id)
  }
   function addfavourite(id){
     AddToFavourite(id)
  }

   function getData(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
   }
   const {data, isLoading} = useQuery('featchData', getData)
  return (
    <>
    <div className="container">
      <div className="row">
      {isLoading?
        <div className='loading d-flex align-items-center justify-content-center'>
         <Triangle
          visible={true}
          height="80"
          width="80"
          color="var(--main-color)"
          ariaLabel="triangle-loading"
          wrapperClass=""/> </div>
           : ''}
        
        {data?.data?.data.map((product)=>
        <div key={product.id} className="col-xl-3 col-lg-4 col-sm-6 py-2 cursor-pointer">
          <div className="product px-2 pb-2 position-relative overflow-hidden">
          { color.includes(product.id)? 
          (localStorage.getItem('token') ?
          <i className="fa-solid color-main-light fa-heart position-absolute bg-main p-2 rounded-2"></i> : 
           <i className="fa-regular color-main-light fa-heart position-absolute bg-main p-2 rounded-2" onClick={()=>addfavourite(product.id)}></i>): 
           <i className="fa-regular color-main-light fa-heart position-absolute bg-main p-2 rounded-2" onClick={()=>{addfavourite(product.id);  setColor([...color, product._id])}}></i>}
            <div className="card-body">
            <Link to={`/details/` + product.id}>
            <img src={product.imageCover} className=" w-100" alt={product.imageCover}/>
              <h6 className="card-text text-main pt-2">{product.category.name}</h6>
              <h5 className="card-title">{product.title.split(" ").slice(0,3).join(' ')}</h5>
              <div className='d-flex justify-content-between'>
                <div>{product.price} L.E</div>
                <div><i className="fa fa-star rating-color"></i>{product.ratingsAverage}</div>
              </div>
            </Link>
              <p className="probtn p-1 text-center fw-bolder cursor-pointer" onClick={()=>addCart(product.id)}><i className="fa-solid fa-cart-plus"></i>  Add to cart</p>
            </div>
          </div>
          </div>
          )}
      </div>
    </div>
    </>
  )
}
