import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as Linking from 'expo-linking';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { BRAND_COLOR, EVENTS_URL } from './src/utils/constans';
import { useNavigationStore } from './src/store/navigationStore';

const EVENTS_PATH = 'events';

export default function App() {
    const setCurrentUrl = useNavigationStore((state) => state.setCurrentUrl);

    const handleDeepLink = useCallback(
        (url: string | null) => {
            if (!url) {
                return;
            }

            const { path, hostname } = Linking.parse(url);
            const target = (path ?? hostname ?? '').replace(/^\/+|\/+$/g, '');

            if (target === EVENTS_PATH) {
                setCurrentUrl(EVENTS_URL);
            }
        },
        [setCurrentUrl],
    );

    useEffect(() => {
        Linking.getInitialURL()
            .then(handleDeepLink)
            .catch(() => {});

        const subscription = Linking.addEventListener('url', ({ url }) => {
            handleDeepLink(url);
        });

        return () => subscription.remove();
    }, [handleDeepLink]);

    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={BRAND_COLOR} />
            <DrawerNavigator />
        </NavigationContainer>
    );
}
