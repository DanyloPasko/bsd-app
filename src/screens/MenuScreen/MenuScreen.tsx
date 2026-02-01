import { StyleSheet, View } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BRAND_COLOR } from '../../utils/constans';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from './components/Header';
import Menu from './components/Menu';
import { fetchMenuConfig } from '../../api/menu/menu';
import { useNavigationStore } from '../../store/navigationStore';

export default function MenuScreen() {
    const navigation = useNavigation();
    const closeMenu = () => navigation.goBack();
    const menu = useNavigationStore((state) => state.menu);
    const setMenu = useNavigationStore((state) => state.setMenu);
    const loading = useNavigationStore((state) => state.loading);
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
        if (!menu.length && !loading) {
            loadMenu();
        }
    }, [loadMenu, loading, menu.length]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.drawerContent}>
                <Header onClose={closeMenu} />
                <Menu onClose={closeMenu} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND_COLOR,
    },
    drawerContent: {
        paddingTop: 40,
        backgroundColor: BRAND_COLOR,
        flex: 1,
        paddingHorizontal: 16,
    },
});
