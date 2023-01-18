import React, { useEffect } from "react";

// Textarea for description

export default function EditData(props) {
  const [name, setName] = React.useState(props.name)

  useEffect(()=>{
    setName(props.name)
  },[props.name])

  // Change with text change
  const handleOnClick = (val) => {
    setName(val.target.value)
  }

  // when new input is updated
  const handleOnSubmit = (val) => {
    if(val.key === "Enter" || val.key === "Tab" || val.key === "Escape") {
      props.updateDataFunc(name, props.index, props.type)
    }
  }

  return(
    <li>
      {props.title}
        <input type="text" value={name} 
          onChange={(e)=>{handleOnClick(e)}}
          onKeyDown={(e)=>{handleOnSubmit(e)}}
          style={{borderRadius: '10px', borderWidth: 0, fontSize:18}}
        />
    </li>
  )
}