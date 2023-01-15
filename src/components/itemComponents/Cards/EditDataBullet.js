import React, { useEffect } from "react";

// Textarea for description

export default function EditData(props) {
  const [edit, setEdit] = React.useState(false)
  const [name, setName] = React.useState(props.name)

  useEffect(()=>{
    setEdit(false)
    setName(props.name)
  },[props.name])

  // Change with text change
  const handleOnClick = (val) => {
    setName(val.target.value)
  }

  // when new input is updated
  const handleOnSubmit = (val) => {
    if(val.key === "Enter" || val.key === "Tab" || val.key === "Escape") {
      setEdit(false)
      props.updateDataFunc(name, props.index, props.type)
    }
  }

  return(
    <div>
      {edit ?
      (<li>
        {props.title}
          <input type="text" value={name} 
            onChange={(e)=>{handleOnClick(e)}}
            onKeyDown={(e)=>{handleOnSubmit(e)}}
            style={{borderRadius: '10px'}}
          />
      </li>
      )
      :
      (
        <li onClick={()=>{setEdit(!edit)}}>
          {props.title} {name}
        </li>
      )}
    </div>
  )
}