import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext'
export default function Login() {
const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
  let {setToken} = useContext(tokenContext)
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  let mySchema = Yup.object({
    email:Yup.string().email("email isn't valid").required('email is required'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,15}$/, 'password must start captial letter and least 6 char'),
  })
  let formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{
      getData(values)
    }
  })
  async function getData(values){
    setLoader(true)
   return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data)=>{
     if(data.data.message == "success"){
      setMessage(data.data.message)
      userMessage(data.data.message)
      localStorage.setItem('token', data.data.token)
      setToken(data.data.token)
      navigate('/')
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
      timer: 1300
    })
  }
  function userErrorMessage(error){
    MySwal.fire({
      title: error,
      icon: "error",
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <>
    {message? userMessage: ''}
    {error? userErrorMessage: ''}
    <h1 className='text-dark text-center mt-5 pt-1'>Login</h1>
    <div className="container">
      <div className="w-75 mx-auto">
      <form onSubmit={formik.handleSubmit}>
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
  <div className='d-flex'>
  {loader? <button className="btn btn-primary"> <i className="fa-solid fa-spinner fa-spin-pulse"></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-primary">Login</button>}
  <Link className="fw-bolder px-2 py-1 text-decoration-underline text-main cursor-pointer" to="/forgotpassword">Forgot password</Link>
  </div>
</form>
      </div>
    </div>
    </>
  )
}
