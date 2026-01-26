import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const BRAND_COLOR = 'rgb(100, 50, 250)';

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={BRAND_COLOR} />
            <DrawerNavigator />
        </NavigationContainer>
    );
}
