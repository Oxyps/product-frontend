import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

import './App.css';

export default function App() {
  	return (
	  	<>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={true}
				closeOnClick
				pauseOnFocusLoss
				draggable
			/>

			<Routes />
		</>
  	);
}