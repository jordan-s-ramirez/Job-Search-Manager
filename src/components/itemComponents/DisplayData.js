import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ComplexCard from './ComplexCard';
import Pagination from '@mui/material/Pagination';

export default function DisplayData(props) {
  const [data, setData] = useState([])
  const [currPageData, setCurrPageData] = useState([])
  const [currPage, setCurrPage] = useState(1)
  
  const handlePageChange = (event, value) => {
    setCurrPage(value)
    setCurrPageData(data[value - 1])
  }

  useEffect(()=>{
    // console.log("DisplayData", props.data)
    // Divide Page Data
    var parsedData = []
    var singlePageData = []
    props.data.map((obj,index)=>{
      singlePageData.push(obj)
      if(singlePageData.length === 8) {
        parsedData.push(singlePageData)
        singlePageData = []
      }
    })
    if(singlePageData.length !== 0) {
      parsedData.push(singlePageData)
    }
    
    // Set Data
    setData(parsedData)
    if(parsedData.length !== 0) {
      setCurrPageData(parsedData[0])
    }
    else {
      setCurrPageData([])
    }
  },[props.data])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid item container spacing={2}>
        {currPageData.map((object, index) => {
          return(
            <ComplexCard
              key={index}
              myCompany={object.Company}
              myTitle={object.Title}
              myJobType={object["Job Type"]}
              myLoc={object.Location}
              mySalary={object.Salary !== "" ? "$"+object.Salary+"k": null} 
              myURL={object["Job URL"]}
              myDesc={object["Job Description"]}
              myStatus={object["Application Status\r"]}
            />
          )
        })}
        <Grid item container spacing={2} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={12} md={12}>
            <Pagination 
              count={Math.floor(props.data.length / 8) + 1} 
              page={currPage} 
              variant="outlined" 
              shape="rounded" 
              onChange={handlePageChange}
              size="large"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}