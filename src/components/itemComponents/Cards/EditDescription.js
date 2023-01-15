import React, { useEffect } from "react";
import TextareaAutosize from '@mui/base/TextareaAutosize';

// Textarea for description

export default function EditDescription(props) {
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
      props.updateDataFunc(val, props.index, props.type)
    }
  }

  return(
    <div>
      {edit ?
        (
          <TextareaAutosize style={{width: "100%", borderRadius: '10px'}}
            onChange={(e)=>{handleOnClick(e)}}
            onKeyDown={(e)=>{handleOnSubmit(e)}}
            value={name}
          />
        )
      :
      (
        <p onClick={()=>{setEdit(!edit)}}>
          {name}
        </p>
      )}
    </div>
  )
}