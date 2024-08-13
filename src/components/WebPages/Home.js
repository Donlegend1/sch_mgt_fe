import React from 'react';
import HomeCarousel from '../Scn-WebComponents/HomeCarousel';
import About from '../Scn-WebComponents/About';
import Features from "../Scn-WebComponents/Features";
import Team from '../Scn-WebComponents/Team';
import Testimonial from '../Scn-WebComponents/Testimonial';
import BlogList from '../Scn-WebComponents/BlogList';
import Partners from '../Scn-WebComponents/Partners';

const Home = () => {
    return (
      <>
        <HomeCarousel />
        <About />
        <Features />

        {/* <Team /> */}
        <Partners />
        <BlogList />
      </>
    );
}

export default Home;
