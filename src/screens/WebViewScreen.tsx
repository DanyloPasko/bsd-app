import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigationStore } from '../store/navigationStore';

export default function WebViewScreen() {
    const currentUrl = useNavigationStore((state) => state.currentUrl);

    return (
        <WebView
            source={{ uri: currentUrl }}
            userAgent="bsgapp"
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
});
