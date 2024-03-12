import React ,{useState, useEffect}from 'react'
import { Triangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
export default function Brands() {
  function getCategoriesData(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
   }
   const {data, isLoading} = useQuery('categorData', getCategoriesData)
  return (
    <>
    <div className="container mt-5 pt-1">
      <div className="row">
      {isLoading?
        <div className='loading d-flex align-items-center justify-content-center'>
         <Triangle
          visible={true}
          height="80"
          width="80"
          color="var(--main-color)"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""/> </div>
           : ''}
        
        {data?.data?.data.map((brand)=>
        <div key={brand._id} className="col-xl-3 col-lg-4 col-sm-6 py-2 cursor-pointer mt-4">
          <Link to={brand._id}>
          <div className="product px-2 pb-2 position-relative overflow-hidden">
            <div className="card-body">
            <img src={brand.image} className=" w-100 max-height" alt={brand.image}/>
              <p className="card-text text-main fw-bolder text-light text-center fw-bold fs-4 pb-2 bg-main pt-2">{brand.name}</p>
            </div>
          </div>
          </Link>
          </div>
          )}
      </div>
    </div>
    </>
  )
}
