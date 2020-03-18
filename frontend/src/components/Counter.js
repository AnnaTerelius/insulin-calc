import React, {useState, useEffect} from 'react';
import moment from 'moment'

export const Counter = (props) => {
    
    //500/total daily dos insulin = 500/35= 14.3 (1 unit insulin takes care of 14.3 g carbs)
    const personalSetting = 14.3
    const goalValue = 5
    //1 unit insulin reduces the bloodsugarlevel with 2.5 mmol/L
    const reductionPerUnit = 2.5
    const [bloodSugar, setBloodSugar] = useState('')
    const [error, setError] = useState('')
    
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


   const  handleSubmit = async (event) => {
        event.preventDefault()
        console.log('inside function handleSubmit' + bloodSugar)
        console.log(JSON.stringify({'level': bloodSugar}))
        try { 
            await fetch('http://localhost:9090/bloodsugars', {
                method: 'POST',
                //body: JSON.stringify({'level': bloodSugar}),
                body: JSON.stringify({ 'value': bloodSugar}),
                headers: {'Content-Type': 'application/json'}
            })
            .then((res) => res.json())
            setError('')

        }catch (err){
            console.log('Kunde inte spsra blodsocker i databasen!' + err)
            setError('Kunde inte spsra blodsocker i databasen!');
        };
    }

    


  const handleReset = (event) => {
    
    setBloodSugar('')
   
  }

  

 // useEffect(() => { console.log(bloodSugarLevel)})

return (
    <>
        <div>
        
            <form className="background" onSubmit={handleSubmit} onReset={handleReset}>
                <article className="searchField">
                    <div className="doseContainer">
                    <div className="dose">
                         insulin dos  {insulinDose.toFixed(1)}
                    </div>
                    <div>{error}</div>
                    </div>
                    <div className="calculatedDoseContainer">
                       {/*} nuvarande blodsocker:  {bloodSugar}<br/>*/}
                        totalt antal kolhydrater: {totalCarbs} <br/>
                       {/*} insulin dos:  {insulinDose.toFixed(1)}*/}
                    </div>
                    <div className="inputContainer">
                        <input type="text" placeholder="blodsockervärde" value={bloodSugar} required className="product" onChange = {(event) => { setBloodSugar(event.target.value); console.log("event onChange: Texten är: " + event.target.value)}}/>
                    </div>
                    <div className="btn-container">
                        <button className="submit-btn" type="submit">lägg till</button>
                        <button className="reset-btn" type="reset">rensa</button>
                    </div>
                </article>
            </form> 
        </div> 
    </>
  )
}