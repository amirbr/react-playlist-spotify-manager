import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, NotFound } from './containers';
import { Search, Login } from './components';

export default () =>

  /**
   * Please keep routes in alphabetical order
   */
   (
     <Route path="/" component={App}>
       {/* Home (main) route */}
       <IndexRoute component={Search} />
       <Route path="search" component={Search} />
       <Route path="login" component={Login} />

       {/* Catch all route */}
       <Route path="*" component={NotFound} status={404} />
     </Route>
  );
