import React from 'react';
import Axios from "axios";
import './index.css';

export default class App extends React.Component{
  constructor(props){
      super(props);

      this.getStatesData = this.getStatesData.bind(this);
  }

  state = {
      confirmed :0,
      cured: 0,
      death: 0,
      total: 0,
      states: []
  };


  componentDidMount(){
      this.getData();

  }

  async getData(){
      const resStates = await Axios.get("http://covid19-india-adhikansh.herokuapp.com/states");
      const states = [];
      for(var i = 0; i < resStates.data.state.length; i++){
          states.push(resStates.data.state[i].name);
      }
      const res = await Axios.get(`http://covid19-india-adhikansh.herokuapp.com/state/${states[0]}`);
      //const countries = Object.keys(resCountries.data.countries);
      this.setState({
        confirmed:res.data.data[0].confirmed,
        cured:res.data.data[0].cured,
        death:res.data.data[0].death,
        total:res.data.data[0].total,
          states
      });
  }

  async getStatesData(e){
      if(e.target.value === null) {
          return this.getData();     
      }
      
      try{
      const res = await Axios.get(`http://covid19-india-adhikansh.herokuapp.com/state/${e.target.value}`);
      this.setState({
          confirmed:res.data.data[0].confirmed,
          cured:res.data.data[0].cured,
          death:res.data.data[0].death,
          total:res.data.data[0].total,
      });
  }
  catch(err){
      if(err.response.status===404)
      this.setState({
          confirmed:"No data available..",
          cured:"No data available..",
          death:"No data available..",
          total:"No data available..",
      });
  }
  }

  renderStatesOptions(){
      return this.state.states.map(( state, j) =>{
      return <option key={j}>{ state }</option>
      });

  }

  render(){
      return (
      <div className="container">
          <h1>Covid-19 Indian States Tracker</h1>

          <select className="dropdown" onChange={this.getStatesData}>
              {this.renderStatesOptions()}
          </select>




          <div className="flex">

          <div className="box confirmed">
              <h3>Confirmed Cases</h3>
              <h4>{this.state.confirmed}</h4>
          </div>
          <div className="box recovered">
              <h3>Recovered Cases</h3>
              <h4>{this.state.cured}</h4>
          </div>
          <div className="box deaths">
              <h3>Deaths</h3>
              <h4>{this.state.death}</h4>
          </div>
          <div className="box total">
              <h3>Total</h3>
              <h4>{this.state.total}</h4>
          </div>
          </div>
          
      </div>);
  }
}