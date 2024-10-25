import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Auth from './Pages/Auth';
import Games from './Components/Admin/Games';
import AddGames from './Components/Admin/AddGames';
import EditGames from './Components/Admin/EditGames';
import ViewGames from './Components/Admin/ViewGames';
import Categories from './Pages/Categories';
import Game from './Components/User/Game';
import Library from './Pages/Library';
import Wishlist from './Pages/Wishlist';
function App() {
  return (
    <div className="App">
      <Routes basename="/tothepoint_login">
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth register/>}></Route>
        <Route path='/games' element={<Games/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/game/:id' element={<Game/>}></Route>
        <Route path='/library' element={<Library />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        <Route path='/add-games' element={<AddGames/>}></Route>
        <Route path='/games/edit-games/:_id' element={<EditGames />}></Route>
        <Route path='/update-user/:_id' element={<updateUser />}></Route>
        <Route path='/games/view-games/:_id' element={<ViewGames />}></Route>
      </Routes>
    </div>
  );
}

export default App;
