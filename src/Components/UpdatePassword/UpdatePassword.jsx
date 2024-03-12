import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Triangle } from 'react-loader-spinner'
import axios from 'axios'
import toast from "react-hot-toast";
export default function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false)
  let mySchema = Yup.object({
    currentPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,15}$/, 'password must start captial letter and least 6 char'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,15}$/, 'password must start captial letter and least 6 char'),
    rePassword:Yup.string().required('password is required').oneOf([Yup.ref('password')], 'password not match'),
  })

let formik = useFormik({
  initialValues:{
    currentPassword:"",
    password:"",
    rePassword:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=>{
    setNewPassword(values)
  }
  
})

async function setNewPassword(values){
  setIsLoading(true)
 return axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, {
    headers: {
    token: localStorage.getItem('token')
  }
}).then((data)=>{
  console.log(data)
  if(data.data.message === "success"){
    toast.success(data.data.message)
    setIsLoading(false)
  }
 }).catch((err)=>{
   console.log(err)
   toast.error(err.response.data.message)
   setIsLoading(false)
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
      <h1 className='text-center mb-5 fw-bolder'>Update Password</h1>
    <form onSubmit={formik.handleSubmit}>
  <div className="mb-3 row">
    <div className="col-md-12 my-3">
      <input type="password" className="form-control"  placeholder="Your currentPassword......."  value={formik.values.currentPassword} name="currentPassword" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.currentPassword && formik.errors.currentPassword ? <p className='text-danger'>{formik.errors.currentPassword}</p>: ""}
    </div>
    <div className="col-md-12 my-3">
      <input type="password" className="form-control"  placeholder="Your new password......."  value={formik.values.password} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.password && formik.errors.password ? <p className='text-danger'>{formik.errors.password}</p>: ""}
    </div>
    <div className="col-md-12 my-3">
      <input type="password" className="form-control"  placeholder="reNewPassword......."  value={formik.values.rePassword} name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.rePassword && formik.errors.rePassword ? <p className='text-danger'>{formik.errors.rePassword}</p>: ""}
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
