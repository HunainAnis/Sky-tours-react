import React from 'react';
import './App.css';
import Main from './mainComponent';

class App extends React.Component {
  state={
    starships:[],
    winner:'LUKE',
    loaded: false
  }
  componentDidMount() {
    fetch('https://swapi.dev/api/starships/')
      .then(response => {
        response.json()
        .then(result => {
          return this.setState({starships:result.results})
        })
        .then(()=>this.setState({loaded:true}))
      })
  }

render() {
  const { starships, winner, loaded } = this.state
  if(!loaded) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <Main starships={starships} winner={winner}  />
    </div>
  );
}
}

export default App;
