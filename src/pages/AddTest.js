import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import GetTempData from '../components/GetTempData';

export default function AddTest(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
			width: '100%'
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},
		title: {
			fontSize: 14,
		},
		pos: {
			marginBottom: 12,
		},
	}));

	const classes = useStyles();
	const [empId, setEmpId] = useState('')
	const [employee, setemployees] = useState([]);
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');

	function searchEmployee() {
		axios.get('http://127.0.0.1:8000/api/employee/?EMP_ID=' + empId)
			.then(res => {
				setemployees(res.data[0]);
				setLoad(true);
			})
			.catch(err => {
				setError(err.message);
				setLoad(true)
			})
	}

	return (<div className={classes.root}>
		<form className={classes.root} noValidate autoComplete="off">
			<Grid container spacing={3}>
				<Grid item xs={3}>
					<TextField onChange={event => setEmpId(event.target.value)}
						className={classes.root} id="outlined-basic" label="Employee ID" variant="outlined" />
				</Grid>
				<Grid item xs={3}>
					<Button variant="contained" color="primary" size="large" onClick={searchEmployee}>
						Search
		 			</Button>
				</Grid>
			</Grid>
		</form >

		{employee && Object.keys(employee).length
			? <Grid container spacing={3}>
				<Grid item xs={6}>
					<Card className={classes.root}>
						<CardContent>

							<Typography variant="h5" component="h2">
								{employee.EMP_NAME}
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								{employee.DEPARTMENT}
							</Typography>
							<Typography variant="body2" component="p">
								Contact: {employee.EMP_MOBILE}
								<br />
							</Typography>
						</CardContent>
						<CardActions>
							{/* <GetTempData data={props.data} /> */}
							<GetTempData data="100" EMP_ID={employee.EMP_ID} />
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			: <Typography variant="h5" component="h2">
				No Employee Selected
	</Typography>}
	</div >
	)
}
