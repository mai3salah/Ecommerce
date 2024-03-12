import React,{useContext, useState} from 'react'
import { useFormik } from 'formik'
import toast from "react-hot-toast";
import { cartContext } from '../../Context/CartContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Checkout() {
  const [isOnline, setIsOnline] = useState(false)
  let navigate = useNavigate()
  let {cartId, setCountOfItems, setCartId} = useContext(cartContext)
  function validate(values){
      let errors = {}
      if(!values.city){
        errors.city = 'this field is required';
      }else if(values.city.length < 3){
        errors.city = "min length of char is 3 char"
      }
      if(!values.phone){
        errors.phone = 'this field is required';
      }else if(/^01[0125][0-9]{8}$/.test(values.phone)){
        errors.phone = "please write valid phone number"
      }
      if(!values.details){
        errors.details = 'this field is required';
      }else if(values.details.length < 5){
        errors.details = "min length of char is 5 char"
      }
      return errors
  }
  let formik = useFormik({
    initialValues:{
      details: "",
        phone: "",
        city: ""
    },
    validate,
    onSubmit:(values)=> paymentHandeling(values)
    
  })
  async function paymentHandeling(shippingAddress){
   let endPoint =  isOnline?
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
    :
     `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
    
      try {
          const data = await axios.post(endPoint,{shippingAddress},{
              headers: {
                  token: localStorage.getItem('token')
              }
          });
         toast.success(data.data.status)
         if(isOnline){ 
         window.location.href = data.data.session.url;
         }else{
         setTimeout(()=>{
          navigate("/allorders") 
         },3000)
        }
        setCartId(null)
         setCountOfItems(0)

      } catch (err) {
          console.log(err);
          toast.error("error!!!!")
      }

  }
  return (
    <>
    <div className="container mt-5 pt-3">
    <form onSubmit={formik.handleSubmit}> 
  
  <div className="my-3">
    <input type="number" className="form-control" name='phone' placeholder='Phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    {formik.touched.phone && formik.errors.phone ? <p className=' text-danger p-2 fw-bolder'>{formik.errors.phone}</p> : ''}
  </div>
  <div className="my-3">
    <input type="text" className="form-control" name='city' placeholder='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    {formik.touched.city && formik.errors.city ? <p className=' text-danger p-2 fw-bolder'>{formik.errors.city}</p> : ''}
  </div>
  <div className="my-3">
      <textarea className="form-control" name='details' placeholder="Details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
      {formik.touched.details && formik.errors.details ? <p className=' text-danger p-2 fw-bolder'>{formik.errors.details}</p> : ''}
  </div>

  
  <div className=' d-flex justify-content-around'>
  <div className="form-check">
  <input className="form-check-input cursor-pointer" type="checkbox" onChange={()=>setIsOnline(!isOnline)} id="flexCheckChecked"/>
  <label className="form-check-label" htmlFor="flexCheckChecked">is Online</label>
</div>
{isOnline?
<button type="submit" className="btn bg-main text-light fw-bolder">onine payment</button>
:
<button type="submit" className="btn bg-main text-light fw-bolder">cash payment</button>
}
  </div>
</form>
    </div>
    </>
  )
}
