import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom'
import {AppState} from '../../redux/store'

type AuthPropType = {
    children: React.ReactNode
}
const Auth = ({children}:AuthPropType) => {
  
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticate
    )

  return (
    <>{isAuthenticated ? children : <Navigate replace to='/login'/>}</>
  )
}

export default Auth;