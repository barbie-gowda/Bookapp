import React from 'react'

function About() {
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold leading-snug text-black'>Welcome to Our CRUD Application</h2>
      <span className='text-blue-700 font-bold leading-snug text-4xl text-center'>Built with the MERN Stack</span>

      <br />
      <br />
      <p className='md:w-4/5 '>Discover the power of our CRUD application, crafted with the MERN (MongoDB, Express.js, React, Node.js) stack. Manage your data effortlessly and experience a seamless user interface. Whether you're a developer, business owner, or just curious about modern web technologies, our application is designed to meet your needs.</p>


      {/* <p className='md:w-4/5 '>Welcome to our online book haven, where the love for literature meets the convenience of the digital age. Our bookstore is more than just a collection of pages—it's a curated space designed for readers of all tastes and preferences. With a passion for storytelling, we've crafted an online experience that brings the joy of discovery right to your fingertips. Whether you're searching for bestsellers, hidden gems, or timeless classics, our virtual shelves are stocked with a diverse array of books to suit every reader's appetite. Explore, discover, and indulge your literary senses in this virtual sanctuary, where we believe that every book has a story to tell and every reader finds a new adventure with each turn of the page. Welcome to our online book community, where stories come to life, and readers find their next cherished book.</p> */}
      <br />
      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-4 text-black">Contact Us</h3>
        <p className="md:w-4/5">Have questions or feedback? We'd love to hear from you! Reach out to our team via the following options:</p>

        <ul className="list-disc mt-4 ml-8">
          <li>Email: <a href="mailto:bookstore@gmail.com" className="text-blue-700">bookstore@gmail.com</a></li>
          <li>Phone: <span className="text-blue-700">+91 9480651509</span></li>
          <li>Address: <span className="text-blue-700">#45 Main road, HSR Layout, Bangalore-560102</span></li>
        </ul>
      </div>
    </div>
  )
}

export default About