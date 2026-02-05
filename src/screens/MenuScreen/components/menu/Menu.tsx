import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { MenuItem } from '../../../../api/menu/menu';
import { useNavigationStore } from '../../../../store/navigationStore';
import { MenuItemComponent } from './components/MenuItemComponent';
import { MenuStatus } from './components/MenuStatus';
import { MenuHeader } from './components/MenuHeader';

type DrawerMenuProps = {
    onClose: () => void;
};

type MenuLevel = {
    title: string;
    items: MenuItem[];
};

export default function Menu({ onClose }: DrawerMenuProps) {
    const menu = useNavigationStore((state) => state.menu);
    const loading = useNavigationStore((state) => state.loading);
    const error = useNavigationStore((state) => state.error);
    const setCurrentUrl = useNavigationStore((state) => state.setCurrentUrl);
    const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);
    const translateX = useSharedValue(0);
    const textOpacity = useSharedValue(1);
    const textTranslateY = useSharedValue(0);
    const previousDepth = useRef(0);

    const currentLevel = menuStack[menuStack.length - 1];
    const currentItems = currentLevel ? currentLevel.items : menu;
    const currentTitle = currentLevel?.title;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
            transform: [{ translateY: textTranslateY.value }],
        };
    });

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

        translateX.value = isForward ? slideDistance : -slideDistance;
        translateX.value = withTiming(0, { 
            duration: 220,
            easing: Easing.out(Easing.cubic),
        });

        textOpacity.value = 0;
        textTranslateY.value = 8;
        textOpacity.value = withTiming(1, { 
            duration: 300,
            easing: Easing.out(Easing.cubic),
        });
        textTranslateY.value = withTiming(0, { 
            duration: 300,
            easing: Easing.out(Easing.cubic),
        });
    }, [menuStack.length, translateX, textOpacity, textTranslateY]);

    const renderItem = useCallback(({ item, index }: { item: MenuItem; index: number }) => (
        <MenuItemComponent
            item={item}
            index={index}
            menuStack={menuStack}
            onPress={handleItemPress}
        />
    ), [handleItemPress, menuStack]);

    const listHeader = currentTitle ? (
        <MenuHeader
            title={currentTitle}
            onBack={handleBack}
            animatedStyle={animatedTextStyle}
        />
    ) : null;

    if (loading) {
        return <MenuStatus>Loading menu...</MenuStatus>;
    }

    if (error) {
        return <MenuStatus>Menu unavailable</MenuStatus>;
    }

    return (
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
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
    menuList: {
        paddingBottom: 24,
    },
});
