import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

import Main from './components/Main'
import Auth from './components/Auth'
import Article from './components/Article/Article'

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/auth" component={Auth} />
                <Route path="/article/:id" exact component={Article} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;