import { createDrawerNavigator } from '@react-navigation/drawer';
import { useCallback, useEffect } from 'react';
import WebViewScreen from '../screens/WebViewScreen';
import { BRAND_COLOR } from '../utils/constans';
import { fetchMenuConfig } from '../api/menu';
import { useNavigationStore } from '../store/navigationStore';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const setMenu = useNavigationStore((state) => state.setMenu);
    const setLoading = useNavigationStore((state) => state.setLoading);
    const setError = useNavigationStore((state) => state.setError);

    const loadMenu = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const items = await fetchMenuConfig();
            setMenu(items);
        } catch (error) {
            setError('Failed to load menu');
        } finally {
            setLoading(false);
        }
    }, [setError, setLoading, setMenu]);

    useEffect(() => {
        loadMenu();
    }, [loadMenu]);

    return (
        <Drawer.Navigator
            detachInactiveScreens={false}
            screenOptions={{
                drawerPosition: 'right',
                drawerType: 'front',
                headerStyle: { backgroundColor: BRAND_COLOR },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' },
                headerTitleAlign: 'center',
                drawerStyle: { backgroundColor: BRAND_COLOR, width: '100%' },
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#fff',
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={WebViewScreen}
                options={{
                    title: 'Börse Stuttgart',
                    drawerItemStyle: { height: 0 },
                }}
            />
        </Drawer.Navigator>
    );
}
