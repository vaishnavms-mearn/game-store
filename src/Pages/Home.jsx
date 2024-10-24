import React from 'react'
import Banner from '../Components/User/Banner'
import Header from '../Components/User/Header'
import Footer from '../Components/User/Footer'
import Discounts from '../Components/User/Discounts'
import Trending from '../Components/User/Trending'
import Free from '../Components/User/Free'
import HighRated from '../Components/User/HighRated'

function Home() {
  return (
    <div className='' style={{ backgroundColor: '#121212' }}>
      <Header/>
        <Banner />
        <Discounts/>
        <Free/>
        <Trending/>
        <HighRated/>
      <Footer/>
    </div>
  )
}

export default Home