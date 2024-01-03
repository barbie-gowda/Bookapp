import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'flowbite-react';

const Singlebook = () => {
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null); // Add an error state

  // Use useParams to get the bookTitle from the route parameters
  const { bookTitle } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Check if bookTitle is available
        if (!bookTitle) {
          console.error('Book title is not available.');
          setError('Book title is not available.'); // Set error state
          return;
        }

        // Log the bookTitle for debugging
        console.log('bookTitle:', bookTitle);

        // Fetch book details
        const response = await axios.get(`http://localhost:5000/books/${encodeURIComponent(bookTitle)}`);

        if (response.status === 404) {
          setError('Book not found.'); // Set error state
        } else {
          setBookDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Error fetching book details.'); // Set error state
      }
    };

    fetchBookDetails();
  }, [bookTitle]);

  const handleSubmit = () => {
    if (bookDetails) {
      const product = {
        id: bookDetails._id,
        bookTitle: bookDetails.bookTitle,
        authorName: bookDetails.authorName,
        imageUrl: bookDetails.imageUrl,
        category: bookDetails.category,
        bookDescription: bookDetails.bookDescription,
        price: bookDetails.price,
      };

      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex === -1) {
        existingCart.push(product);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert("Book added to the cart!");
        // Redirect to the home page or a confirmation page
        navigate('/');
      } else {
        alert("Book is already in the cart!");
      }
    }
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        bookDetails && (
          <Card key={bookDetails._id} className='p-4' style={{ maxWidth: '400px', margin: '0 auto' }}>
            <img src={bookDetails.imageUrl} alt='' className='h-95 object-cover w-full' />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{bookDetails.bookTitle}</p>
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              <p>{bookDetails.bookDescription}</p>
            </div>
            <h2 className='font-bold'>
              <p>Rs.{bookDetails.price}</p>
            </h2>
            <button onClick={handleSubmit} className='bg-blue-700 font-semibold text-white py-2 px-11 rounded'>
              Add to cart
            </button>
          </Card>
        )
      )}
    </div>
  );
}

export default Singlebook;