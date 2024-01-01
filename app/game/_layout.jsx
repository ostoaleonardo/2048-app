import { Stack } from 'expo-router'

export default function GameLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,

                headerStyle: {
                    backgroundColor: 'white',
                },

                headerTitleStyle: {
                    fontSize: 24,
                },
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    headerTitle: '2048',
                }}
            />
        </Stack>
    )
}
