import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Counter} from './Counter'
import { Link } from 'react-router-dom'
import {Info} from './Info'
import {Bloodsugars} from './Bloodsugars'


import './products.css'


export const Products = () => {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [selectedProduct, setSelectedProduct] = useState([])
  const [error, setError] = useState('')
  
 
  const handleSearch = async (event) => {
    event.preventDefault()
   //console.log('event handleSearch= when searching a product in API')
    try{ 
      await fetch("https://api.livsmedelkollen.se/search?q=" + message)
        //fetch("https://api.livsmedelkollen.se")
        .then (res => res.json())
        .then (json => {setProducts(json); console.log(json)});
        setError('')
  
    }catch (err){
      console.log('Kunde inte hämta produkter! '+ err)
      setError('Kunde inte hämta produkter!');
      };
}

  // useEffect(() => { console.log(products)}, [products])

  const handleReset = (event) => {
    setProducts([])
    setMessage('')
    setSelectedProduct([])
  }

  const handleSelectedProduct  = async (event) => {
    // setSelectedProduct(event.target.id)  event.preventDefault()
    console.log('searching for '+ event.target.id)
    try { 
    await fetch("https://api.livsmedelkollen.se/foodstuffs/" + event.target.id)
      .then (res =>   res.json())
      .then (json => { 
          setSelectedProduct(selectedProduct.concat(JSON.stringify(json)));
          console.log("Result from fetch:")
          console.log(json)  
      }) 
      setError('')
    }catch (err){
        console.log('Kunde inte hitta denna produkt! '+ err)
        setError('Kunde inte hitta denna produkt! ');
      };
    
      setProducts([])
      setMessage('')
      //console.log(event.target.value)
  };
  

 
  // using useEffect to log selectedProduct in console, since setSelectedProduct(...) is async (it's not possible to console.log in the fetch because of this)
 // useEffect(() => { console.log(selectedProduct)}, [selectedProduct])

 // typ för att skicka props till ny komponent spom visar upp namn och kolhydrater på sidan
 // <SelectedProduct id={selectedProduct.id} /> id={selectedProduct.id} name={selectedProduct.name} carbs={selectedProduct.carbs} unit={selectedProduct.unit}
  


  return (
    <BrowserRouter>
      <main className='backgroundContainer'>
      
        <div className="container1">
          
          <div className="header">
            <div className="backLinkContainer">
              <Link to={`/`}>
                <div className="backLink"> 
                  <h1>iCalc</h1>
                </div>
              </Link>
            </div>
            <div className="header-links">
              <Link to="/bloodsugars"><p>diagram</p></Link>
              <Link to="/info"> <p className='link-info'>info</p></Link>
            </div>
          </div>
          
          
          {/*<img className="img" src={test2} alt="insulin"/>*/}
        <Switch>
          <div  className="container">
          <div className="errorMessage">{error}</div>
            <Route path="/" exact> 
              <form className="background" onSubmit={handleSearch} onReset={handleReset}>
                <article className="searchField">
                  <div className="inputContainer">
                  <input type="text"placeholder="sök produkt" value={message} required className="product" onChange={(event) => { setMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }} /><br />
                  </div>
                    <div className="btn-container">
                      <button className="submit-btn" type="submit">sök</button>
                      <button className="reset-btn" type="reset">rensa</button>
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
                  return <ul className="selectedProducts" key={item.id}>{carbs[0].foodstuff} kolhydrater: {carbs[0].value}  </ul>})
                  }
                  <Link className="add-btn-container" to={'/counter'}><button className="add-btn">lägg till</button></Link>
                </ul>
              </form>
            </Route>
            <Route path="/counter" exact>
              <Counter text={selectedProduct} />
            </Route>
            <Route path="/info" exact>
              <Info />
            </Route>
            <Route path="/bloodsugars" exact>
              <Bloodsugars />
            </Route>
          </div>
        </Switch>
        <div className="footer">
          
         
        </div>
      </div>
     
      </main>
    </BrowserRouter>
  )
}

