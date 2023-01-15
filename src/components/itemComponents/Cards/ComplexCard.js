import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditData from './EditDataBullet';
import EditDescription from './EditDescription';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ComplexCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [resize, setResize] = React.useState([12,6,3]);

  const [description, setDescription] = React.useState(props.singleData["Job Description"])

  React.useEffect(()=>{
    setExpanded(false)
    setResize([12,6,3])
    
    setDescription(props.singleData["Job Description"])
  },[props.singleData])

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if(!expanded) {
      setResize([12,12,12]);
    }
    else {
      setResize([12,6,3]);
    }
  };

  const handleDelete = () => {
    props.remDataFunc(props.myIndex)
  }

  return (
    <Grid item xs={resize[0]} sm={resize[1]} md={resize[2]}>
      <Card>
        <CardHeader
          title={props.myTitle}
          subheader={props.myCompany + " | " + props.myLoc}
          action={
            <IconButton onClick={handleDelete} aria-label="add to favorites">
              <RemoveCircleIcon color='error'/>
            </IconButton>
          }
        />
        <CardContent style={{textAlign:'left'}}>
          <ul>
            <EditData type="Job Type" index={props.myIndex} name={props.myJobType} title="Job Type:" updateDataFunc={(x,y,z)=>props.updateDataFunc(x,y,z)}/>
            <EditData type="Salary" index={props.myIndex} name={props.mySalary} title="Salary:" updateDataFunc={(x,y,z)=>props.updateDataFunc(x,y,z)}/>
            <EditData type="Location" index={props.myIndex} name={props.myLoc} title="Location:" updateDataFunc={(x,y,z)=>props.updateDataFunc(x,y,z)}/>
            <EditData type="Application Status\r" index={props.myIndex} name={props.myStatus} title="Status:" updateDataFunc={(x,y,z)=>props.updateDataFunc(x,y,z)}/>
            <EditData type="Job URL" index={props.myIndex} name={props.myURL} title="URL: " updateDataFunc={(x,y,z)=>props.updateDataFunc(x,y,z)}/>
            {/* <a href={props.myURL}>
            </a> */}
          </ul>  
        </CardContent>
        <CardActions disableSpacing>
          
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon color='info'/>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{textAlign:'left'}}>
            <Typography variant="h6"><b>Description:</b></Typography>
            <Typography paragraph>
              <EditDescription type="Job Description" index={props.singleData.index} name={description} updateDataFunc={(x,y,z)=>props.updateDataFunc(x,y,z)}/>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}