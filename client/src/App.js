import {BrowserRouter as Router,Routes,Route}from 'react-router-dom';
import './App.css';
import { Navbar } from './components/navbar';
import { CreateRecipes } from './pages/create-recipes';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { SavedRecipes } from './pages/saved-recipes';
import { Search } from './pages/search';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create-recipe" element={<CreateRecipes/>}/>
          <Route path="/saved-recipes" element={<SavedRecipes/>}/>
          <Route path='/search' element={<Search/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
