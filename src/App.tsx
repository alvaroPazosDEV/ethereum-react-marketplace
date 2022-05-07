import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'layouts/Navbar';
import Home from 'pages/Home';
import Collection from 'pages/Collection';
import CreateToken from 'pages/CreateToken';
import WalletSidebar from 'layouts/WalletSidebar';
import { useAppSelector } from 'context/hooks';
import LoadingModal from 'layouts/LoadingModal';
import SellToken from 'pages/SellToken';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const loading = useAppSelector((state) => state.loading);

  return (
    <BrowserRouter>
      <Navbar onClickWallet={() => setShowSidebar(!showSidebar)} />
      <WalletSidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      {loading.show && <LoadingModal message={loading.message} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-collection" element={<Collection />} />
        <Route path="/my-collection/sell" element={<SellToken />} />
        <Route path="/create-token" element={<CreateToken />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
