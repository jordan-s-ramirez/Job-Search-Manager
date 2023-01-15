import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ComplexCard from './ComplexCard';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

export default function DisplayData(props) {
  const [data, setData] = useState([])
  const [currPageData, setCurrPageData] = useState([])
  const [currPage, setCurrPage] = useState(1)
  
  const handlePageChange = (event, value) => {
    setCurrPage(value)
    setCurrPageData(data[value - 1])
  }

  const handleDownload = () => {
    var header = ["Timestamp","Title","Job Type", "Location","Salary","Job Description","Job URL","Company","Application Status"]
    
    var data = []

    for(var i = 0; i < props.data.length; i++) {
      var singleData = []
      for(var j = 0; j < header.length; j++) {
        console.log(props.data[i][header[j]])
        singleData.push(props.data[i][header[j]])
      }
      data.push(singleData.join("\t"))
    }

    console.log("Download TSV", data)
    var tsv = header.join("\t") + "\n" + data.join("\n");
    window.location.href = "data:text/tab-separated-values," + encodeURIComponent(tsv);
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
    console.log("ParsedData", parsedData)
    setData(parsedData)
    if(parsedData.length !== 0) {
      setCurrPageData(parsedData[currPage - 1])
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
              myIndex={object.index}
              remDataFunc={(e)=>props.remDataFunc(e)}
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
        <Grid item container spacing={2} direction='column' alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div style={{width:"100%", alignItems:"center"}}>
              <Pagination 
                count={Math.ceil(props.data.length / 8)} 
                page={currPage} 
                variant="outlined" 
                shape="rounded" 
                onChange={handlePageChange}
                size="large"
              />
            </div>
          </Grid>
        </Grid>
        <Grid item container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <IconButton size="large" onClick={()=>{props.remDataFunc(-1)}} style={{backgroundColor:"#fcfcfc"}}>
              <SaveIcon color="primary"/>
            </IconButton>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <IconButton onClick={handleDownload} size="large" style={{backgroundColor:"#fcfcfc"}}>
              <DownloadRoundedIcon color="primary"/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}