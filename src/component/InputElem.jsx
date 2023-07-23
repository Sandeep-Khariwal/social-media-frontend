import React from 'react'; 
import { useState } from 'react'; 

const mystyle = {
    width:"100%",
    padding: "0.1rem",
    fontSize: "15px",
    minHeight:"100%",
    // border: "none",
    border: "1px thin grey",
    borderRadius: "0.5rem",
}

function InputElem({setHeight}) { 
  
  const [textareaheight, setTextareaheight] = useState(1); 
  
  function handleChange(event) { 
    
    console.log( event.target.rows ) 
    setHeight(event.target.value)
    const height = event.target.scrollHeight; 
    const rowHeight = 15; 
    const trows = Math.ceil(height / rowHeight) - 1; 
    
    if (trows ,textareaheight) { 
      
      setTextareaheight(trows); 
      
    } 
    
  } 
  
  return ( 
    
    <div > 
      <h3 style={{marginBlockStart: "0.2em",marginBlockEnd: "0.3em",textAlign:"center"}} >Add your thought here</h3>
      <textarea rows={textareaheight} onChange={handleChange} style={mystyle} > </textarea> 
      
    </div> 
  
  ); 
  
} 

export { InputElem };