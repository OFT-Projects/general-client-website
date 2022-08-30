import { Routes as Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path='*' element={<NotFound />} />
    <Route path="/" element={<Home />} />
  </Switch>
);

export default Routes;
