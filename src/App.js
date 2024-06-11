import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "./custom.css"
import { useState } from 'react';
import swal from 'sweetalert';

function gen_rand_data() {
    let operations = ["-", "+", "/", "x"]
    let int1 = Math.floor(Math.random() * 10); 
    let int2 = Math.floor(Math.random() * 10); 
    let op = operations[Math.floor(Math.random() * 4)]
    return [op, int1, int2]
}

const generate_random_question = () => {
    let data = gen_rand_data()
    let [op, int1, int2] = data
    let predicted = null;
    

    // predict
    switch(op) {
        case "-":
            predicted = int1 - int2
            break;
        case "+":
            predicted = int1 + int2
            break;
        case "/":
            predicted = int1 / int2
            break;
        case "x":
            predicted = int1 * int2
            break;
        default:
          // code block
    } 

    return [op, int1, int2, predicted]
    
}

const reset = ({refreshset}) => {
    refreshset(Math.random());
}

const Input = ({predicted, rightset, wrongset, right, wrong, refreshset}) => {
    const [value, valueset] = useState(0)
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log('do validate ' + value)
        if (predicted == value) {
            let x = right + 1
            rightset(x)
            // alert("tul")
            reset({refreshset})

        } else {
            let x = wrong + 1
            wrongset(x)
            swal({
                title: "Ups!",
                text: "Coba lagi.",
                type: "success",
                timer: 1500
                });
            reset({refreshset})
           
        }
        
      }
    }
    return <input 
        type="text" 
        className="form-control " 
        onKeyDown={handleKeyDown} 
        onChange={e => valueset(e.target.value)} 
        placeholder='...' autofocus="true"></input>
}

const GameCard = ({op, int1, int2, predicted, rightset, wrongset, right, wrong, refreshset}) => {
    return (
        <>
            <div className='row mt-5'>
                <div className='col-1'>

                </div>
                <div className='col-10'>
                    {/* <CardSoal op={op} int1={int1} int2={int2}/> */}
                    <div className="card">
                        <div className="card-body bg-primary">
                            <div className='row display-3'>
                                <div className='col-2'>
                                    {int1}
                                </div>
                                <div className='col-2'>
                                    {op}
                                </div>
                                <div className='col-2'>
                                    {int2}
                                </div>
                                <div className='col-2'>
                                    =
                                </div>
                                <div className='col-4 my-auto'>
                                    <div className="input-group input-group-lg ">
                                        <Input predicted={predicted} rightset={rightset} wrongset={wrongset} right={right} wrong={wrong} refreshset={refreshset}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className='col-1'>
                </div>
            </div>
        </>
    )
}

const GameStatistics = ({right, wrong}) => {
    return (
        <>
            <div className='row mt-1'>
                <div className='col-1'>

                </div>

                <div className='col-5'>
                    <div class="card bg-secondary">
                        <div class="card-body">
                            {right}
                        </div>
                    </div>
                </div>

                <div className='col-5'>
                    <div class="card bg-danger">
                        <div class="card-body">
                            {wrong}
                        </div>
                    </div>
                </div>
                
                <div className='col-1'>

                </div>
            </div>
        </>
    )
}


const generatesoal = () => {
    let [op, int1, int2, predicted] = [0,0,0,0]
    do {
        [op, int1, int2, predicted] = generate_random_question()
    } while (!Number.isInteger(predicted))

    return [op, int1, int2, predicted]
}

const Game = () => {
    let [op, int1, int2, predicted] = generatesoal()

    const [wrong, wrongset] = useState(0)
    const [right, rightset] = useState(0)
    const [refresh, refreshset] = useState(0)
    return (
        <>
            <div className='min-vh-100'>
                <GameCard op={op} int1={int1} int2={int2} predicted={predicted} rightset={rightset} wrongset={wrongset} right={right} wrong={wrong} refreshset={refreshset} key={refresh}/>
                <GameStatistics right={right} wrong={wrong}/>
            </div>
        </>
    )
}

export default Game;