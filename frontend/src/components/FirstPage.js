import React, {useState, useEffect} from 'react';
import './firstPage.css'


export const FirstPage = () => {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
 


  const handleSearch = (event) => {
    event.preventDefault()
   //console.log('event handleSearch= when searching a product in API')
    fetch("https://api.livsmedelkollen.se/search?q=" + message)
    //fetch("https://api.livsmedelkollen.se")
    .then (res => res.json())
    .then (json => setProducts(json));
  }

  const handleReset = (event) => {
    setProducts([])
    setMessage('')
  }
  


  return (
    <div className="container">
      <form className="background" onSubmit={handleSearch} onReset={handleReset}>
        <article className="inputField">
          <input type="text" value={message} required className="product" onChange={(event) => { setMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }} /><br />
          <button className="submit-btn" type="submit">search</button>
          <button className="submit-btn" type="reset">reset</button>
        </article>
     
      <ul>
        {products.map((product) => (
        <ul key={product.id}><button className="button">{product.name}</button></ul>))}
      </ul>
      </form>
    </div>
  )
}

