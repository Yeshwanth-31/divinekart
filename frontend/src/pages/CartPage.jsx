import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import './CartPage.css';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart 🛍️</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                </div>
                <div className="qty-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateQuantity({ id: item._id, quantity: +e.target.value }))
                    }
                  />
                  <button onClick={() => dispatch(removeFromCart(item._id))}>❌</button>
                </div>
              </div>
            ))}
          </div>
          <div className="total">Total: ₹{totalAmount}</div>
        </>
      )}
    </div>
  );
};

export default CartPage;
