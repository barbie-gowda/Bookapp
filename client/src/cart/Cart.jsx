import React from 'react';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Fetch the cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const handleDelete = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Refresh the component to reflect changes
    window.location.reload();
  };

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='mb-8 text-3xl font-bold text-center'>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className='text-red-700 font-semibold text-2xl text-center'>Your cart is empty.</p>
      ) : (
        <div>
          <Table className='lg:w-[1180px]'>
            <Table.Head>
              <Table.HeadCell>Books</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {cartItems.map((item) => (
                <Table.Row key={item.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='px-4 py-2'>
                    <img src={item.imageUrl} alt='' className='h-24 mx-auto mb-4' />
                    <h5 className='text-xl font-bold text-gray-900 dark:text-white'>{item.bookTitle}</h5>
                  </Table.Cell>
                  <Table.Cell className='px-4 py-2'>
                    <p className='font-bold text-blue-700'>Rs.{item.price}</p>
                  </Table.Cell>
                  <Table.Cell className='px-4 py-2'>
                    <Button variant='danger' onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Separate table for fees, total, and place order */}
          <Table className='lg:w-[1180px] mt-8'>
            <Table.Body>
              <Table.Row>
                <Table.Cell className='px-4 py-2 font-bold'>Handling Fee:</Table.Cell>
                <Table.Cell className='px-4 py-2 font-bold text-blue-700'>Rs.20.00</Table.Cell>
                <Table.Cell className='px-4 py-2'></Table.Cell> {/* Empty cell for alignment */}
              </Table.Row>
              <Table.Row>
                <Table.Cell className='px-4 py-2 font-bold'>Delivery Fee:</Table.Cell>
                <Table.Cell className='px-4 py-2 font-bold text-blue-700'>Rs.50.00</Table.Cell>
                <Table.Cell className='px-4 py-2'></Table.Cell> {/* Empty cell for alignment */}
              </Table.Row>
              <Table.Row>
                <Table.Cell className='px-4 py-2 font-bold'>Total:</Table.Cell>
                <Table.Cell className='px-4 py-2 font-bold text-blue-700'>Rs.{calculateTotalCost() + 70.00}</Table.Cell>
                <Table.Cell className='px-4 py-2'></Table.Cell> {/* Empty cell for alignment */}
              </Table.Row>
              <Table.Row>
                <Table.Cell className='px-4 py-2'>
                  <Link to="/order"><button className='bg-blue-700 font-semibold text-white py-2 px-11 rounded'>
                    Check out
                  </button></Link>
                </Table.Cell>
                <Table.Cell className='px-4 py-2'></Table.Cell> {/* Empty cell for alignment */}
                <Table.Cell className='px-4 py-2'></Table.Cell> {/* Empty cell for alignment */}
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Cart;