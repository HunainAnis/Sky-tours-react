import React from 'react';
import './App.css';
import Background from './assets/images/image--003.jpg'
import { PlayerTiles } from './playerTiles';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            rounds:[],
            number:0,
            winner:null
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
    buttonUpdate() {
      switch(this.state.number) {
        case 0:
          return 'New Game'
        case 1:
          return 'Go to Round 2'
        case 2:
          return 'Go to Round 3'
        case 3:
          return 'Finish'

        default:
          return 'Restart'
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
      const { rounds, number } = this.state
        this.setState({rounds:[...rounds, this.createRounds(rounds.length + 1) ], number:number+1})
        // for (let index = 0; this.state.rounds.length < 3; index++) {
        //     this.state.rounds.push(this.createRounds(index+1))        
        // }
    }
    checkWinner() {
      const { rounds } = this.state
      let scoreOfHan = 0
      let scoreOfLuke = 0
      rounds.map(i=>scoreOfHan += parseInt(i.han.speed))
      rounds.map(i=>scoreOfLuke += parseInt(i.luke.speed))
      console.log('Han',scoreOfHan, 'Luke',scoreOfLuke)
      return scoreOfLuke > scoreOfHan ? 'Luke':'Han'
    }
    gameStart() {
      if(this.state.number !== 3) {
          this.setRounds()
      }else{
        this.setState({winner:this.checkWinner()})
      }
    }
    restartGame() {
      if(this.state.winner !== null ) {
        this.setState({
          rounds:[],
          number:0,
          winner:null
        })
      }
    }
render() {
    // console.log(this.state.rounds)
  //  starships.length !== 0 && console.log(this.selectShips())
  return (
    <div style={{ height:600, backgroundRepeat:'no-repeat', backgroundPosition:'center' , backgroundImage:`url('${Background}')`}}>
      <div className='container'>
        <div style={{height:50}}></div>
        {this.state.winner !== null && <h1 style={{color:'white', textAlign:'center'}}>Winner: {this.state.winner}</h1>}
        <div className='row'>
          <div className='col col-sm-4'>
            <PlayerTiles rounds={this.state.rounds} player='luke' />
          </div>
          <div className='col col-sm-4'>
            <button onClick={()=>this.gameStart()} className='btn-lg btn-success'>{this.buttonUpdate()}</button>
            {
              this.state.winner !== null
              &&
              <button onClick={()=>this.restartGame()} className='btn-lg btn-success'>Restart</button>
            }
          </div>
          <div className='col col-sm-4'>
            <PlayerTiles rounds={this.state.rounds} player='han' />
          </div>
        </div>
        <div className='row'>
          <div className='col col-sm-4 offset-4'>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Main;
