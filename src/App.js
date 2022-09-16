import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AddProduct from './components/AddProduct';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Automotriz from './components/Automotriz';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Inmuebles from './components/Inmuebles';
import Otros from './components/Otros';
import Perfil from './components/Perfil';
import Ropa from './components/Ropa';
import Navbar from './components/statics/Navbar';
import Tecnologia from './components/Tecnologia';
import Welcome from './components/Welcome';

class App extends Component {
  render(){
  return (

    <Router>
      <header className="App-header">
        <Navbar/>
      </header>
        <Switch>
        
          <Route path='/' exact={true} component={Home}/>
          <Route path='/home' exact={true} component={Home}/>
          <Route path='/tecnologia' exact={true} component={Tecnologia}/>
          <Route path='/inmuebles' exact={true} component={Inmuebles}/>
          <Route path='/automotriz' exact={true} component={Automotriz}/>
          <Route path='/ropa' exact={true} component={Ropa}/>
          <Route path='/otros' exact={true} component={Otros}/>
          <Route path='/profile/:noteId' component={Perfil}/>
          <Route path='/welcome' exact={true} component={Welcome}/>
          <Route path='/addproduct' exact={true} component={AddProduct}/>
          <Route path='/signin' exact={true} component={Login}/>
          <Route path='/dashboard' exact={true} component={Dashboard}/>
          <Route path='/signup' exact={true} component={Register}/>  
        </Switch>
      </Router>
    )
  }
}
export default App;
