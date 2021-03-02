import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

import Main from './components/Main'
import Auth from './components/Auth'

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/auth" component={Auth} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;