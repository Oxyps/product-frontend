import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Products from './pages/products';
import ProductsAdd from './pages/products-add';
import ProductsEdit from './pages/products-edit';
import ProductsDetail from './pages/ProductsDetail';

import Header from './components/Header';

import Batches from './pages/batches';
import BatchesAdd from './pages/batches-add';
import BatchesEdit from './pages/batches-edit';
import BatchesDetail from './pages/BatchesDetail';

const Routes = () => (
	<BrowserRouter>
		<Header />
		<Switch>
			<Route path='/products/' component={Products} />
			<Route path='/products-add/' component={ProductsAdd} />
			<Route path='/products-edit/:id/' component={ProductsEdit} />
			<Route path='/products-detail/:id/' component={ProductsDetail} />
			
			<Route path='/batches/' component={Batches} />
			<Route path='/batches-add/' component={BatchesAdd} />
			<Route path='/batches-edit/:id/' component={BatchesEdit} />
			<Route path='/batches-detail/:id/' component={BatchesDetail} />
		</Switch>
	</BrowserRouter>
);

export default Routes;