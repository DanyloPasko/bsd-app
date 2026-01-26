import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigationStore } from '../store/navigationStore';

function WebViewScreenBase() {
    const currentUrl = useNavigationStore((state) => state.currentUrl);
    const webViewSource = useMemo(() => ({ uri: currentUrl }), [currentUrl]);

    return (
        <WebView
            source={webViewSource}
            userAgent="bsgapp"
            style={styles.webView}
        />
    );
}

const WebViewScreen = memo(WebViewScreenBase);

export default WebViewScreen;

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    },
});
