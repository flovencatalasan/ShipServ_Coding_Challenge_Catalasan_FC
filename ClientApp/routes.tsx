import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Bookings from './components/Bookings';
import Itineraries from './components/Itineraries';

export const routes = <Layout>
    <Route exact path='/' component={Bookings} />
    <Route exact path='/Itineraries' component={Itineraries} />
</Layout>;
