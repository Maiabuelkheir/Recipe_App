import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity, resetQuantity } from "../store/slices/cart";

export default function Cart() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white">Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-light table-hover text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Actions</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <button 
                      className="btn btn-sm" style={{ backgroundColor: "#FF5BA5", color: "white" }}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <button className='btn' style={{ backgroundColor: "#001F3F", color: "white" }} onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                      <p className='my-0 mx-3 text-dark'>{item.quantity}</p>
                      <button className='btn' style={{ backgroundColor: "#FF5BA5", color: "white" }} onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                      <button className='btn ms-2' style={{ backgroundColor: "#1BB76E", color: "white" }} onClick={() => dispatch(resetQuantity(item.id))}>Reset</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-center text-white">Your cart is empty</h4>
      )}

      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <button 
            className="btn" style={{ backgroundColor: "#1BB76E", color: "white" }}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
