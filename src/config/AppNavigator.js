import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import AuthenticatedUserStack from './AuthenticatedUserStack'
import UnAuthenticatedUserStack from './UnAuthenticatedUserStack'

const AppNavigator = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    return (
        <NavigationContainer>
            {
                isAuthenticated ?
                    (
                        <AuthenticatedUserStack />
                    )
                    :
                    (
                        <UnAuthenticatedUserStack />
                    )
            }
        </NavigationContainer>
    )
}

export default AppNavigator

