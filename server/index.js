const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
// const port = process.env.Port || 5000
const cors = require('cors')

//middelware makes connection to forntend 
app.use(cors());
app.use(express.json());

//80833bltOoncD8uz(password)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://demo-bookapp:80833bltOoncD8uz@cluster0.npvkbnt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

//create a collection of documents
const bookCollections = client.db("BookInventory").collection("book");

//insert a book to db using post method
app.post("/upload-book", async(req, res) => {
    const data = req.body;
    const result = await bookCollections.insertOne(data);
    res.send(result);
})

//update a book data using patch or update method
app.patch("/book/:id", async(req, res) =>{
    const id = req.params.id;
    // console.log(id);
    const updateBookData = req.body;
    const filter = {_id: new ObjectId(id)};
    const updateDoc = {
        $set: {
            ...updateBookData
        },
    }
    const options = { upsert: true};
    //update
    const result = await bookCollections.updateOne(filter, updateDoc, options);
    res.send(result);
})

//delete a book
app.delete("/book/:id", async(req, res) =>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const result = await bookCollections.deleteOne(filter);
    res.send(result);  
})

//Find by category
app.get("/all-books", async(req, res) =>{
    let query = {};
    if(req.query?.category){
        query = {category: req.query.category}
    }
    const result = await bookCollections.find(query).toArray();
    res.send(result);
})

//to get single book data
app.get("/book/:id", async(req, res) =>{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const result = await bookCollections.findOne(filter);
res.send(result);
})

// Remove the unique constraint from the index creation
// bookCollections.createIndex({ bookTitle: 1 }, { name: "bookTitle_index" });
app.get("/books/:bookTitle", async (req, res) => {
  const bookTitle = req.params.bookTitle;

  // Check if bookTitle is empty
  if (!bookTitle) {
    return res.status(400).json({ error: 'Book title is required.' });
  }

  const filter = { bookTitle: { $regex: new RegExp('^' + bookTitle, 'i') } };

  try {
    const result = await bookCollections.findOne(filter);

    if (!result) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// to get order details
// Define calculateTotalCost function
const calculateTotalCost = (cartItems) => {
  return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
};
app.post('/submit-order', async(req, res) => {
  try {
    const { userDetails, cartItems } = req.body;
    const totalCost = calculateTotalCost(cartItems);
    const additionalData = {
      orderDate: new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
      }),
      paymentMethod: 'cashOnDelivery',
      totalCost,
    };
    console.log('User Details:', userDetails);
    console.log('Cart Items:', cartItems);
    console.log('Total Cost:', totalCost);
    console.log('Additional Data:', additionalData);

    const orderCollection = client.db("YourDBName").collection("order");
    
    // Insert the order data into the order collection
    const result = await orderCollection.insertOne({
      userDetails,
      cartItems,
      paymentMethod: 'cashOnDelivery',
      ...additionalData,
    });

    // Log the result to the server terminal
    console.log('Order Result:', result);

    // Send the result back to the client
    res.send(result);
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error placing the order:', error);
    res.status(500).send('Internal Server Error');
  }
});    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})