import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { MenuItem } from '../../../api/menu/menu';
import { useNavigationStore } from '../../../store/navigationStore';
import {
    FONT_FAMILY_BOLD,
    FONT_FAMILY_SEMIBOLD,
    FONT_FAMILY_REGULAR,
} from '../../../fonts/typography';

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

export default function Menu({ onClose }: DrawerMenuProps) {
    const menu = useNavigationStore((state) => state.menu);
    const loading = useNavigationStore((state) => state.loading);
    const error = useNavigationStore((state) => state.error);
    const setCurrentUrl = useNavigationStore((state) => state.setCurrentUrl);
    const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);
    const translateX = useRef(new Animated.Value(0)).current;
    const previousDepth = useRef(0);

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

    useEffect(() => {
        const nextDepth = menuStack.length;
        if (nextDepth === previousDepth.current) {
            return;
        }
        const isForward = nextDepth > previousDepth.current;
        const slideDistance = Math.min(
            36,
            Dimensions.get('window').width * 0.08,
        );

        previousDepth.current = nextDepth;
        translateX.setValue(isForward ? slideDistance : -slideDistance);
        Animated.timing(translateX, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }, [menuStack.length, translateX]);

    const renderItem = useCallback(({ item }: { item: MenuItem }) => (
        <TouchableOpacity
            onPress={() => handleItemPress(item)}
            style={styles.menuItem}
            accessibilityRole="button"
        >
            <Text style={styles.menuLabel}>{item.title}</Text>
            {item.children.length > 0 ? (
                <Text style={styles.menuArrow}>{'›'}</Text>
            ) : null}
        </TouchableOpacity>
    ), [handleItemPress]);

    const listHeader = currentTitle ? (
        <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderTitle}>{currentTitle}</Text>
            <TouchableOpacity
                onPress={handleBack}
                accessibilityRole="button"
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>
                    <Text style={styles.backArrow}>{'‹ '}</Text>
                    {'Zurück'}
                </Text>
            </TouchableOpacity>
        </View>
    ) : null;

    if (loading) {
        return <MenuStatus>Loading menu...</MenuStatus>;
    }

    if (error) {
        return <MenuStatus>Menu unavailable</MenuStatus>;
    }

    return (
        <Animated.View style={[styles.animatedContainer, { transform: [{ translateX }] }]}>
            <FlatList
                data={currentItems}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListHeaderComponent={listHeader}
                contentContainerStyle={styles.menuList}
                showsVerticalScrollIndicator={false}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    animatedContainer: {
        flex: 1,
    },
    backButton: {
        paddingVertical: 12,
        paddingLeft: 12,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: FONT_FAMILY_REGULAR,
    },
    backArrow: {
        fontSize: 24,
        fontFamily: FONT_FAMILY_REGULAR,
        lineHeight: 24,
    },
    menuHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    menuHeaderTitle: {
        color: '#8EC9FF',
        fontSize: 18,
        fontFamily: FONT_FAMILY_SEMIBOLD,
        flex: 1,
    },
    menuStatus: {
        color: '#fff',
        fontSize: 14,
        fontFamily: FONT_FAMILY_SEMIBOLD,
        paddingVertical: 8,
    },
    menuList: {
        paddingBottom: 24,
    },
    menuItem: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuLabel: {
        color: '#fff',
        fontSize: 21,
        fontFamily: FONT_FAMILY_BOLD,
    },
    menuArrow: {
        color: '#fff',
        fontSize: 36,
        fontFamily: FONT_FAMILY_REGULAR,
        lineHeight: 36,
        includeFontPadding: false,
        paddingRight: 6,
    },
});
