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

  React.useEffect(()=>{
    setExpanded(false)
    setResize([12,6,3])
  },[props.myCompany])

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
            <li>Job Type: {props.myJobType}</li>
            <li>Salary: {props.mySalary}</li>
            <li>Location: {props.myLoc}</li>
            <li>Status: {props.myStatus}</li>
            <li>URL: 
              <a href={props.myURL}>Visit | {props.myCompany}</a>
            </li>
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
              {props.myDesc}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}