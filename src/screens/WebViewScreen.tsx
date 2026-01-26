import { View, Text, StyleSheet } from 'react-native';

const BRAND_COLOR = 'rgb(100, 50, 250)';

export default function WebViewScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>WebView will be here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BRAND_COLOR,
    },
    text: {
        color: '#fff',
    },
});
