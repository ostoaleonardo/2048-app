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
        // let board = Array(ROWS).fill(0).map(() => Array(ROWS).fill(0))
        let board = [
            [0, 0, 0, 0],
            [0, 0, 0, 2],
            [0, 2, 0, 2],
            [16, 8, 4, 4],
        ]

        // board = addRandomNumber(addRandomNumber(board))
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

        let extraScore = 0

        const newBoard = board.map((row) => {
            const newRow = []

            // Filter and combine numbers
            for (let i = 0; i < row.length; i++) {
                if (row[i] !== 0) {
                    if (newRow.length > 0 && newRow[newRow.length - 1] === row[i]) {
                        // Combine equal numbers
                        newRow[newRow.length - 1] *= 2
                        // Add to score
                        extraScore += newRow[newRow.length - 1]
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
        checkBoardUpdate(newBoard, extraScore)
    }

    const moveRight = () => {
        console.log('moveRight')

        let extraScore = 0

        const newBoard = board.map((row) => {
            const newRow = []

            // Filter and combine numbers
            for (let i = row.length - 1; i >= 0; i--) {
                if (row[i] !== 0) {
                    if (newRow.length > 0 && newRow[newRow.length - 1] === row[i]) {
                        // Combine equal numbers
                        newRow[newRow.length - 1] *= 2
                        // Add to score
                        extraScore += newRow[newRow.length - 1]
                    } else {
                        newRow.push(row[i])
                    }
                }
            }

            // Fill the rest of the row with zeros
            while (newRow.length < ROWS) {
                newRow.push(0)
            }

            return newRow.reverse()
        })

        // Check if the board has changed
        checkBoardUpdate(newBoard, extraScore)
    }

    const moveUp = () => {
        console.log('moveUp')

        const newBoard = []
        let extraScore = 0

        const transposedBoard = board[0].map((_, columnIndex) => board.map(row => row[columnIndex]))

        transposedBoard.forEach((column) => {
            const newColumn = []
            let rowPointer = 0

            // Filter and combine numbers
            for (let i = 0; i < ROWS; i++) {
                if (column[i] !== 0) {
                    if (newColumn.length > 0 && newColumn[newColumn.length - 1] === column[i]) {
                        // Combine equal numbers
                        newColumn[newColumn.length - 1] *= 2
                        // Add to score
                        extraScore += newColumn[newColumn.length - 1]
                    } else {
                        newColumn.push(column[i])
                    }
                }
            }

            // Fill the rest of the column with zeros
            while (newColumn.length < ROWS) {
                newColumn.push(0)
            }

            // Update the original board with the transposed column
            for (let i = 0; i < ROWS; i++) {
                newBoard[i] = newBoard[i] || []
                newBoard[i].push(newColumn[rowPointer])
                rowPointer++
            }
        })

        // Check if the board has changed
        checkBoardUpdate(newBoard, extraScore)
    }

    const moveDown = () => {
        console.log('moveDown')

        const newBoard = []
        let extraScore = 0

        // Transpose the board
        const transposedBoard = board[0].map((_, columnIndex) => board.map(row => row[columnIndex]))

        transposedBoard.forEach((column) => {
            const newColumn = []
            let rowPointer = ROWS - 1

            // Filter and combine numbers
            for (let i = ROWS - 1; i >= 0; i--) {
                if (column[i] !== 0) {
                    if (newColumn.length > 0 && newColumn[newColumn.length - 1] === column[i]) {
                        // Combine equal numbers
                        newColumn[newColumn.length - 1] *= 2
                        // Add to score
                        extraScore += newColumn[newColumn.length - 1]
                    } else {
                        newColumn.push(column[i])
                    }
                }
            }

            // Fill the rest of the column with zeros
            while (newColumn.length < ROWS) {
                newColumn.push(0)
            }

            // Update the original board with the transposed column
            for (let i = 0; i < ROWS; i++) {
                newBoard[i] = newBoard[i] || []
                newBoard[i].push(newColumn[rowPointer])
                rowPointer--
            }
        })

        // Check if the board has changed
        checkBoardUpdate(newBoard, extraScore)
    }

    const checkBoardUpdate = (newBoard, extraScore) => {
        const isBoardChanged = JSON.stringify(board) !== JSON.stringify(newBoard)

        if (isBoardChanged) {
            const updatedBoard = addRandomNumber(newBoard)
            setBoard(updatedBoard)
            setScore(score + extraScore)
        }
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
