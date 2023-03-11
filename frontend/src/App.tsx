import style from './App.module.scss'
import 'antd/dist/reset.css'
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import * as ReactRouteDom from 'react-router-dom'
import Home from './pages/Home'
import { SuperTokensConfig } from './config'
import ConversationPage from './pages/ConversationPage'
import HomePage from './pages/HomePage'


const posts: any = []

SuperTokens.init(SuperTokensConfig)

function App() {
  return (
    <SuperTokensWrapper>
      <div className={style.App}>
        <Router>
          <div className={style.fill}>
            <Routes>
              {/* This shows the login UI on "/auth" route */}
              {getSuperTokensRoutesForReactRouterDom(ReactRouteDom)}
              <Route path='/' element={<HomePage posts={posts} />} />
              <Route
                path='/home'
                element={
                  /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */

                  <HomePage posts={posts} />
                }
              />
              <Route
                path='/chat'
                element={
                  <SessionAuth>
                    <ConversationPage />
                  </SessionAuth>
                }
              />
              <Route
                path='/login'
                element={
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
