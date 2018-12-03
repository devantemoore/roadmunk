import React from "react";
import { Route, Switch } from "react-router-dom";
import Posts from '../components/Posts';
import PostItem from '../components/PostItem';
import NotFound from '../components/NotFound';

const indexRoutes = (
    <Switch>
        <Route component={Posts} exact path="/" />
        <Route component={PostItem} exact path="/:postId" />
        <Route component={NotFound} path="**" />
    </Switch>
);

export default indexRoutes;
