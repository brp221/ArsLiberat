import './App.css';
import React from "react";
import Home from './components/Home';
import MinionOrder from './components/MinionOrder'
import Explorer from './components/Explorer'
import Card__NFT from './components/Card__NFT'
import Card__Collection from './components/Card__Collection'

// import List from './components/List';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/order-alert/" element={<MinionOrder/>}/>
          <Route path="/explore" element={<Explorer/>}/>
          <Route path="/art/:collection_id/:token_id" element={<Card__NFT/>}/>
          <Route path="/art/:collection_id/" element={<Card__Collection/>}/>
          {/* <Route path="/login" element={<Login/>}
          <Route path="/profile" element={<Profile/>}
          } */}
        </Routes>
      </BrowserRouter>
  );
}
export default App;
