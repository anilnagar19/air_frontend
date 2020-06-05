import React from 'react';

import './App.css';
import clsx from 'clsx';

import Websocket from 'react-websocket';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';

import EmployeeDetail from './pages/EmployeeDetail';
import AddTest from './pages/AddTest';

const drawerWidth = 240;
let refWebSocket;
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
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
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary
	}
}));

function App() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [tempData, settempData] = React.useState([]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleData = (event) => {
		settempData(event);
	};

	const handleOpen = () => {
		console.log("connected:)");
	}

	const handleClose = () => {
		console.log("disconnected:(");
	}

	const sendMessage = (message) => {
		refWebSocket.sendMessage(message);
	}

	return (
		<Router>
			<div style={{ display: 'flex' }}>
				<CssBaseline />
				<Websocket url='ws://192.168.0.107:9999/'
					debug={true}
					reconnect={true}
					onOpen={handleOpen}
					onClose={handleClose}
					onMessage={handleData.bind()}
					ref={Websocket => {
						refWebSocket = Websocket;
					}} />
				<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
						>
							<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
							Dashboard
		  </Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<Link to="/addTest" className={classes.link}>
							<ListItem button to="/addTest">
								<ListItemIcon>
									<PersonAddIcon />
								</ListItemIcon>
								<ListItemText primary="Start Test" />
							</ListItem>
						</Link>
						<Link to="/employes" className={classes.link}>
							<ListItem button to="/employes">
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary="View Employee" />
							</ListItem>
						</Link>
						<Link to="/addEmployee" className={classes.link}>
							<ListItem>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary="Add Employee" />
							</ListItem>
						</Link>
					</List>
				</Drawer>
				<Switch>
					<main className={classes.content}>
						<div className={classes.appBarSpacer} />
						<Route exact path="/addTest">
							<Container maxWidth="lg" className={classes.container}>
								<Grid container spacing={3}>
									<AddTest data={tempData} />
								</Grid>
							</Container>
						</Route>
						<Route exact path="/employes">
							<Container maxWidth="lg" className={classes.container}>
								<Grid container spacing={3}>
									<EmployeeDetail />
								</Grid>
							</Container>
						</Route>
						<Route exact path="/addEmployee">
							<Container maxWidth="lg" className={classes.container}>
								<Grid container spacing={3}>
									Add employee
								</Grid>
							</Container>
						</Route>
					</main>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
