import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Products from './pages/products';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/">
				<Products />
			</Route>

            {/* <Route path="/musics" component={Musics} />
            <Route path="/music-add" component={MusicAdd} />
            <Route path="/music-detail/:id" component={MusicDetail} />
            <Route path="/music-update/:id" component={MusicUpdate} /> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;