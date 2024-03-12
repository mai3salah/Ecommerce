import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ForgotPassword() {
  const [resetPassword, setResetPassword] = useState(true)
  let navigate = useNavigate()
  let mySchema;
  if(resetPassword){

    mySchema = Yup.object({
      email:Yup.string().email("email isn't valid").required('email is required')
    })
  }else{
    mySchema = Yup.object({
    resetCode:Yup.string().required('resetCode is required').matches(/^[0-9]{6}$/, 'resetCode must be 6 numbers')
  })
  }
  let initialValues = resetPassword? {email:""} : {resetCode:""}
  let formik = useFormik({
    initialValues:initialValues,
    validationSchema:mySchema,
    onSubmit:(values)=>{
    getEmail(values)
    }
    
  })
 
   let  endPoint =  resetPassword? "forgotPasswords" : "verifyResetCode"
 
  async function getEmail(values){
    setResetPassword(false)
   return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/${endPoint}`, values).then((data)=>{
    if(data.data.status === "Success"){
      navigate('/resetPassword')
    }
   }).catch((err)=>{

   })
  }
  
  return (
    <>
    <div className="container mx-auto forget-content bg-light-subtle shadow">
      <h1 className='text-center mb-5 fw-bolder'>Forgot Password</h1>
    <form onSubmit={formik.handleSubmit}>
      {/* {newPassword? '' :   */}
     
  <div className="mb-3 row">
    <div className="col-md-9">
      {resetPassword? 
      <>
      <input type="email" className="form-control"  placeholder="Enter your email......."  value={formik.values.email || ''} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.email && formik.errors.email ? <p className='text-danger'>{formik.errors.email}</p>: ""}
      </>
      : 
      <>
      <input type="text" className="form-control" placeholder="Enter reset number......." value= {formik.values.resetCode || ''} name="resetCode" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.resetCode && formik.errors.resetCode ? <p className='text-danger'>{formik.errors.resetCode}</p>: ""}
      </>
    }
    </div>
    <div className="col-md-3">
    {resetPassword? 
    <button type="submit" className="btn bg-main fw-bolder text-light fs-5 w-100" disabled={!(formik.isValid && formik.dirty)}>Next</button>
    :
    <button type="submit" className="btn bg-main fw-bolder text-light fs-5 w-100" disabled={!(formik.isValid && formik.dirty)}>confirm</button>

}
    </div>
  </div>
   {/* } */}
</form>
    </div>
    </>
  )
}
