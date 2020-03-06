import React, {useState, useEffect} from 'react';

export const Counter = () => {
    const personalSetting = 12
    const [bloodSugarLevel, setBloodSugarLevel] = useState('')

   const  handleSubmit = (event) => {
    event.preventDefault()
    console.log('inne i funktionen' + bloodSugarLevel)

       setBloodSugarLevel(bloodSugarLevel)
   }

   
  const handleReset = (event) => {
    
    setBloodSugarLevel('')
   
  }

  

 // useEffect(() => { console.log(bloodSugarLevel)})

  return (
      <>
  
  <div className="container">
  
    <form className="background" onSubmit={handleSubmit} onReset={handleReset}>
        <article className="inputField">
       personal dose:  {personalSetting}<br/>
       my current bloodsugarlevel:  {bloodSugarLevel}

        <input type="text" placeholder=" current bloodsugarlevel" value={bloodSugarLevel} required className="product" onChange = {(event) => { setBloodSugarLevel(event.target.value); console.log("event onChange: Texten är: " + event.target.value)}}/>

        <button className="submit-btn" type="submit">set</button>
          <button className="submit-btn" type="reset">reset</button>
        
        </article>
       
        </form>
        
  </div> 
  </>
  )
}