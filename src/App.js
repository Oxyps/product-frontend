import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

import './App.css';

export default function App() {
  	return (
	  	<>
			<ToastContainer
				autoClose={5000}
				closeOnClick
				pauseOnFocusLoss
				draggable
			/>

			<Routes />
		</>
  	);
}