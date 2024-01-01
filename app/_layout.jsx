import { Stack } from 'expo-router'

export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,

                headerStyle: {
                    backgroundColor: 'white',
                },

                navigationBarHidden: true,
                statusBarHidden: true,
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name='game'
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}
