import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    // Initialize with any default user details if needed
    name: '',
    email: '',
    phonenumber: '',
    address: ''
    // Add other necessary fields
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a server endpoint for handling form submissions
      const response = await fetch("http://localhost:5000/submit-order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userDetails,
          paymentMethod: 'cashOnDelivery',
          cartItems: JSON.parse(localStorage.getItem('cart')) || [], // Include the cart items or any other necessary order details
        }),
      });

      if (response.ok) {
        // Order placed successfully
        alert('Order placed successfully!');

        // Clear the cart
        localStorage.removeItem('cart');

        // Redirect to the home page or a confirmation page
        navigate('/');
      } else {
        // Handle the case where the order placement failed
        alert('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='mb-8 text-3xl font-bold text-center'>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='name'>
            Name:
          </label>
          <input type='text' id='name' name='name' value={userDetails.name} onChange={handleInputChange} className='w-full p-2 border rounded' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='email'>
            Email:
          </label>
          <input type='email' id='email' name='email' value={userDetails.email} onChange={handleInputChange} className='w-full p-2 border rounded' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='address'>
            Phone number:
          </label>
          <textarea type='number' id='phonenumber' name='phonenumber' value={userDetails.phonenumber} onChange={handleInputChange} className='w-full p-2 border rounded' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='address'>
            Address:
          </label>
          <textarea id='address' name='address' value={userDetails.address} onChange={handleInputChange} className='w-full p-2 border rounded' />
        </div>
        <div className='mb-4'>
          <p className='block text-sm font-bold mb-2'>Payment Method: Cash on Delivery Only</p>
        </div>
        {/* Add more form fields as needed */}
        <button type='submit' className='bg-blue-700 font-semibold text-white py-2 px-11 rounded'>
          Place Order
        </button>
        <Link to='/cart'>
          <button className='ml-4 bg-gray-400 font-semibold text-white py-2 px-4 rounded'>
            Back to Cart
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Order
