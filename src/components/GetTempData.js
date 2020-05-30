import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Constant from '../services/constants';

export default function GetTempData(props) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const saveTemprature = () => {
		axios.post(Constant.API_URL + 'temperature/', {
			EMP_ID: props.EMP_ID,
			TEMPERATURE: '32'
		})
			.then(function (response) {
				setOpen(false);
			})
	}

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Start Test
      </Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
				maxWidth='sm'>
				<DialogTitle id="form-dialog-title">Fetching Temprature</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{props.data}
					</DialogContentText>
					<CircularProgress variant="static" value={37} />

				</DialogContent>
				<DialogActions>
					<Button onClick={saveTemprature} color="primary">
						Save
          </Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
