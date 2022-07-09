import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Theme } from '../../Theme';

export const AppLoader = () => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size={'large'} color={Theme.MAIN_COLOR} />
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
