import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { BRAND_COLOR } from './src/utils/constans';
import useDeepLinking from './src/hooks/useDeepLinking';

export default function App() {
    useDeepLinking();

    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={BRAND_COLOR} />
            <DrawerNavigator />
        </NavigationContainer>
    );
}
