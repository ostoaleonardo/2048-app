import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { Board } from '../../src/components/Board'
import { Tile } from '../../src/components/Tile'

export default function Game() {
    const [board, setBoard] = useState()
    const [score, setScore] = useState(0)
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

    const moveLeft = () => {
        console.log('moveLeft')

        const newBoard = board.map((row) => {
            const newRow = []
            let score = 0

            // Filter and combine numbers
            for (let i = 0; i < row.length; i++) {
                if (row[i] !== 0) {
                    if (newRow.length > 0 && newRow[newRow.length - 1] === row[i]) {
                        // Combine equal numbers
                        newRow[newRow.length - 1] *= 2
                        // Add to score
                        score += newRow[newRow.length - 1]
                    } else {
                        newRow.push(row[i])
                    }
                }
            }

            // Fill the rest of the row with zeros
            while (newRow.length < ROWS) {
                newRow.push(0)
            }

            return newRow
        })

        // Check if the board has changed
        const isBoardChanged = JSON.stringify(board) !== JSON.stringify(newBoard)

        // Add a random number if the board has changed
        if (isBoardChanged) {
            const updatedBoard = addRandomNumber(newBoard)
            setBoard(updatedBoard)
            setScore(score)
        }
    }

    const moveRight = () => {
        console.log('moveRight')
    }

    const moveUp = () => {
        console.log('moveUp')
    }

    const moveDown = () => {
        console.log('moveDown')
    }

    const panGesture = Gesture.Pan()
        .onEnd(({ translationX, translationY }) => {
            if (translationX > 0 && translationX > translationY) {
                runOnJS(moveRight)()
            } else if (translationX < 0 && translationX < translationY) {
                runOnJS(moveLeft)()
            } else if (translationY > 0 && translationY > translationX) {
                runOnJS(moveDown)()
            } else {
                runOnJS(moveUp)()
            }
        })


    return (
        <View style={styles.container}>
            <Text style={styles.score}>Score: {score}</Text>
            <GestureDetector gesture={panGesture}>
                <Board rows={ROWS}>
                    {board && board.map((row, rowIndex) => {
                        return row.map((value, columnIndex) => {
                            return <Tile key={rowIndex + columnIndex} value={value} />
                        })
                    })}
                </Board>
            </GestureDetector>
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
    score: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
    }
})
