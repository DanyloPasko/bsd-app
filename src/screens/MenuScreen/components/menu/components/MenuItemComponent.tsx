import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR } from "../../../../../fonts/typography";
import { MenuItem } from "../../../../../api/menu/menu";

type MenuLevel = {
    title: string;
    items: MenuItem[];
};

interface MenuItemProps {
    item: MenuItem;
    index: number;
    menuStack: MenuLevel[];
    onPress: (item: MenuItem) => void;
}

export function MenuItemComponent({ item, index, menuStack, onPress }: MenuItemProps) {
    const itemOpacity = useSharedValue(0);
    const itemTranslateY = useSharedValue(8);

    useEffect(() => {
        const delay = index * 30;
        itemOpacity.value = withDelay(
            delay,
            withTiming(1, { 
                duration: 300,
                easing: Easing.out(Easing.cubic),
            })
        );
        itemTranslateY.value = withDelay(
            delay,
            withTiming(0, { 
                duration: 300,
                easing: Easing.out(Easing.cubic),
            })
        );
    }, [menuStack.length]);

    const itemAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: itemOpacity.value,
            transform: [{ translateY: itemTranslateY.value }],
        };
    });

    return (
        <Animated.View style={itemAnimatedStyle}>
            <TouchableOpacity
                onPress={() => onPress(item)}
                style={styles.menuItem}
                accessibilityRole="button"
            >
                <Text style={styles.menuLabel}>{item.title}</Text>
                {item.children.length > 0 ? (
                    <Text style={styles.menuArrow}>{'›'}</Text>
                ) : null}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
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
