import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Collage from './components/Collage'

function App() {
  return (
    <Router>
    <Switch>
      <Route 
        exact path='/'  
        render={(props) => (
          <Collage {...props} defaultQuery={'random'} />
        )}
       />
       <Route 
        exact path='/sports'  
        render={(props) => (
          <Collage {...props} defaultQuery={'sports'} />
        )}
       />
       <Route 
        exact path='/mountains'  
        render={(props) => (
          <Collage {...props} defaultQuery={'mountains'} />
        )}
       />
       <Route 
        exact path='/forest'  
        render={(props) => (
          <Collage {...props} defaultQuery={'forest'} />
        )}
       />
    </Switch>
    </Router>
  );
}

export default App;
