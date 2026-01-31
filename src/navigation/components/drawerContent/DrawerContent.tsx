import { useCallback } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import DrawerHeader from './components/DrawerHeader';
import DrawerMenu from './components/DrawerMenu';
import { BRAND_COLOR } from '../../../utils/constans';

export default function DrawerContent({ navigation }: DrawerContentComponentProps) {
    const closeDrawer = useCallback(() => {
        navigation.closeDrawer();
    }, [navigation]);

    return (
        <View style={styles.drawerContent}>
            <DrawerHeader onClose={closeDrawer} />
            <DrawerMenu onClose={closeDrawer} />
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        paddingTop: 40,
        backgroundColor: BRAND_COLOR,
        flex: 1,
        paddingHorizontal: 16,
    },
});
