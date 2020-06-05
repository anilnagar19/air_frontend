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

import Websocket from 'react-websocket';
let refWebSocket;
export default function GetTempData(props) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		refWebSocket.sendMessage("start");
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const saveTemprature = () => {

		refWebSocket.sendMessage("close");
		axios.post(Constant.API_URL + 'temperature/', {
			EMP_ID: props.EMP_ID,
			TEMPERATURE: '400'
		}).then(function (response) {
			setOpen(false);
		})
	}

	const handleData = (event) => {
		//settempData(event);
	};

	const handleOpen = () => {
		console.log("connected:)");
	}
	return (
		<div>
			<Websocket url={Constant.WEB_SOCKET_SERVER_URL}
				debug={true}
				reconnect={true}
				onOpen={handleOpen}
				onClose={handleClose}
				onMessage={handleData.bind()}
				ref={Websocket => {
					refWebSocket = Websocket;
				}} />
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Start
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
