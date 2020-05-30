import axios from 'axios';
import StickyHeadTable from '../components/table';
import React, { useEffect, useState } from 'react';
import * as Constant from '../services/constants';

export default function EmployeeDetail() {
	const columns = [
		{ field: 'EMP_ID', title: 'Emp ID', minWidth: 170, align: 'left' },
		{ field: 'EMP_NAME', title: 'Name', minWidth: 170, align: 'left' },
		{ field: 'EMP_MOBILE', title: 'Mobile', minWidth: 170, align: 'left' },
		{ field: 'DEPARTMENT', title: 'Department', minWidth: 50, align: 'left' },
		{ field: 'TEMPERATURE', title: 'Temprature', minWidth: 50, align: 'left' }
	];

	const [employee, setemployees] = useState([]);
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		axios.get(Constant.API_URL + 'temperature')
			.then(res => {
				setemployees(res.data);
				setLoad(true);
			})
			.catch(err => {
				setError(err.message);
				setLoad(true)
			})
	}, []);

	if (load) {
		return (
			<StickyHeadTable columns={columns} data={employee} />
		)
	} else {
		return (
			<div>
				Loading...
            </div>
		);
	}
}