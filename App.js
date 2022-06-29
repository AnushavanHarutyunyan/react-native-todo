import { Alert, StyleSheet, View } from 'react-native';
import { MainLayout } from './src/components/MainLayout';
import { TodoState } from './src/context/todo/todoState';
import { ScreenState } from './src/context/screen/screenState';

export default function App() {
    return (
        <ScreenState>
            <TodoState>
                <MainLayout />
            </TodoState>
        </ScreenState>
    );
}

const styles = StyleSheet.create({});
