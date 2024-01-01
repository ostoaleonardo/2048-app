import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Board } from '../../src/components/Board'
import { Tile } from '../../src/components/Tile'

export default function Game() {
    const [board, setBoard] = useState()
    const ROWS = 4

    useEffect(() => {
        initBoard()
    }, [])

    const initBoard = () => {
        let board = Array(ROWS).fill(0).map(() => Array(ROWS).fill(0))
        board = addRandomNumber(addRandomNumber(board))
        setBoard(board)
    }

    const addRandomNumber = (board) => {
        const emptyTiles = []

        board.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                if (value === 0) {
                    emptyTiles.push({ rowIndex, columnIndex })
                }
            })
        })

        const randomIndex = Math.floor(Math.random() * emptyTiles.length)
        const { rowIndex, columnIndex } = emptyTiles[randomIndex]

        const newBoard = board.map((row, rIndex) => {
            return row.map((value, cIndex) => {
                if (rIndex === rowIndex && cIndex === columnIndex) {
                    return Math.random() > 0.5 ? 2 : 4
                }
                return value
            })
        })

        return newBoard
    }

    return (
        <View style={styles.container}>
            <Board rows={ROWS}>
                {board && board.map((row, rowIndex) => {
                    return row.map((value, columnIndex) => {
                        return <Tile key={rowIndex + columnIndex} value={value} />
                    })
                })}
            </Board>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'white',
    },
})
