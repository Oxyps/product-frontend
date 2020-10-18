import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Products from './pages/products';
import ProductsAdd from './pages/products-add';
import ProductsEdit from './pages/products-edit';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/products/' component={Products} />
            <Route path='/products-add/' component={ProductsAdd} />
			<Route path='/products-edit/:id/' component={ProductsEdit} />
        </Switch>
    </BrowserRouter>
);

export default Routes;