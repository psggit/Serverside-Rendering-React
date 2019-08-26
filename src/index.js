import React from 'react'
import ReactDOM from 'react-dom'
import Home from "./home"
import { Router } from "react-router"
import { Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import "./style.scss"

const history = createBrowserHistory()
class Main extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/home" component={Home} />
      </Router>
    )
  }
}
if (document.getElementById("app").childNodes.length) {
  ReactDOM.hydrate(<Main />, document.getElementById("app"))
} else {
  ReactDOM.render(<Main />, document.getElementById("app"))
}

export default Main
