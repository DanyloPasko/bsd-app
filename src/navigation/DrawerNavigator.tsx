import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import WebViewScreen from '../screens/WebViewScreen';

const Drawer = createDrawerNavigator();
const BRAND_COLOR = 'rgb(100, 50, 250)';

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerPosition: 'right',
                headerStyle: { backgroundColor: BRAND_COLOR },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' },
                headerTitleAlign: 'center',
                drawerStyle: { backgroundColor: BRAND_COLOR, width: '100%' },
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#fff',
            }}
            drawerContent={(props) => (
                <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
                    <View style={styles.drawerHeader}>
                        <Text style={styles.drawerTitle}>Börse{'\n'}Stuttgart</Text>
                        <TouchableOpacity
                            onPress={() => props.navigation.closeDrawer()}
                            accessibilityRole="button"
                            accessibilityLabel="Close menu"
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen
                name="Home"
                component={WebViewScreen}
                options={{
                    title: 'Börse Stuttgart',
                    drawerLabel: () => null,
                    drawerItemStyle: { height: 0 },
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        paddingTop: 32,
        backgroundColor: BRAND_COLOR,
        flex: 1,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
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
        lineHeight: 34,
    },
});
