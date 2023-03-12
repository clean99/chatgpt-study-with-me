import { Navigate } from 'react-router-dom'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'
import ConversationPage from './pages/ConversationPage'
import GraphPage from './pages/GraphPage'
import Home from './pages/Home'
import HomePage from './pages/HomePage'

export interface Routes {
    label: string
    key: string
    element?: React.FC
    showOnNavbar?: boolean
}

export const routes = [
    { label: 'Home', key: 'home',showOnNavbar: true, element: () => <HomePage posts={[]} /> },
    { label: 'Graph', key: 'graph',showOnNavbar: true, element: () => (<SessionAuth><GraphPage /></SessionAuth>)},
    { label: 'ChatGPT', key: 'chat',showOnNavbar: true, element:() =>  (<SessionAuth><ConversationPage /></SessionAuth>)},
    { label: 'Login', key: 'login', element:() => <SessionAuth><Home /></SessionAuth>},
    { label: 'Redirect', key: '', element:() => <Navigate to='/home' />},
    { label: 'Contact', key: 'contact' },
]