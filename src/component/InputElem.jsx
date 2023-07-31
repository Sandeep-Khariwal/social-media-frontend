import React from 'react'; 
import { useState } from 'react'; 

const mystyle = {
    width:"100%",
    height:"10rem",
    padding: "0.2rem",
    fontSize: "15px",
    border: "1px solid grey"
}

function InputElem({setHeight,setText}) { 
  
  const [textareaheight, setTextareaheight] = useState(1); 
  
  function handleChange(event) {
    setText(event.target.value)
    setHeight(event.target.value)
    const height = event.target.scrollHeight; 
    const rowHeight = 15; 
    const trows = Math.ceil(height / rowHeight) - 1; 
    
    if(trows ,textareaheight){ 
      setTextareaheight(trows); 
    } 
  } 
  
  return (
    <div > 
      <h3 style={{marginBlockStart: "0.2em",marginBlockEnd: "0.3em",textAlign:"center"}} >Add your thought here</h3>
      <textarea rows={textareaheight} onChange={handleChange} style={mystyle} />
    </div>
  ); 
  
} 

export { InputElem };