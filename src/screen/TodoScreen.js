import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppCard } from '../components/ui/AppCard';
import { EditModal } from '../components/ui/EditModal';
import { AppButton } from '../components/ui/AppButton';
import { Theme } from '../Theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';

export const TodoScreen = () => {
    const [modal, setModal] = useState(false);
    const { uppdateTitle, removeTodo, todos, loading } =
        useContext(TodoContext);
    const { todoId, changeScreen } = useContext(ScreenContext);

    const todo = todos.find((todo) => todo.id === todoId);

    const saveHandler = (title) => {
        uppdateTitle(title, todo.id);
        setModal(false);
    };

    if (loading) {
        return <AppLoader />;
    }

    return (
        <View>
            <EditModal
                visible={modal}
                onClose={() => setModal(false)}
                todo={todo}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <Text style={styles.text}>{todo.title}</Text>
                <Feather
                    name="edit"
                    size={24}
                    color="black"
                    onPress={() => setModal(true)}
                />
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton
                        onPress={() => changeScreen(null)}
                        color={Theme.GREY_COLOR}
                    >
                        Back to Main
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Remove Todo"
                        onPress={() => removeTodo(todo.id)}
                        color={Theme.DANGER_COLOR}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: Dimensions.get('window').width / 3,
    },
    card: {
        marginBottom: 20,
    },
    text: {
        color: '#000',
        fontSize: 23,
        textAlign: 'center',
        marginBottom: 5,
        // fontFamily: 'Roboto-Bold',
    },
});
