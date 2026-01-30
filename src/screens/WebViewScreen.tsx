import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigationStore } from '../store/navigationStore';

export default function WebViewScreen() {
    const currentUrl = useNavigationStore((state) => state.currentUrl);

    return (
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
    );
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
