import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Rating } from '@mui/material'
import TripInfoShimmer from '../components/shimmer/TripInfoShimmer'
import { useCacheAPI } from '../service/CacheAPI'
import { FaArrowLeft } from 'react-icons/fa'

const TripInfo = ({trip}) => {
    const navigate = useNavigate();
    const {fetchAPIWithCache} = useCacheAPI();
    useEffect(()=>{
        getPlacePhotos();
    },[trip])
    
    const [images,setImages] = useState({
        mainPlace:'',
        hotel:[]
    });

   /**
    * The function `getPlacePhotos` retrieves and sets images for the main place and hotels in a trip
    * using async/await and Promise.all.
    */
    const getPlacePhotos = async() =>{
        try{
            const mainPlaceName = trip?.userPreference?.location?.display_name;
            const hotels = trip?.tripData?.travelPlan?.hotels;
            const mainPlaceImage = await fetchAPIWithCache(mainPlaceName);
            const hotelImages = await Promise.all(hotels?.map(async(hotel) => await fetchAPIWithCache(hotel?.name) ));
            setImages( ({mainPlace:mainPlaceImage ,hotel:hotelImages }))
        }catch(error){
            console.log(`Error fetching destination image and hotel image : message - ${error}`)
        }
    }

  return (
 <>{images.mainPlace && images.hotel ? 
    <div className='relative'>
        <span className='absolute -top-10 md:top-0 md:-left-12 lg:-left-28 p-1 md:p-2 border border-[#DDA853] text-[#DDA853] hover:bg-[#DDA853] hover:text-[#16404D] duration-500 hover:scale-110 cursor-pointer rounded-[50%]' onClick={()=> navigate(-1)}><FaArrowLeft size={24} className='size-4.5' /></span>
        <div>
            <img src={images.mainPlace} alt={`${trip?.userPreference?.location?.display_name}-image`} className='h-[300px] md:h-[380px] w-full object-cover'/>
            <div className='lgmy-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl md:text-4xl'>{trip?.userPreference?.location?.display_name}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-[#DDA853] rounded-full text-[#16404D] text-xs md:text-base font-medium'>{trip?.userPreference?.days} Day</h2>
                    <h2 className='p-1 px-3 bg-[#DDA853] rounded-full text-[#16404D] text-xs md:text-base font-medium'>{trip?.userPreference?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-[#DDA853] rounded-full text-[#16404D] text-xs md:text-base font-medium'>{trip?.userPreference?.traveles} Traveles</h2>
                </div>
            </div>
        </div>
        {/* Hotels */}
        <div>
            <h2 className='font-bold text-xl md:text-2xl my-5'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>{trip?.tripData?.travelPlan?.hotels?.map((hotel, index)=>{
                return(
                <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`} target="_blank" key={index}>
                    <div className='hover:scale-110 transition-all cursor-pointer'>
                        <img src={images?.hotel[index]} alt={`hotel-${hotel?.name}-image`} className='rounded-lg md:rounded-xl w-full lg:w-80 h-36 lg:h-48 border object-cover'/>
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium'>{hotel?.name}</h2>
                            <h2 className='text-xs md:text-sm text-[#fbf5dd]'>{hotel?.address}</h2>
                            {/* <h2 className='text-sm'>{hotel?.price?.currency} {hotel?.price?.amount}</h2> */}
                            <div className='flex flex-row gap-2'><img src='/money.png'alt='money-icon'className='size-5 lg:size-6.5' /><h2 className='text-xs md:text-base'>{hotel?.price}</h2></div>
                            <h2 className='text-xs md:text-sm flex flex-row gap-2'><Rating name="read-only" value={hotel?.rating} precision={0.5} size="small" readOnly />{hotel?.rating}</h2>
                        </div>
                    </div>
                </Link>
                )
            })}</div>
        </div> 
    </div>
  : <TripInfoShimmer/> }</>
  )
}

export default TripInfo