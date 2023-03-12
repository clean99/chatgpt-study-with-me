import style from './App.module.scss'
import 'antd/dist/reset.css'
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import * as ReactRouteDom from 'react-router-dom'
import { SuperTokensConfig } from './config'
import { routes } from './routes'

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
              {routes.map((route) => (
                <Route key={route.key} path={'/' + route.key} element={route.element?.()} />
              ))}
            </Routes>
          </div>
        </Router>
      </div>
    </SuperTokensWrapper>
  )
}

export default App
