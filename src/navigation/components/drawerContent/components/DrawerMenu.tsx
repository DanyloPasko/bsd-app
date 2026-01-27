import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MenuItem } from '../../../../api/menu';
import { useNavigationStore } from '../../../../store/navigationStore';

type DrawerMenuProps = {
    onClose: () => void;
};

type MenuLevel = {
    title: string;
    items: MenuItem[];
};

function MenuStatus({ children }: { children: string }) {
    return <Text style={styles.menuStatus}>{children}</Text>;
}

export default function DrawerMenu({ onClose }: DrawerMenuProps) {
    const menu = useNavigationStore((state) => state.menu);
    const loading = useNavigationStore((state) => state.loading);
    const error = useNavigationStore((state) => state.error);
    const setCurrentUrl = useNavigationStore((state) => state.setCurrentUrl);
    const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);

    const currentLevel = menuStack[menuStack.length - 1];
    const currentItems = currentLevel ? currentLevel.items : menu;
    const currentTitle = currentLevel?.title;

    const handleBack = useCallback(() => {
        setMenuStack((prev) => prev.slice(0, -1));
    }, []);

    const handleNavigate = useCallback((url?: string) => {
        if (!url) return;
        setCurrentUrl(url);
        onClose();
    }, [onClose, setCurrentUrl]);

    const handleItemPress = useCallback((item: MenuItem) => {
        if (item.children.length > 0) {
            setMenuStack((prev) => [
                ...prev,
                { title: item.title, items: item.children },
            ]);
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
            {item.children.length > 0 ? (
                <Text style={styles.menuArrow}>{'>'}</Text>
            ) : null}
        </TouchableOpacity>
    ), [handleItemPress]);

    const listHeader = currentTitle ? (
        <TouchableOpacity
            onPress={handleBack}
            accessibilityRole="button"
            style={styles.backButton}
        >
            <Text style={styles.backButtonText}>{'< '}Zurück</Text>
        </TouchableOpacity>
    ) : null;

    if (loading) {
        return <MenuStatus>Loading menu...</MenuStatus>;
    }

    if (error) {
        return <MenuStatus>Menu unavailable</MenuStatus>;
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuLabel: {
        color: '#fff',
        fontSize: 20,
    },
    menuArrow: {
        color: '#fff',
        fontSize: 20,
        transform: [{ scale: 1.4 }],
        includeFontPadding: false,
        paddingRight: 6,
    },
});
