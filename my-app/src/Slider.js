import "./SizeSlider.css";
import React from "react";
export default function SliderSize({ min = 0, max = 100,defaultValue=(max+min)/2,onInput={function(){}}}) {

  return (
   <div className="slidecontainer"><p className="textSlider">Value: </p>
  <input type="range" min={min} max={max} defaultValue={defaultValue} onInput={onInput} className="slider" />
  
</div>
  );
}
