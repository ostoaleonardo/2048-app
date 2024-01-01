import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export function Board({ children, rows }) {
    const [width, setWidth] = useState(0)

    const onLayoutHandler = (event) => {
        const { width } = event.nativeEvent.layout
        setWidth(width / rows)
    }

    return (
        <View style={styles.container} onLayout={onLayoutHandler}>
            {React.Children.map(children, child => {
                return React.cloneElement(child, { width: width })
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
})
