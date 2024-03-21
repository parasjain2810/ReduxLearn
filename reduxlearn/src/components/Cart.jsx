import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {useSelector,useDispatch} from 'react-redux'
const Cart = () => {
  const {cartItems,subTotal,Shipping,tax,total}=useSelector(state=>state.cart);
  const dispatch=useDispatch();
  const increase=(id)=>{
    dispatch({type:'addToCart',payload:{id}});
    dispatch({type:'calculate'});
  }
  const decrease=(id)=>{
    dispatch({type:'decrement',payload:id})
    dispatch({type:'calculate'});
  }

  const deleteItem=(id)=>{
      dispatch({type:'deleteItem',payload:id})
      dispatch({type:'calculate'});
  }
  return (
    <div className="cart">
      <main>
       {cartItems.length >0 ? (cartItems.map((i)=>(
        <CartItem imgSrc={i.imgSrc} name={i.name} price={i.price} id={i.id} qty={i.quantity} increment={increase} decrement={decrease} deleteHandler={deleteItem} key={i.id}/> 
       ))):
         <h1>No Item Add</h1> }
      </main>
      <aside>
        <h2>Subtotal:${subTotal}</h2>
        <h2>Shipping:${Shipping}</h2>
        <h2>Tax:${tax}</h2>
        <h2>Total:${total}</h2>
      </aside>
    </div>
  )
}

const CartItem=({imgSrc,name,price,id,qty,increment,decrement,deleteHandler})=>(
    <div className="cartItem">
        <img src={imgSrc} alt={name} />

        <article>
            <p>{name}</p>
            <p>${price}</p>
        </article>

        <div>
            <button onClick={()=> decrement(id)}>-</button>
            <p>{qty}</p>
            <button onClick={()=> increment(id)}>+</button >
        </div>
        <AiFillDelete onClick={()=> deleteHandler(id)}/>
    </div>
)

export default Cart
