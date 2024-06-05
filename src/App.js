
import './App.css';
import './Styles.css';
import { useState } from 'react';


// init

function calculateWinner(square) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for(let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i];

        if (square[a] === square[b] && square[a] === square[c]) {
            if (square[a] == null) {
                return null
            } else {
                if (square[a] != undefined) {
                    return square[a];
                } else {
                    return null
                }
            }
        } 
    }
    return null
}


function Square({value, closureHandleClick}) {   
    return <button className='tombol1' onClick={closureHandleClick}>{value}</button>
}

let DebugState = ({data}) => {
    return <h1>{data}</h1>
}

function Board({ xIsNext, squares, onPlay }) {
    // const [xIsNext, setXIsNext] = useState(true)
    // const [squares, setSquares] = useState(Array(9).fill(null))

    let winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "winner " + winner
    } else {

        status = "next " + ((xIsNext) ? "x" : "o")
    }

    function HandleClick(i) {
        if (squares[i]) {
            // console.log(typeof squares[i])
            return;
        }
        const nextSquares = squares.slice()
        
        if (xIsNext) {
            nextSquares[i] = "x";
        } else {
            nextSquares[i] = "0";
        }

        // setSquares(nextSquares)
        // setXIsNext(!xIsNext)
        onPlay(nextSquares)

        
    }

    return (
        <>
            <div className='box'>
                <div>
                    <DebugState data={status}/>
                </div>

                <div className='row'>
                    <Square value={squares[0]} closureHandleClick={() => HandleClick(0)}/>
                    <Square value={squares[1]} closureHandleClick={() => HandleClick(1)}/>
                    <Square value={squares[2]} closureHandleClick={() => HandleClick(2)}/>
                    <Square value={squares[3]} closureHandleClick={() => HandleClick(3)}/>
                    <Square value={squares[4]} closureHandleClick={() => HandleClick(4)}/>
                    <Square value={squares[5]} closureHandleClick={() => HandleClick(5)}/>
                    <Square value={squares[6]} closureHandleClick={() => HandleClick(6)}/>
                    <Square value={squares[7]} closureHandleClick={() => HandleClick(7)}/>
                    <Square value={squares[8]} closureHandleClick={() => HandleClick(8)}/>
                </div>
                
            </div>
        </>
    );
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true)
    const [currentMove, setCurrentMove] = useState(0)

    const [history, setHistory] = useState([Array(9).fill(null)])

    let currentSquares = history[currentMove]

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        // setHistory([...history, nextSquares])
        setXIsNext(!xIsNext)
    }
    
    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
        setXIsNext(nextMove % 2 === 0)
    }

    const moves = history.map((squares, move) => {
        let desc;
        if (move) {
            desc = "goto move #" + move;
        } else {
            desc = "goto game start"
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    return (
        <>
            <h1>simple soyuz tictactoe</h1>
            <div className='game'>
            
                <div className='gameboard'>
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                </div>
                <div className='gameinfo'>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        </>
        
    );
}