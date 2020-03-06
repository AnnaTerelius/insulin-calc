import React, {useState, useEffect} from 'react';
import './products.css'


export const Products = () => {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [selectedProduct, setSelectedProduct] = useState([])
 


  const handleSearch = (event) => {
    event.preventDefault()
   //console.log('event handleSearch= when searching a product in API')
    fetch("https://api.livsmedelkollen.se/search?q=" + message)
    //fetch("https://api.livsmedelkollen.se")
    .then (res => res.json())
    .then (json => {setProducts(json); console.log(json)});

  }

 // useEffect(() => { console.log(products)}, [products])

  const handleReset = (event) => {
    setProducts([])
    setMessage('')
    setSelectedProduct([])
  }

  const handleSelectedProduct = (event) => {
   // setSelectedProduct(event.target.id)  event.preventDefault()
  console.log('searching for '+ event.target.id)
    fetch("https://api.livsmedelkollen.se/foodstuffs/" + event.target.id)
    .then (res => res.json())
    .then (json => {
     
      setSelectedProduct(selectedProduct.concat(JSON.stringify(json)));
      console.log("Result from fetch:")
      console.log(json)
    });
    setProducts([])
    setMessage('')
    //console.log(event.target.value)
  }

 
  // using useEffect to log selectedProduct in console, since setSelectedProduct(...) is async (it's not possible to console.log in the fetch because of this)
 // useEffect(() => { console.log(selectedProduct)}, [selectedProduct])

 // typ för att skicka props till ny komponent spom visar upp namn och kolhydrater på sidan
 // <SelectedProduct id={selectedProduct.id} /> id={selectedProduct.id} name={selectedProduct.name} carbs={selectedProduct.carbs} unit={selectedProduct.unit}
  


  return (
    <div className="container">
      <form className="background" onSubmit={handleSearch} onReset={handleReset}>
        <article className="inputField">
          <input type="text"placeholder="search product" value={message} required className="product" onChange={(event) => { setMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }} /><br />
          <button className="submit-btn" type="submit">search</button>
          <button className="submit-btn" type="reset">reset</button>
        </article>
     
     
      <ul>
        {products.map((product) => (
        <ul key={product.id}><button id={product.id} value={product.name} type="button" className="product-btn" onClick={handleSelectedProduct}>{product.name}</button></ul>))}
        
      </ul>

     

      <ul>
       
        {selectedProduct.map(item => { 
            console.log('Found a selected product:')
            const carbs = JSON.parse(item).filter(({name}) => name === 'Kolhydrater');
            console.log(carbs)
            console.log(carbs[0].value)
            
            return <ul key={item.id}>{carbs[0].foodstuff}{carbs[0].name} {carbs[0].value}</ul>
          })
        }
       
      </ul>

      </form>
      
      
    </div>
  )
}

