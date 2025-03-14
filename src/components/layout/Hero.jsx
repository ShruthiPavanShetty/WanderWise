import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { unsplashImages } from '../../service/GlobalAPI.service';
import Carousel from '../Carousel';

const Hero = () => {
  const[bgImages,setBgImages] = useState([]);
  const [cachedImages, setCachedImages] = useState({});//Since Unsplash URLs are dynamically generated, Cache Images Locally 

  useEffect(()=>{if(bgImages?.length === 0){fetchImages();}},[]);

  const fetchImages = async() =>{
    try{
      let imageList = await unsplashImages();
      setBgImages(imageList?.results);
       // Convert URLs to Blob and store in memory
       const imageCache = {};
       await Promise.all(
         imageList?.results?.map(async (image) => {
           const response = await fetch(image?.urls?.regular);
           const blob = await response?.blob();
           imageCache[image?.id] = URL.createObjectURL(blob);
         })
       );
       setCachedImages(imageCache);
    }catch(error){
      console.log(`Error fetching the images from unsplash : message - ${error}`);
    }
  }

  const mainContent = <div className='flex flex-col items-center mx-2 md:mx-5 lg:mx-36 md:my-0 lg:my-10'>
        <img src='/heroLogo3.png' alt='Wander-Wise-Logo'className='w-44 md:w-76 lg:w-76' />
        <div className='flex flex-col gap-4 items-center'>
          <h1 className='font-extrabold text-center text-[#16404D] text-[1.7rem] md:text-[2rem] lg:text-[3rem]'>Embark on Your Next Adventure with AI </h1>
          <h2 className='font-extrabold text-center text-[1rem] md:text-[1rem] lg:text-[2rem]'>A Personalized Itineraries just for You</h2>
          <p className='text-sm md:text-base lg:text-lg text-gray-700 text-center font-bold px-5 lg:px-70'>Your personalized travel planner and curator, crafting custom itineraries designed around your interests and budget.</p>
          <Link to={'/create-trip'}>
            <Button variant='contained' sx={{backgroundColor:'#DDA853', color:'#16404D', padding:'12px 26px', letterSpacing:'3px', fontSize:'0.85rem'}} className='pt-5' size='large' >Get started</Button>
          </Link>
        </div>
    </div>

  return (
    <div className='-pt-18'> 
    <Carousel
    autoSlide={true}
    autoSlideInterval={5000}
    includeActionBtns={false}
    fixedContent={mainContent}
    >
      {bgImages?.map(image=>{
       return  (
       <img key={image?.id} 
        src={cachedImages[image.id] || image.urls.regular} // Use cached blob URL
        alt={image?.alt_description} loading="eager" className='w-full h-screen object-none md:object-cover opacity-70' 
        />)
      })}
    </Carousel>
    </div>
  )
}

export default Hero;