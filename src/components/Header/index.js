import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	headerMenu: {
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}));

const Header = props => {
	const classes = useStyles();

	const { history } = props;

	const handleButtonClick = pageURL => {
		history.push(pageURL);
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' className={classes.title}>
					CRUD
				</Typography>
				<div className={classes.headerMenu}>
					<Button
						onClick={() => handleButtonClick('/products/')}
						classes={classes.button} variant='contained'
					>Produtos</Button>
					<Button
						onClick={() => handleButtonClick('/batches/')}
						classes={classes.button} variant='contained'
					>Lotes</Button>
				</div>
			</Toolbar>
		</AppBar>
  	);
}

export default withRouter(Header);