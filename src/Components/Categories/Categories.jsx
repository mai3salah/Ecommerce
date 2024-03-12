import React from 'react'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
export default function Categories() {
  function getCategoriesData(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
   }
   const {data, isLoading} = useQuery('categorData', getCategoriesData)
  //  console.log(data?.data?.data)

  // function spicifyCategory(id){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  //  }
  //  const spData = useQuery('specifycategorData', spicifyCategory)
  //  console.log(spData)




  return (
    <>
    <div className="container mt-5 pt-3">
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
        
        {data?.data?.data.map((category)=>
        <div key={category._id} className="col-xl-3 col-lg-4 col-sm-6 py-2 cursor-pointer mt-4">
          <Link to={ category._id}>
          <div className="product px-2 pb-2 position-relative overflow-hidden">
            <div className="card-body">
            <img src={category.image} className=" w-100 max-height" alt={category.image}/>
              <h6 className="card-text text-main fw-bolder pt-2">{category.name}</h6>
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
