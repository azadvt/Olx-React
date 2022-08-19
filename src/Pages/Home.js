import React from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Products from '../Components/Products/Products';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Products />
      <Footer />
    </div>
  );
}

export default Home;
 
