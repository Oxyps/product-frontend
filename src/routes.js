import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Products from './pages/products';
import ProductsAdd from './pages/products-add';
import ProductsEdit from './pages/products-edit';

import Header from './components/Header';

import Batches from './pages/batches';
import BatchesAdd from './pages/batches-add';
import BatchesEdit from './pages/batches-edit';

const Routes = () => (
	<BrowserRouter>
		<Header />
		<Switch>
			<Route path='/products/' component={Products} />
			<Route path='/products-add/' component={ProductsAdd} />
			<Route path='/products-edit/:id/' component={ProductsEdit} />
			
			<Route path='/batches/' component={Batches} />
			<Route path='/batches-add/' component={BatchesAdd} />
			<Route path='/batches-edit/:id/' component={BatchesEdit} />
		</Switch>
	</BrowserRouter>
);

export default Routes;