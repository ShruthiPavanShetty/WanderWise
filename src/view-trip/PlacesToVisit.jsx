import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
// import { imageLink } from '../service/GlobalAPI.service';
import { FaRegCircle } from 'react-icons/fa6';
import PlacesToVisitShimmer from '../components/shimmer/PlacesToVisitShimmer';
import { useCacheAPI } from '../service/CacheAPI';

/**
 * The function `sortDays` sorts an array of strings representing days of the week in numerical order.
 * @returns The `sortDays` function is returning an array of days sorted in ascending order based on
 * the numerical value extracted from each day string.
 */
const sortDays = (days) =>{
   return days.sort((a, b) => {
        const numA = parseInt(a.replace('day', '')); // Extract number from 'dayX'
        const numB = parseInt(b.replace('day', ''));
        return numA - numB; // Sort numerically
    })
};

const PlacesToVisit = ({trip}) => {
     const {fetchAPIWithCache} = useCacheAPI();
    const itinerary = trip?.tripData?.travelPlan?.itinerary ?? {};
    const itineraryKeys = sortDays(Object.keys(trip?.tripData?.travelPlan?.itinerary ?? {})) ?? [];
    const itineraryValues = Object.values(trip?.tripData?.travelPlan?.itinerary ?? {}) ?? [];
    const [placeImages,setPlaceImages] = useState([]);

    useEffect(()=>{getPlacePhotos();},[trip]);

   /**
    * The function `getPlacePhotos` asynchronously retrieves images for places in an itinerary and sets
    * them in state.
    */
    const getPlacePhotos = async() =>{
        try{
            const images = await Promise.all(itineraryValues?.map(async(item,index) =>{
                return await Promise.all(item?.activities?.map(async(place)=> await fetchAPIWithCache(place?.placeName))); 
            }));
            setPlaceImages(images);
        }catch(error){
            console.log(`Error fetching places images : message - ${error}`);
        }
    }

      return (
         <>{placeImages?.length ? 
        <div className='my-5'>
            <h2 className='font-bold text-xl md:text-2xl my-2'>Places to Visit</h2>
            <div>{itineraryKeys?.map((item, itemIndex)=>{
                return(
                <div key={itemIndex} className='mt-10'>
                    <h2 className='font-medium text-lg md:text-xl capitalize'>{item?.replace(/(\d+)/, ' $1')} - {itinerary[item]?.title}</h2> 
                    <div>
                        <div className='flex flex-col md:flex-row text-sm md:text-base text-[#fbf5dd] gap-1'><h2 className='font-medium'>Best time to visit :</h2><h2>{itinerary[item]?.bestTimeToVisit}</h2></div>
                        <div className='flex flex-col md:flex-row text-sm md:text-base text-[#fbf5dd]'><h2 className='font-medium'>Food Experience : </h2>
                        <ul>{itinerary[item]?.foodExperiences?.map(foodEx => {return(<li className='flex flex-row'><FaRegCircle className='px-2 h-6 w-6'/><span>{foodEx}</span></li>)})}</ul></div>
                    </div>
                    <div className='my-3 grid grid-cols-1 gap-5'>
                    {itinerary[item]?.activities?.map((place,index)=>{
                        const dayImage = placeImages[itemIndex];
                        return(
                            <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} target="_blank"  key={index}>
                                <div>
                                    <div className='shadow-lg border-xl p-3 mt-1 flex flex-col md:flex-row gap-3'>
                                    <img src={dayImage?dayImage[index]:''} alt={`${place?.placeName}-image`} className='w-full h-[200px] md:w-[200px] md:h-[200px] rounded-xl'/>
                                    <div>
                                        <h2 className='font-bold text-base md:text-xl'>{place?.placeName}</h2>
                                        <p className='text-xs md:text-sm text-[#fbf5dd]'>{place?.placeDetails}</p>
                                        <h2 className='text-sm md:text-base mt-2 text-[#fbf5dd] font-medium'>{place?.activityDescription}</h2>
                                        <div className='text-sm md:text-base mt-2 text-[#fbf5dd] font-medium flex flex-row gap-2'><img src='/clock.png' alt='clock-icon' className='size-5 lg:size-6.5'/><h2>{place?.timeTravel}</h2></div>
                                        <div className='text-sm md:text-base mt-2 text-[#fbf5dd] font-medium flex flex-row gap-2'><img src='/dualTicket.png' alt='ticket-icon' className='size-5 lg:size-6.5'/><h2>{place?.ticketPricing}</h2></div>
                                    </div> 
                                    </div> 
                                </div>
                            </Link>
                    )})}  
                  </div>
              </div>)
            })}</div> 
           
        </div>
      : <PlacesToVisitShimmer/> }</>
      )
}
 

export default PlacesToVisit;