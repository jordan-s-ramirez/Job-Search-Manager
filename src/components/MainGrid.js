import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InfoTable from './InfoTable';
import Graphs from './Graphs';
import AddData from './AddData';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainGrid() {
  const [hasData, setHasData] = useState(false)
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();

  const tsvFileToArray = string => {
    const tsvHeader = string.slice(0, string.indexOf("\n")).split("\t");
    const tsvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = tsvRows.map(i => {
      const values = i.split("\t");
      const obj = tsvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    // Set Array
    localStorage.setItem("jobHuntData", JSON.stringify({data: array}));
    setArray(array);
    setHasData(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Handle Submit")
    if (e.target.files[0] !== null) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        tsvFileToArray(text);
      };

      fileReader.readAsText(e.target.files[0]);
    }
  }

  const handleAddData = (newItem) => {
    // Update Data
    var arr = Array.from(array)
    newItem["index"] = arr.length
    arr.push(newItem)
    setArray(arr)

    // Save Data
    localStorage.setItem("jobHuntData", JSON.stringify({data: arr}));
  }

  const handleRemoveData = (oldItemIndex) => {
    // // Make sure user wants to delete this item
    // var userResp = window.confirm("Are you use you want to remove " + array[oldItemIndex].Title + " - " + array[oldItemIndex].Company)
    // // Remove item
    // if(userResp) {
    //   var arr = Array.from(array)
    //   if (oldItemIndex > -1) {
    //     arr.splice(oldItemIndex, 1);
    //   }

    //   setArray(arr)
    // }

    // Remove Item
    var arr = Array.from(array)
    if (oldItemIndex > -1) {
      arr.splice(oldItemIndex, 1);
    }
    // Reorder array
    for(var i = oldItemIndex; i < arr.length; i++) {
      arr[i]["index"] = i
    }
    console.log("remove", oldItemIndex)
    setArray(arr)
  }

  // Check is user already has data
  useEffect(() => {
    var allData = localStorage.getItem('jobHuntData')
    if (allData !== null && array.length === 0) {
      // Parse Inital Data
      allData = JSON.parse(allData)
      allData = allData.data
      
      for(var i = 0; i < allData.length; i++) {
        allData[i]["index"] = i
      }

      setArray(allData)
      setHasData(true)
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1}}>
      <div style={{textAlign: 'center'}}>
        <h1>Job Search Manager</h1>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} style={{marginBottom:'1vh'}}>
          <Item>
            {hasData ? 
            (
              <div>
                <InfoTable data={array} remDataFunc={(e)=>handleRemoveData(e)}/>
                <h2>Add New Job</h2>
                <AddData toAdd={(e) => {handleAddData(e)}}/>
              </div>
            ):
            (
              <div>
                <h3>Upload TSV to Get Started!</h3>
                  <Stack spacing={0} alignItems="center">
                    <Button variant="text" onClick={() => (setHasData(true))}>Start New</Button>
                    <Button variant="contained" component="label" >
                      Upload Old Save
                      <input hidden accept=".tsv" type="file" onChange={(e) => {handleSubmit(e)}}/>
                    </Button>
                  </Stack>
              </div>
            )
            }
          </Item>
        </Grid>
        {hasData ?
        (
          <Grid item xs={12} md={12} lg={12} style={{marginBottom:'2vh'}}>
            <Item>
              <Graphs data={array}/>
            </Item>
          </Grid>
        )
        :
        (null)
        }
      </Grid>
    </Box>
  );
}