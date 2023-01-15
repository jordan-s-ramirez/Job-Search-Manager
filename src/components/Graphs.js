import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DoughnutGraph from "./itemComponents/Graphs/DoughnutGraph";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import BarGraph from "./itemComponents/Graphs/BarGraph";

function filterData(data, type) {
  var filterData = {}
  var labels = new Set()
  var pieData = []
  var rgb = []
  var index = 0
  data.map((obj, idx) => {
    labels.add(obj[type])
  })
  
  var size = Array.from(labels).length
  Array.from(labels).map((str) => {
    var count = 0
    data.map((obj, idx) => {
      if(obj[type] === str) {
        count++
      }
    })
    rgb.push('rgb(255, '+Math.floor((255/size) * index)+', '+Math.floor((255/size) * (index / 2))+')')
    pieData.push(count)
    count = 0
    index++
  })

  filterData.labels = Array.from(labels)
  filterData.pieData = pieData
  filterData.rgbData = rgb
  return filterData
}

export default function Graphs(props) {
  const [value, setValue] = React.useState('1');
  const [type, setType] = React.useState('');

  const [locationData, setLocationData] = React.useState({})
  const [jobTypeData, setJobTypeData] = React.useState({})
  
  const [currData, setCurrData] = React.useState({})

  React.useEffect(()=>{
    var jt = filterData(props.data, 'Job Type')
    setJobTypeData(jt)
    setLocationData(filterData(props.data, 'Location'))

    setCurrData(jt)
    setType('type')
  }, [props.data])

  const handleChangeSelector = (event) => {
    // Which type of data to present
    if(event.target.value === 'type') {
      setCurrData(jobTypeData)
    }
    else if(event.target.value === 'loc') {
      setCurrData(locationData)
    }
    setType(event.target.value);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Graph</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChangeSelector}
        >
          <MenuItem value={"type"}>Job Type</MenuItem>
          <MenuItem value={"loc"}>Location</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Doughnut" value="1" />
              {/* <Tab label="Bar" value="2" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <div style={{alignItems:'center', width:'100%'}}>
              <DoughnutGraph data={currData}/>
            </div>
          </TabPanel>
          {/* <TabPanel value="2">
            <div style={{alignItems:'center'}}>
              <BarGraph data={currData}/>
            </div>
          </TabPanel> */}
        </TabContext>
      </Box>
    </div>
  )
}