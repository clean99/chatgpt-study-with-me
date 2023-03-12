import * as React from 'react'
import {
  useSessionContext,
  signOut,
  SessionContextType,
} from 'supertokens-auth-react/recipe/session'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../services/meta'
import { UserInfo } from '../types/types'

const useAuth = (): {
  loading: boolean
  sessionContext: SessionContextType
  userInfo: UserInfo | Record<string, never>
  logoutClicked: () => Promise<void>
} => {
  const sessionContext = useSessionContext()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = React.useState<UserInfo>()

  React.useEffect(() => {
    if (sessionContext.loading === false) {
      ;(async () => {
        const res = await getUserInfo()
        setUserInfo(res.data)
      })()
    }
  }, [sessionContext.loading])

  async function logoutClicked() {
    await signOut()
    navigate('/home')
  }

  return {
    loading: sessionContext.loading,
    sessionContext,
    userInfo: userInfo ?? {},
    logoutClicked,
  }
}

export default useAuth
