import React, {useState, useEffect} from 'react';

export const Counter = (props) => {
    
    //500/total daily dos insulin = 500/35= 14.3 (1 unit insulin takes care of 14.3 g carbs)
    const personalSetting = 14.3
    const goalValue = 5
    //1 unit insulin reduces the bloodsugarlevel with 2.5 mmol/L
    const reductionPerUnit = 2.5
    const [bloodSugar, setBloodSugar] = useState('')
   
    
   //calculate total carbs of selected products
        let totalCarbs = 0
        props.text.map(item => { 
            console.log('maping selected carbs value:')
            totalCarbs = totalCarbs+ JSON.parse(item).filter(({name}) => name === 'Kolhydrater')[0].value;
            console.log(totalCarbs)
      })

      //calculate dose for selected products
      let insulinDose = totalCarbs/personalSetting
      console.log('dose only selected products carbs' + insulinDose)
      //adjust for current bloodsugarlevel
      insulinDose += (bloodSugar-goalValue)/reductionPerUnit
      console.log('dose selected products carbs + reduction if high bloodsugarlevel' + insulinDose)


   const  handleSubmit = (event) => {
    event.preventDefault()
    console.log('inside function handleSubmit' + bloodSugar)
    console.log(JSON.stringify({'level': bloodSugar}))
    fetch('http://localhost:9090/bloodsugars', {
        method: 'POST',
        //body: JSON.stringify({'level': bloodSugar}),
        body: JSON.stringify({bloodSugar}),
        headers: {'Content-Type': 'application/json'}
    })
    .then((res) => res.json())
   
    }


  const handleReset = (event) => {
    
    setBloodSugar('')
   
  }

  

 // useEffect(() => { console.log(bloodSugarLevel)})

return (
    <>
        <div className="container">
        
            <form className="background" onSubmit={handleSubmit} onReset={handleReset}>
                <article className="inputField">
                   
                    <input type="text" placeholder=" current bloodsugarlevel" value={bloodSugar} required className="product" onChange = {(event) => { setBloodSugar(event.target.value); console.log("event onChange: Texten är: " + event.target.value)}}/>
                   
                    <button className="submit-btn" type="submit">set</button>
                    <button className="submit-btn" type="reset">reset</button>
                    current bloodsugarlevel:  {bloodSugar}<br/>
                    total carbs: {totalCarbs} <br/>
                    insulin dose:  {insulinDose}
                
                </article>
        
            </form>
             
            
        </div> 
    </>
  )
}