import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

export default function App() {
    const goGame = () => {
        router.push('/game')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                2048
            </Text>
            <Pressable onPress={goGame} style={styles.button}>
                <Text>Start Game</Text>
            </Pressable>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 36,
        marginBottom: 20,
    },
    button: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
    },
})
