import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ControlPanel from '../pages/ControlPanel';

const Routes: React.FC = () => {
  return ( 
    <Switch>
      <Route path='*' element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/control-panel" element={<ControlPanel />} />
    </Switch>
  )
}

export default Routes;
