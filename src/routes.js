import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Products from './pages/products';
import ProductAdd from './pages/product-add';
import ProductDetail from './pages/product-detail';
import ProductUpdate from './pages/product-update';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/products' component={Products} />
            <Route path='/product-add' component={ProductAdd} />
			<Route path='/product-detail/:id' component={ProductDetail} />
			<Route path='/product-update/:id' component={ProductUpdate} />
        </Switch>
    </BrowserRouter>
);

export default Routes;