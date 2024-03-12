
import axios from "axios";
import { createContext, useState, useEffect} from "react";
import toast from "react-hot-toast";
export let cartContext = createContext()
export default function CartContextProvider(props){
    const [countOfItems, setCountOfItems] = useState(0)
    const [countOfFavourItems, setCountOfFavourItems] = useState(0)
    const [cartId, setCartId] = useState(null)
    const [color, setColor] = useState([])
    const [load, setLoad] = useState(null)
    const [showCartItems, setShowCartItems] = useState(null)
async function AddToCart(id){
    try {
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setCountOfItems(data.data.numOfCartItems)
        return (
            successMessage(data.data.message)
            
        )
    } catch (err) {
        console.log(err);
        errorMessage(err)
    }
    
}
async function getCartItems(){
    try {
        const data = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers: {
                token: localStorage.getItem('token')
            }
        });
        if(data){
        setCountOfItems(data.data.numOfCartItems)
        setShowCartItems(data.data.data.products)
        setCartId(data.data.data._id)
        return data;
        }else{
            setShowCartItems(null)
        }
    } catch (err) {
        console.log(err);
    }
}
useEffect(() => {
    getCartItems()
}, [])


async function AddToFavourite(id){
    try {
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setCountOfFavourItems(data.data.data.length)
        return (
            successMessage(data.data.message)
            
        )
    } catch (err) {
        console.log(err);
        errorMessage(err)
    }

}


async function getFavourItems(){
    try {
        const data = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setLoad(data.data)
        const response = data.data.data;
        const id = response.map(item => item.id);
        if(data.data.status == "success"){
            setColor(...color,id)
        }
        setCountOfFavourItems(data.data.count)
        return data;
    } catch (err) {
        console.log(err);
    }
}

useEffect(()=>{
    getFavourItems()
}, [])


function successMessage(data){
    toast.success(data)
  }

function errorMessage(data){
    toast.error(data)
  }

  return <cartContext.Provider value={{AddToCart, 
  countOfFavourItems, 
  countOfItems, 
  getCartItems, 
  AddToFavourite, getFavourItems, 
  color, setColor, 
  load,setLoad,
  cartId,setCartId,
  setCountOfItems,
  showCartItems, setShowCartItems,
  }}>
       {props.children}
    </cartContext.Provider>
}