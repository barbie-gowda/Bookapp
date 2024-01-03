import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

function Shop() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, [])

  const handleSubmit = (book) => {
    const product = {
      id: book._id,
      bookTitle: book.bookTitle,
      authorName: book.authorName,
      imageUrl: book.imageUrl,
      category: book.category,
      bookDescription: book.bookDescription,
      price: book.price,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex === -1) {
      existingCart.push(product);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert("Book added to the cart!");
    } else {
      alert("Book is already in the cart!");
    }
  };

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books Are Here</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.map((book) => (
            <Card key={book._id} className='p-4'>
              <img src={book.imageUrl} alt='' className='h-95' />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{book.bookTitle}</p>
              </h5>
              <div className="font-normal text-gray-700 dark:text-gray-400">
                <p>{book.bookDescription}</p>
              </div>
              <h2 className='font-bold'>
                <p>Rs.{book.price}</p>
              </h2>
              <button onClick={() => handleSubmit(book)} className='bg-blue-700 font-semibold text-white py-2 px-11 rounded'>
                Add to cart
              </button>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default Shop;