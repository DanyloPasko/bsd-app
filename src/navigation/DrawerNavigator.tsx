import { createDrawerNavigator } from '@react-navigation/drawer';
import { useCallback, useEffect } from 'react';
import WebViewScreen from '../screens/WebViewScreen';
import { BRAND_COLOR } from '../utils/constans';
import { fetchMenuConfig } from '../api/menu/menu';
import { useNavigationStore } from '../store/navigationStore';
import DrawerContent from './components/drawerContent/DrawerContent';
import { FONT_FAMILY_SEMIBOLD } from '../fonts/typography';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const setMenu = useNavigationStore((state) => state.setMenu);
    const setLoading = useNavigationStore((state) => state.setLoading);
    const setError = useNavigationStore((state) => state.setError);

    const loadMenu = useCallback(() => {
        setLoading(true);
        setError(null);
        fetchMenuConfig()
            .then((items) => {
                setMenu(items);
            })
            .catch(() => {
                setError('Failed to load menu');
            })
            .finally(() => {
                setLoading(false);
            });
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
                headerTitleStyle: { color: '#fff', fontFamily: FONT_FAMILY_SEMIBOLD },
                headerTitleAlign: 'center',
                drawerStyle: { backgroundColor: BRAND_COLOR, width: '100%' },
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#fff',
            }}
            drawerContent={DrawerContent}
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
