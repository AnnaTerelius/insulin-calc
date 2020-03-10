import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

console.log('Starting backend')

const BloodSugar = mongoose.model('BloodSugar', {
  value: {
   type: Number,
   required: true,
   default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});



// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 9090
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())




// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world insulin-calc')
})

app.post('/bloodsugars', async (req, res) => {
  const {value} = req.body;
  const bloodSugar = new BloodSugar({ value }) 

  try {
    const savedBloodSugar = await bloodSugar.save();
    res.status(201).json(savedBloodSugar); 
    
    
    // Must use "await" here, else the try/catch will not work since "save" is an asynch function

  
  } catch (err) {
    res.status(400).json({message: 'Could not save bloodsugar', errors: err.errors});
  }
  
  });

  

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })