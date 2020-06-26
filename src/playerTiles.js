import React from 'react'
import Ship from './assets/images/image--001.jpg'

export const PlayerTiles = ({ player, rounds }) => {
    // const setShips = (ship) => {
    //     return setRounds(rounds.concat(ship))
    // }
    // rounds.length !== 3 && setShips(ships)
    // console.log(ships.name)
    const eachRound = (round) => {
        return (
            <div key={round.roundNumber}>
                <h6 style={{color:'white'}}>Round {round.roundNumber}: {round[player].name} - {round[player].speed}</h6>
            </div>
        )
    }
    return(
        <div className='container'>
            <div className='row'>
                {
                rounds.map(round=>(
                        eachRound(round)
                    ))
                }
            </div>
            <img style={{display:'block'}} src={Ship} width='150px' alt='ship avatar' />
            <h3 style={{color:'white'}}>{player}</h3>
        </div>
    )
}