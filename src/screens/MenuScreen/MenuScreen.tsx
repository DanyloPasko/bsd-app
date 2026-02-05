import { StyleSheet } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BRAND_COLOR } from '../../utils/constans';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from './components/Header';
import Menu from './components/menu/Menu';
import { useNavigationStore } from '../../store/navigationStore';
import { fetchMenuConfig } from "../../api/menu/menu";

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
            <Header onClose={closeMenu}/>
            <Menu onClose={closeMenu}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND_COLOR,
        paddingHorizontal: 16,
    },
});
