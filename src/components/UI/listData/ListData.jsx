import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Avatar, List,
ListItem,
ListItemAvatar,
ListItemText,} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



const ListData = (props) => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const rsvpItem = props.list.map((rsvpName) => (
    <ListItem key={rsvpName}>
      <ListItemAvatar>
        {/* <Avatar> */}
          <AccountCircle color="primary" fontSize="large"/>
        {/* </Avatar> */}
      </ListItemAvatar>
      <ListItemText
        primary={rsvpName}
      />
    </ListItem>
  ))
    
    const generate = (element) => {
        return props.list.map((value) =>
            React.cloneElement(element, {
            key: value,
            }),
        );
    }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            {props.list.length > 0 ? props.listTitle : props.listTitleAlter}
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {rsvpItem}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ListData;