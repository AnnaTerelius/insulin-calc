import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/insulin"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const BloodSugar = mongoose.model('BloodSugar', {
  value: {
   type: Number,
   required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Defines the port the app will run on. Defaults to 8000, but can be 
// overridden when starting the server. 

const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining routes here
app.get('/', (req, res) => {
  res.send('Hello world insulin-calc')
})

app.post('/bloodsugars', async (req, res) => {
  const {value} = req.body;
  console.log(typeof value )
  const bloodSugar = new BloodSugar({ value }) 

  try {
    const savedBloodSugar = await bloodSugar.save();
    res.status(201).json(savedBloodSugar); 
    
    // Must use "await" here, else the try/catch will not work since "save" is an asynch function
  } catch (err) {
    console.log(err)
    res.status(400).json({message: 'Kunde inte spara blodsocker i databasen!', errors: err.errors});
  }
  });

  app.get('/allbloodsugars', async (req, res) => {
    console.log('Inside /allbloodsugars')
    try { 
      const bloodsugars = await BloodSugar.find()
      res.json(bloodsugars);
    } catch (err){ 
      console.log(err)
      res.status(400).json({message: 'Någonting gick fel!', errors: err.errors});
    }
  });


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })