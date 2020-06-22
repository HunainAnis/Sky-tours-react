import React from 'react';
import './App.css';
import Background from './assets/images/image--003.jpg'
import { PlayerTiles } from './playerTiles';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            rounds:[]
        }
    }
    
    selectShips() {
    const { starships } = this.props
        const withSpeed = starships.filter(i=>i.max_atmosphering_speed !== 'n/a')
        const randomShip1 = withSpeed[Math.floor(Math.random() * withSpeed.length)]
        const randomShip2 = withSpeed[Math.floor(Math.random() * withSpeed.length)]
        return {
            han: randomShip1,
            luke: randomShip2
        }
    }

    createRounds(i) {
        const { han, luke } = this.selectShips()
        return {
            roundNumber:i,
            han: {
                name:han.name,
                speed:han.max_atmosphering_speed
            },
            luke: {
                name:luke.name,
                speed:luke.max_atmosphering_speed
            }
        }
    }
    setRounds() {
        for (let index = 0; this.state.rounds.length < 3; index++) {
            this.state.rounds.push(this.createRounds(index+1))        
        }
    }
    checkWinner() {
        let luke
        let han
        this.state.rounds.map(round=> {
            luke = luke + round.luke.speed
            return han = han + round.hand.speed
        })
    }

render() {
    this.setRounds()
    const { starships, winner } = this.props
    console.log(this.state.rounds)
   starships.length !== 0 && console.log(this.selectShips())
  return (
    <div style={{ height:600, backgroundRepeat:'no-repeat', backgroundPosition:'center' , backgroundImage:`url('${Background}')`}}>
      <div className='container'>
        {this.state.winner !== null && <h1 style={{color:'white', textAlign:'center'}}>Winner: {winner}</h1>}
        <div className='row'>
          <div className='col col-sm-4'>
            <PlayerTiles rounds={this.state.rounds} player='luke' />
          </div>
          <div className='col col-sm-4'>
          </div>
          <div className='col col-sm-4'>
            <PlayerTiles rounds={this.state.rounds} player='han' />
          </div>
        </div>
        <div className='row'>
          <div className='col col-sm-4 offset-4'>
            <button className='btn-lg btn-success'>New Game</button>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Main;
