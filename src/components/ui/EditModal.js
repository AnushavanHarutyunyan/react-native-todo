import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../Theme';

export const EditModal = ({ visible, onClose, todo, onSave }) => {
    const [title, setTitle] = useState(todo.title);

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error', 'Error min length');
        } else {
            onSave(title);
        }
    };
    const handleCancel = () => {
        setTitle(todo.title);
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={false} visible={visible}>
            <View style={styles.wrap}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.buttons}>
                    <Button
                        title="Cancel"
                        onPress={handleCancel}
                        color={Theme.GREY_COLOR}
                    />
                    <Button
                        title="Edit"
                        onPress={saveHandler}
                        color={Theme.DANGER_COLOR}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: Theme.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%',
    },
    buttons: {
        width: '100%',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
