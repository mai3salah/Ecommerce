import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  let mySchema = Yup.object({
    name:Yup.string().required('name is required').min(3,'min is 3 char').max(15, 'max is 15 char') ,
    email:Yup.string().email("email isn't valid").required('email is required'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,15}$/, 'password must start captial letter and least 6 char'),
    rePassword:Yup.string().required('password is required').oneOf([Yup.ref('password')], 'password not match'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'phone is not valid')
  })
  let formik = useFormik({
    initialValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{
      getData(values)
    }
  })
  async function getData(values){
    console.log(values)
    setLoader(true)
   return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data)=>{
     if(data.data.message === "success"){
      setMessage(data.data.message)
      userMessage(data.data.message)
      navigate('/login')
      setLoader(false)
     }
   }).catch((err)=>{
    setError(err.response.data.message)
    userErrorMessage(err.response.data.message)
    setLoader(false)
   })
  }
  
  function userMessage(data){
    MySwal.fire({
      title: data,
      icon: "success",
      showConfirmButton: false,
      timer: 1000
    })
  }
  function userErrorMessage(error){
    MySwal.fire({
      title: error,
      icon: "error",
      showConfirmButton: false,
      timer: 1300  
    })
  }
  return (
    <>
    {message? userMessage: ''}
    {error? userErrorMessage: ''}
    <h1 className='text-dark text-center  mt-5 pt-1'>Register</h1>
    <div className="container">
      <div className="w-75 mx-auto">
      <form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputName1" className="form-label">Name:</label>
    <input type="text" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name='name' id="exampleInputName1"/>
    {formik.touched.name && formik.errors.name ? <p className='text-danger'>{formik.errors.name}</p>: ""}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
    <input type="email" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' id="exampleInputEmail1"/>
    {formik.touched.email && formik.errors.email ? <p className='text-danger'>{formik.errors.email}</p>: ""}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
    <input type="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name='password' id="exampleInputPassword1"/>
    {formik.touched.password && formik.errors.password ? <p className='text-danger'>{formik.errors.password}</p>: ""}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputRePassword1" className="form-label">RePassword:</label>
    <input type="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} name='rePassword' id="exampleInputRePassword1"/>
    {formik.touched.rePassword && formik.errors.rePassword ? <p className='text-danger'>{formik.errors.rePassword}</p>: ""}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputphone1" className="form-label">Phone:</label>
    <input type="tel" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' id="exampleInputphone1"/>
    {formik.touched.phone && formik.errors.phone ? <p className='text-danger'>{formik.errors.phone}</p>: ""}
  </div>
  {loader? <button className="btn btn-primary"> <i className="fa-solid fa-spinner fa-spin-pulse"></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-primary">Register</button>}
  
</form>
      </div>
    </div>
    </>
  )
}
