import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Products from './components/pages/products';
import Menu from './components/pages/menu_aux';
import Settings from './components/pages/settings';

//includes
import './Assets/css/default.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      air_temp: 21,
      actual_air_temp: 21,
      seat_temp: 24,
      actual_seat_temp: 24,
      volume: 50,
      isPlate: false,
      waitress: 'hidden',
      sidebar_layout: 'visible',
      normal_layout: 'hidden',
    }
  }

  upMyState(newState){
    this.setState(newState);
  }

  getMyState(){
    return this.state;
  }

  updateTemps(){
    console.log(this.state);
    while(this.state.air_temp != this.state.actual_air_temp 
      || this.state.seat_temp != this.state.actual_seat_temp){
      if(this.state.air_temp != this.state.actual_air_temp){
        console.log("oi");
        let diff = this.state.air_temp - this.state.actual_air_temp;
        console.log(diff);
        if(diff > 0){
          this.state.actual_air_temp++
          setTimeout(() => this.upMyState(this.state), 8000);
        }
        else if(diff < 0){
          this.state.actual_air_temp--
          setTimeout(() => this.upMyState(this.state), 8000);
        }
      }
      if(this.state.seat_temp != this.state.actual_seat_temp){
        let diff = this.state.seat_temp - this.state.actual_seat_temp;
        if(diff > 0){
          this.state.actual_seat_temp++
          setTimeout(() => this.upMyState(this.state), 8000);
        }
        else if(diff < 0){
          this.state.actual_seat_temp--
          setTimeout(() => this.upMyState(this.state), 8000);
        }   
      }
    }
  }

  render(){
      return (
        <Router>
        <div className="App">

          <Header generalState={this.state} updateMyState={this.upMyState.bind(this)}/>

            <Route exact path='/' render={(props) => <Homepage {...props} upMyState={this.upMyState.bind(this)} 
                  getMyState={this.getMyState.bind(this)}/>}/>
            <Route exact path='/Menu' render={(props) => <Menu {...props} upMyState={this.upMyState.bind(this)} 
                  getMyState={this.getMyState.bind(this)}/>}/>
            <Route exact path='/Settings' render={(props) => <Settings {...props} upMyState={this.upMyState.bind(this)} 
                  getMyState={this.getMyState.bind(this)} updateTemps={this.updateTemps.bind(this)}/>} />

          <Footer />

        </div>
        </Router>
    );
  }
}

export default App;
