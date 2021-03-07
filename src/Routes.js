import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from './components/Main'
import Auth from './components/Auth'
import Article from './components/Article/Article'
import Editor from './components/Editor'
import { AuthContext } from './components/AuthContext'

function Routes() {

    const { userContext } = useContext(AuthContext)
    const [user] = userContext

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/auth" component={Auth} />
                <Route path="/article/:id" exact component={Article} />
                <Route path="/editor" exact component={(user === null) ? Main : Editor} />
            </Switch>
        </Router>
    )
}

export default Routes