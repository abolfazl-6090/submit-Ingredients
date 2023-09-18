import React, { useContext } from 'react';
import Auth from './components/Auth';
import { AuthContext } from './auth-context/auth-context';
import Ingredients from './components/Ingredients/Ingredients';

const App = props => {

  const {isAuth}=useContext(AuthContext)


  return isAuth ? <Ingredients/> : <Auth/> ;
};

export default App;
