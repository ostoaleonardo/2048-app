import { StyleSheet, Text, View } from 'react-native'
import { getColor } from '../utils/getColor'

export function Tile({ value, width }) {
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: width,
            aspectRatio: 1,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            backgroundColor: getColor(value),
        },
        text: {
            fontSize: 24,
            color: 'black',
            textAlign: 'center',
        },
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {value > 0 ? value : ''}
            </Text>
        </View>
    )
}
