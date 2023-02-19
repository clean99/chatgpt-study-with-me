import style from './App.module.scss'
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import * as ReactRouteDom from 'react-router-dom'
import Home from './Home'
import { SuperTokensConfig } from './config'

SuperTokens.init(SuperTokensConfig)

function App() {
  return (
    <SuperTokensWrapper>
      <div className={style.App}>
        <Router>
          <div className={style.fill}>
            <h1 className={style.header}>66666</h1>
            <Routes>
              {/* This shows the login UI on "/auth" route */}
              {getSuperTokensRoutesForReactRouterDom(ReactRouteDom)}

              <Route
                path='/'
                element={
                  /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                  <SessionAuth>
                    <Home />
                  </SessionAuth>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </SuperTokensWrapper>
  )
}

export default App
