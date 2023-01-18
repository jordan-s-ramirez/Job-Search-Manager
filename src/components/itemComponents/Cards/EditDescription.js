import React, { useEffect } from "react";
import TextareaAutosize from '@mui/base/TextareaAutosize';

// Textarea for description

export default function EditDescription(props) {
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
      props.updateDataFunc(val, props.index, props.type)
    }
  }

  return(
    <div>
      <TextareaAutosize style={{width: "100%", borderRadius: '10px', borderWidth: 0, fontSize: 14, fontFamily: "Arial, sans-serif"}}
        onChange={(e)=>{handleOnClick(e)}}
        onKeyDown={(e)=>{handleOnSubmit(e)}}
        value={name}
      />
    </div>
  )
}