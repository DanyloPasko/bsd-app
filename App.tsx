import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    useFonts,
} from '@expo-google-fonts/montserrat';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { BRAND_COLOR } from './src/utils/constans';
import useDeepLinking from './src/hooks/useDeepLinking';
import { applyGlobalFont } from './src/fonts/typography';

applyGlobalFont();

export default function App() {
    useDeepLinking();
    const [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={BRAND_COLOR} />
            <DrawerNavigator />
        </NavigationContainer>
    );
}
