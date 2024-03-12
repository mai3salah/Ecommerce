import React, {useContext, useState} from 'react'
import { useFormik } from 'formik'
import { Triangle } from 'react-loader-spinner'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext'
export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  let {setToken} = useContext(tokenContext)
  let navigate = useNavigate()
  let mySchema = Yup.object({
      email:Yup.string().email("email isn't valid").required('email is required'),
      newPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,15}$/, 'password must start captial letter and least 6 char'),
    })
 
  let formik = useFormik({
    initialValues:{
      email:"",
      newPassword:"",
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{
      setNewPassword(values)
    }
    
  })

  async function setNewPassword(values){
    setIsLoading(true)
   return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values).then((data)=>{
    console.log(data.data.token)
    if(data.data.token){
      localStorage.removeItem("token")
      setToken(null)
      setIsLoading(false)
      navigate("/login")
    }
   }).catch((err)=>{
     console.log(err)
   })
  }
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
    <div className="container mx-auto forget-content bg-light-subtle shadow">
      <h1 className='text-center mb-5 fw-bolder'>Reset Password</h1>
    <form onSubmit={formik.handleSubmit}>
  <div className="mb-3 row">
    <div className="col-md-12 my-3">
      <input type="email" className="form-control"  placeholder="Your email......."  value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.email && formik.errors.email ? <p className='text-danger'>{formik.errors.email}</p>: ""}
    </div>
    <div className="col-md-12 my-3">
      <input type="password" className="form-control"  placeholder="Your newpassword......."  value={formik.values.newPassword} name="newPassword" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.newPassword && formik.errors.newPassword ? <p className='text-danger'>{formik.errors.newPassword}</p>: ""}
    </div>
    <div className="col-md-5 my-3">
    <button type="submit" className="btn bg-main fw-bolder text-light fs-5 w-100" disabled={!(formik.isValid && formik.dirty)}>Reset password</button>
    </div>
  </div>
</form>
    </div>
}
    </>
  )
}
