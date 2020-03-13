import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Counter} from './Counter'
import { Link } from 'react-router-dom'

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
    <BrowserRouter>
      <main className='backgroundContainer'>
        <div className="container1">
        <div className="header">
          <h1>iCalc</h1>
        </div>
     {/*<img className="img" src={test2} alt="insulin"/>*/}
        <Switch>
          <div  className="container">
            <Route path="/" exact> 
              <form className="background" onSubmit={handleSearch} onReset={handleReset}>
                <article className="searchField">
                  <input type="text"placeholder="search product" value={message} required className="product" onChange={(event) => { setMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }} /><br />
                    <div className="btn-container">
                      <button className="submit-btn" type="submit">search</button>
                      <button className="reset-btn" type="reset">reset</button>
                  </div>
                </article>
                <ul className="list1">
                  {products.map((product) => (
                  <li key={product.id}><button id={product.id} value={product.name}  type="button" className="product-btn" onClick={handleSelectedProduct}>{product.name} </button></li>))}
                </ul>
                <ul>
                  {selectedProduct.map(item => { 
                    console.log('Found a selected product:')
                    const carbs = JSON.parse(item).filter(({name}) => name === 'Kolhydrater');
                    console.log(carbs)
                    console.log(carbs[0].value)
                  return <ul className="selectedProducts" key={item.id}>{carbs[0].foodstuff}{carbs[0].name} {carbs[0].value}  </ul>})
                  }
                  <Link className="add-btn-container" to='/counter'><button className="add-btn">add selected products</button></Link>
                </ul>
              </form>
            </Route>
            <Route path="/counter" exact>
              <Counter text={selectedProduct} />
            </Route>
          </div>
        </Switch>
        <div className="footer">
          <Link className="link-bloodsugars" to='/bloodsugars'><p>saved bloodsugars</p></Link>
          <Link className="link-info" to='/info'><p>info</p></Link>
        </div>
        </div>
      </main>
    </BrowserRouter>
  )
}

