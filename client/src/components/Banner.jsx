import React, { useState } from 'react';
import bookImg from "../components/book.jpg";
import { Link } from 'react-router-dom';

function Banner() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm) {
      // Check if bookTitle is available
      alert('Please enter a valid book title.');
      return;
    }

    // Redirect to the search results page
    window.location.href = `/books/${encodeURIComponent(searchTerm)}`;
  };

  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/* left side */}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>Buy Your Books <span className='text-blue-700'>for the Best Prices</span></h2>
          <p className='md:w-4/5'>You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.</p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder='Search a Book'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
              className='py-2 px-2 rounded-s-sm outline-none'
            />
            <button
              onClick={handleSearch}
              className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'
            >
              Search
            </button>
          </div>
        </div>

        {/* right side */}
        <div className='md:w-1/2'>
          <img src={bookImg} alt='' className='rounded md:w-10/12' />
        </div>
      </div>
    </div>
  );
}

export default Banner;