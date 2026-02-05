import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { FONT_FAMILY_SEMIBOLD, FONT_FAMILY_REGULAR } from '../../../../../fonts/typography';

interface MenuHeaderProps {
    title: string;
    onBack: () => void;
    animatedStyle: any;
}

export function MenuHeader({ title, onBack, animatedStyle }: MenuHeaderProps) {
    return (
        <Animated.View style={[styles.menuHeader, animatedStyle]}>
            <Text style={styles.menuHeaderTitle}>{title}</Text>
            <TouchableOpacity
                onPress={onBack}
                accessibilityRole="button"
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>
                    <Text style={styles.backArrow}>{'‹ '}</Text>
                    {'Zurück'}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
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
});
