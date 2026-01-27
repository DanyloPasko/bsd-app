import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DrawerHeaderProps = {
    onClose: () => void;
};

export default function DrawerHeader({ onClose }: DrawerHeaderProps) {
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

const styles = StyleSheet.create({
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
});
