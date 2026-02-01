import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useNavigationStore } from '../store/navigationStore';
import { FONT_FAMILY_BOLD } from '../fonts/typography';
import { BRAND_COLOR } from '../utils/constans';
import { SafeAreaView } from "react-native-safe-area-context";

export default function WebViewScreen() {
    const navigation = useNavigation();
    const currentUrl = useNavigationStore((state) => state.currentUrl);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerTitle}>Börse Stuttgart</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu' as never)}
                    accessibilityRole="button"
                    accessibilityLabel="Open menu"
                    style={styles.menuButton}
                >
                    <View style={styles.menuIcon}>
                        <View style={styles.menuLine} />
                        <View style={[styles.menuLine, styles.menuLineMiddle]} />
                        <View style={styles.menuLine} />
                    </View>
                </TouchableOpacity>
            </View>
            <WebView
                source={{ uri: currentUrl }}
                userAgent="bsgapp"
                startInLoadingState
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#007AFF" size="large" />
                    </View>
                )}
                style={styles.webView}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BRAND_COLOR,
    },
    header: {
        height: 56,
        backgroundColor: BRAND_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    headerSpacer: {
        width: 44,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontFamily: FONT_FAMILY_BOLD,
        letterSpacing: 0.2,
    },
    menuButton: {
        width: 44,
        height: 44,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    menuIcon: {
        width: 22,
        height: 16,
        justifyContent: 'space-between',
    },
    menuLine: {
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 1,
    },
    menuLineMiddle: {
        opacity: 0.85,
    },
    webView: { flex: 1, backgroundColor: '#fff' },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
