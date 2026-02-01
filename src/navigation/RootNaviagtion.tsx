import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebViewScreen from '../screens/WebViewScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';

const Stack = createNativeStackNavigator();

export default function RootNaviagtion() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={WebViewScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    headerShown: false,
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                }}
            />
        </Stack.Navigator>
    );
}
