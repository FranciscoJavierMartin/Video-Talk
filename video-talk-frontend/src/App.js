import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { DASHBOARD_PAGE, LOGIN_PAGE } from './constants/routes';
import Dashboard from './dashboard/Dashboard';
import LoginPage from './loginPage/LoginPage';
import { connectWithWebServer } from './utils/wssConnection/wssConnection';

function App() {
  useEffect(() => {
    connectWithWebServer();
  }, []);
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path={DASHBOARD_PAGE}>
            <Dashboard />
          </Route>
          <Route path={LOGIN_PAGE}>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
