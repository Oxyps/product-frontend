import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Products from './pages/products';
import ProductDetail from './pages/product-detail';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/products' component={Products} />
			<Route path='/product-detail/:id' component={ProductDetail} />
        </Switch>
    </BrowserRouter>
);

export default Routes;