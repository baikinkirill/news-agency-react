import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthContext } from "./components/AuthContext"
import Main from "./components/Main"
import Auth from "./components/Auth"
import Article from "./components/Article/Article"
import Editor from "./components/Editor"
import EditArticle from "./components/EditArticle"

function Routes() {
  const { userContext } = useContext(AuthContext)
  const [user] = userContext

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/auth" component={Auth} />
        <Route path="/editor" exact component={user === null ? Main : Editor} />
        <Route
          path="/editor/:category"
          exact
          component={user === null ? Main : Editor}
        />
        <Route path="/article/:id" exact component={Article} />
        <Route
          path="/edit/:id"
          exact
          component={user === null ? Main : EditArticle}
        />
        <Route path="/:category" exact component={Main} />
      </Switch>
    </Router>
  )
}

export default Routes
