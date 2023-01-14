import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddData(props) {
  const [res, setRes] = React.useState("")

  const [title, setTitle] = React.useState("");
  const [company , setCompany] = React.useState("")
  const [location , setLocation] = React.useState("")
  const [jobType , setJobType] = React.useState("")
  const [salary , setSalary] = React.useState("")
  const [url , setUrl] = React.useState("")
  const [jobDescription , setJobDescription] = React.useState("")

  // Filling out form
  const handleChange = (event, fn) => {
    fn(event.target.value);
  };

  // handle Submit
  const handleSubmit = () => {
    var resString = "Missing: "
    if(title === "") {
      resString += "|Job Title| "
    }
    if(company === "") {
      resString += "|Company| "
    }
    if(location === "") {
      resString += "|Job Location| "
    }
    if(jobType === "") {
      resString += "|Job Type| "
    }
    if(url === "") {
      resString += "|Job Url| "
    }
    if(jobDescription === "") {
      resString += "|Job Description| "
    }

    if (resString === "Missing: ") {
      setRes("")
      var item = {}
      item["Application Status\r"] = "Researched"
      item["Company"] = company
      item["Job Description"] = jobDescription
      item["Job Type"] = jobType
      item["Job URL"] = url
      item["Location"] = location
      item["Salary"] = salary
      item["Title"] = title
      props.toAdd(item)
    }
    else {
      setRes(resString)
    }
  };

  return(
    <Grid container spacing={1} style={{direction:"column",alignItems:"center", justifyContent:"center"}}>
      <Grid item sx={12} md={4} lg={3}>
        <TextField onChange={(e)=>handleChange(e,setTitle)} value={title} required fullWidth id="outlined-basic" label="Job Title" variant="outlined" />
      </Grid>
      <Grid item sx={12} md={4} lg={3}>
        <TextField onChange={(e)=>handleChange(e,setCompany)} value={company} required fullWidth id="outlined-basic" label="Company" variant="outlined" />
      </Grid>
      <Grid item sx={12} md={4} lg={3}>
        <TextField onChange={(e)=>handleChange(e,setLocation)} value={location} required fullWidth id="outlined-basic" label="Location" variant="outlined" />
      </Grid>
      <Grid item sx={12} md={4} lg={3}>
        <TextField onChange={(e)=>handleChange(e,setJobType)} value={jobType} required fullWidth id="outlined-basic" label="Job Type" variant="outlined" />
      </Grid>
      <Grid item sx={12} md={8} lg={6}>
        <TextField onChange={(e)=>handleChange(e,setSalary)} value={salary} fullWidth id="outlined-basic" label="Salary" variant="outlined" />
      </Grid>
      <Grid item sx={12} md={12} lg={6}>
        <TextField onChange={(e)=>handleChange(e,setUrl)} value={url} required fullWidth id="outlined-basic" label="Job URL" variant="outlined" />
      </Grid>
      <Grid item sx={12} md={12} lg={12}>
        <TextField onChange={(e)=>handleChange(e,setJobDescription)} value={jobDescription} required fullWidth multiline id="outlined-basic" label="Job Description" variant="outlined" />
      </Grid>
      <Grid item sx={12} md={12} lg={12}>
        <div style={{textAlign:'center'}}>
          <Button onClick={handleSubmit} variant="contained">Add Job</Button>
        </div>
      </Grid>
      <Grid item sx={12} md={12} lg={12}>
        <div style={{textAlign:'center'}}>
          <p>{res}</p>
        </div>
      </Grid>
    </Grid>
  )
}