import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from './components/theme';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

import './App.css';

export default function App() {
  	return (
	  	<ThemeProvider theme={createMuiTheme}>
			<ToastContainer
				autoClose={5000}
				closeOnClick
				pauseOnFocusLoss
				draggable
			/>

			<Routes />
		</ThemeProvider>
  	);
}