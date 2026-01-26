import { useCallback, useMemo, useState } from 'react';
import {
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { FlatList, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BRAND_COLOR } from '../../utils/constans';
import { MenuItem } from '../../api/menu';
import { useNavigationStore } from '../../store/navigationStore';

export default function DrawerContent(props: DrawerContentComponentProps) {
    const closeDrawer = useCallback(() => {
        props.navigation.closeDrawer();
    }, [props.navigation]);

    return (
        <View style={styles.drawerContent}>
            <DrawerHeader onClose={closeDrawer} />
            <DrawerMenu onNavigate={closeDrawer} />
        </View>
    );
}

type DrawerHeaderProps = {
    onClose: () => void;
};

function DrawerHeader({ onClose }: DrawerHeaderProps) {
    return (
        <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Börse{'\n'}Stuttgart</Text>
            <TouchableOpacity
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                style={styles.closeButton}
            >
                <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
        </View>
    );
}

type DrawerMenuProps = {
    onNavigate: () => void;
};

function DrawerMenu({ onNavigate }: DrawerMenuProps) {
    const menu = useNavigationStore((state) => state.menu);
    const loading = useNavigationStore((state) => state.loading);
    const error = useNavigationStore((state) => state.error);
    const setCurrentUrl = useNavigationStore((state) => state.setCurrentUrl);
    const [menuStack, setMenuStack] = useState<MenuItem[][]>([]);
    const [titleStack, setTitleStack] = useState<string[]>([]);

    const currentItems = useMemo(() => {
        if (menuStack.length === 0) return menu;
        return menuStack[menuStack.length - 1];
    }, [menu, menuStack]);

    const currentTitle = titleStack[titleStack.length - 1];

    const handleBack = useCallback(() => {
        setMenuStack((prev) => prev.slice(0, -1));
        setTitleStack((prev) => prev.slice(0, -1));
    }, []);

    const handleNavigate = useCallback((url?: string) => {
        if (!url) return;
        setCurrentUrl(url);
        onNavigate();
    }, [onNavigate, setCurrentUrl]);

    const handleItemPress = useCallback((item: MenuItem) => {
        if (item.children.length > 0) {
            setMenuStack((prev) => [...prev, item.children]);
            setTitleStack((prev) => [...prev, item.title]);
            return;
        }
        handleNavigate(item.url);
    }, [handleNavigate]);

    const renderItem = useCallback(({ item }: { item: MenuItem }) => (
        <TouchableOpacity
            onPress={() => handleItemPress(item)}
            style={styles.menuItem}
            accessibilityRole="button"
        >
            <Text style={styles.menuLabel}>{item.title}</Text>
        </TouchableOpacity>
    ), [handleItemPress]);

    const listHeader = useMemo(() => {
        if (!currentTitle) return null;
        return (
            <TouchableOpacity
                onPress={handleBack}
                accessibilityRole="button"
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>{'< '}Zurück</Text>
            </TouchableOpacity>
        );
    }, [currentTitle, handleBack]);

    if (loading) {
        return <Text style={styles.menuStatus}>Loading menu...</Text>;
    }

    if (error) {
        return <Text style={styles.menuStatus}>Menu unavailable</Text>;
    }

    return (
        <FlatList
            data={currentItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={listHeader}
            contentContainerStyle={styles.menuList}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        paddingTop: 32,
        backgroundColor: BRAND_COLOR,
        flex: 1,
        paddingHorizontal: 16,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
    },
    drawerTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 32,
        flex: 1,
    },
    closeButton: {
        paddingLeft: 16,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 60,
        fontWeight: '300',
        lineHeight: 60,
    },
    backButton: {
        paddingVertical: 12,
        alignSelf: 'flex-end',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    menuStatus: {
        color: '#fff',
        fontSize: 14,
        paddingVertical: 8,
    },
    menuList: {
        paddingBottom: 24,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuLabel: {
        color: '#fff',
        fontSize: 20,
    },
});
