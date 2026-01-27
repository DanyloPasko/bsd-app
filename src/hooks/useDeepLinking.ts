import { useCallback, useEffect } from 'react';
import * as Linking from 'expo-linking';
import { EVENTS_URL } from '../utils/constans';
import { useNavigationStore } from '../store/navigationStore';

const EVENTS_PATH = 'events';

export default function useDeepLinking() {
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
}
