import {createReducer} from '@reduxjs/toolkit'

export const cartReducer=createReducer({
    cartItems:[],
    subTotal:0,
    Shipping:0,
    tax:0,
    total:0

},(builder)=>{
    builder
    .addCase('addToCart',(state,action)=>{
        const item=action.payload;
        const ItemExist= state.cartItems.find((i)=> i.id===item.id);

        if(ItemExist){
          state.cartItems.forEach((i)=>{
            if(item.id===i.id)
                i.quantity+=1; 
          })
        }else{
            state.cartItems.push(item);
        }
    })

    .addCase('decrement',(state,action)=>{
        const id=action.payload;
        state.cartItems.forEach((i)=>{
          if(id===i.id){
            if(i.quantity>1)
            {
               i.quantity=i.quantity-1;
            }
          }
        })
    })

    .addCase('deleteItem',(state,action)=>{
      const id=action.payload;
      state.cartItems=state.cartItems.filter((i)=>i.id!==id);
    })
   
    .addCase('calculate',(state)=>{
      let sum=0;
      state.cartItems.forEach((i)=>(
         sum+=i.quantity*i.price
      ))
      state.subTotal=sum;
      state.Shipping=(state.subTotal>1000 ? 0: 100);
      state.tax=(state.subTotal*0.18);
      state.total= state.subTotal + state.Shipping + state.tax;
    })
})  