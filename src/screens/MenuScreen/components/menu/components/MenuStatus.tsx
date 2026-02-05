import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { FONT_FAMILY_SEMIBOLD } from "../../../../../fonts/typography";

interface MenuStatusProps {
    children: string;
}

export function MenuStatus({ children }: MenuStatusProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(8);

    useEffect(() => {
        opacity.value = withTiming(1, { 
            duration: 300,
            easing: Easing.out(Easing.cubic),
        });
        translateY.value = withTiming(0, { 
            duration: 300,
            easing: Easing.out(Easing.cubic),
        });
    }, []);

    const animatedStatusStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <Animated.View style={animatedStatusStyle}>
            <Text style={styles.menuStatus}>{children}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    menuStatus: {
        color: '#fff',
        fontSize: 14,
        fontFamily: FONT_FAMILY_SEMIBOLD,
        paddingVertical: 8,
    },
});
