import React, {useState, useEffect} from 'react'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayData from './itemComponents/Cards/DisplayData';

// Function gets set of items in array given name
function getItemSet(array) {
  const jobSet = new Set()
  const companySet = new Set()
  const locationSet = new Set()

  for(var i = 0; i < array.length; i++) {
    jobSet.add(array[i]["Job Type"])
    locationSet.add(array[i]["Location"])
    // companySet.add(array[i].Company)
  }

  return [jobSet, locationSet]
}

// Filter Data
function filterData(data, type, items) {
  // When Section has no inputs
  if(items.length === 0) {
    return data
  }
  // else {
  //   console.log(type, items)
  // }
  var filData = []
  items.map((item) => {
    data.map((obj, index) => {
      if(obj[type] === item) {
        filData.push(obj)
      }
    });
  })
  // console.log(items)
  // console.log("Single Filtered",filData)
  return filData
}

export default function InfoTable(props){
  const [dataFiltered, setDataFiltered] = useState(props.data)

  const [jobType, setJobType] = useState([])
  const [location, setLocation] = useState([])
  
  const [jobTypeFilter, setJobTypeFilter] = useState([])
  const [locationFilter, setLocationFilter] = useState([])

  function initalFilter(array, type) {
    var mainData = props.data
    // console.log("Type", type)
    // Based On Group
    if(type === "Job Type")
      mainData = filterData(mainData, type, array)
    else
      mainData = filterData(mainData, "Job Type", jobTypeFilter)
    if(type === "Location") {
      // console.log("Location Triggered", mainData, array)
      mainData = filterData(mainData, type, array)
    }
    else
      mainData = filterData(mainData, "Location", locationFilter)

    // console.log("Filter - TableInfo", mainData)
    setDataFiltered(mainData)
  }

  function removeFromFilter(array, item, func, type) {
    var newSet = new Set(array)
    newSet.delete(item)
    func(Array.from(newSet))

    // Filter
    initalFilter(Array.from(newSet), type)

  }

  function ChipsOnChange(item, func, array, type) {
    if(item != null) {
      var newSet = new Set(array)
      newSet.add(item)
      func(Array.from(newSet))
      
      // Filter Data
      initalFilter(Array.from(newSet), type)
    }
  }

  useEffect(() => {
    var tabData = getItemSet(props.data)
    setJobType(tabData[0])
    setLocation(tabData[1])
    initalFilter(props.data, null)

  },[props.data])

  return(
    <Box sx={{flexGrow: 1 }}>
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12}>
          {dataFiltered.length !== props.data.length? (
            <h2>Job Filter Results: {dataFiltered.length}</h2>
          )
          :
          (
            <h2>Job Filter</h2>
          )}
          
        </Grid>
        <Grid item xs={12} s={6} md={6} style={{marginTop:"1vh"}}>
          <Autocomplete
            disablePortal
            options={Array.from(jobType)}
            renderInput={(params) => <TextField {...params} label="Job Type" />}
            onChange={(event, newValue) => {ChipsOnChange(newValue, setJobTypeFilter, jobTypeFilter, "Job Type")}}
          />
          <Grid item container spacing={1} style={{marginTop:"0.25vh"}}>
            {jobTypeFilter.map((val) => {
              return(
                <Grid key={val} item>
                  <Chip key={val} label={val} variant="outlined" onDelete={()=>{removeFromFilter(jobTypeFilter, val, setJobTypeFilter, "Job Type")}}/>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} s={6} md={6} style={{marginTop:"1vh"}}>
          <Autocomplete
            disablePortal
            options={Array.from(location)}
            renderInput={(params) => <TextField {...params} label="Job Location" />}
            onChange={(event, newValue) => {ChipsOnChange(newValue, setLocationFilter, locationFilter, "Location")}}
          />
          <Grid container spacing={1} style={{marginTop:"0.25vh"}}>
            {locationFilter.map((val) => {
              return(
                <Grid key={val} item>
                  <Chip key={val} label={val} variant="outlined" onDelete={()=>{removeFromFilter(locationFilter, val, setLocationFilter, "Location")}}/>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} s={12} md={12} style={{marginTop:"2vh"}}>
          <DisplayData data={dataFiltered} remDataFunc={(e)=>props.remDataFunc(e)}/>
        </Grid>
      </Grid>
    </Box>
  );
};