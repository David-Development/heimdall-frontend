import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import LiveView from './LiveView';
import Timeline from './Timeline';
import Management from './Management';
import Classification from './management/Classification';
import Verification from './management/Verification';
import Training from './management/Training';
import Gallery from './management/Gallery';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import VideocamIcon from 'material-ui-icons/Videocam';
import Receipt from 'material-ui-icons/Receipt';
import HomeIcon from 'material-ui-icons/Home';
import SettingsIcon from 'material-ui-icons/Settings';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import ChevronRightSvg from './images/chevron-right.svg';

import TrainingDialog from './TrainingDialog';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100vw',
    //height: '100vh',
    /*
    height: 450, 
    marginTop: theme.spacing.unit * 3,
    */
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    //padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  navigationBarLi: {
    background: `url(${ChevronRightSvg})`,
  },
  titleFlex: {
    flex: 1,
  },
});









class App extends Component {

  state = {
    open: false,
    trainingProgress: 50
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
  }

/*
<ul id="navigation_bar">
{
  window.location.pathname
    .split("/")
    .filter(x => x !== "")
    .map(path => {
      return (
        <li key={path} className={classes.navigationBarLi}><a href={"/" + path}>{path}</a></li>
      )
      console.log(path);
    })
}
</ul> 

*/


  render() {
    const { classes, theme } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <TrainingDialog />
          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" noWrap className={classes.titleFlex}>
                  Facial recognition for Peephole
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              type="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}>
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <Divider />
                <ListItem button component={Link} to='/'>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to='/live'>
                  <ListItemIcon>
                    <VideocamIcon />
                  </ListItemIcon>
                  <ListItemText primary="LiveView" />
                </ListItem>
                <ListItem button component={Link} to='/timeline'>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText primary="Timeline" />
                </ListItem>
                <ListItem button component={Link} to='/management'>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Management" />
                </ListItem>
              </div>
            </Drawer>
            <main className={classes.content}>
              
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/live' component={LiveView} />
                <Route exact path='/management' component={Management} />
                <Route exact path='/management/classification/:eventid' component={Classification} />
                <Route exact path='/management/verification' component={Verification} />
                <Route exact path='/management/gallery' component={Gallery} />
                <Route exact path='/management/training' component={Training} />
                <Route exact path='/timeline' component={Timeline} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);

  