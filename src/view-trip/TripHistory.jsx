import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { database } from '../service/firebaseConfig';
//import { imageLink } from '../service/GlobalAPI.service';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button, Popover } from '@mui/material';
import CustomButton from '../components/CustomButton';
import { useCacheAPI } from '../service/CacheAPI';
import TripHistoryShimmer from '../components/shimmer/TripHistoryShimmer';

const TripHistory = () => {
    const navigate = useNavigate();
    const {fetchAPIWithCache} = useCacheAPI();
    const [userTrips, setUserTrips] = useState([]);
    const [userTripImages, setUserTripImages] = useState([]);
    const [selectedTripId, setSelectedTripId] = useState(null);

    const [anchorEl,setAnchorEl] = useState(false);//popover current position
    const toggleTripProperties = (e, tripId) => {setAnchorEl(e.currentTarget);setSelectedTripId(tripId)};
    const openPop = Boolean(anchorEl);

    useEffect(()=>{getUserTrips();},[]);
    useEffect(()=>{getTripPhotos();},[userTrips]);

    /**
     * The function `getUserTrips` retrieves a user's trip history from Firestore based on their email
     * stored in local storage.
     * @returns The `getUserTrips` function is returning a list of trips associated with the user
     * fetched from Firestore. If there is an error during the process, it will log a message to the
     * console.
     */
    const getUserTrips=async()=>{
        try{
            const user = JSON.parse(localStorage.getItem('user'));
            if(!user){
                navigate('/');
                return
            }
            setUserTrips([]);
            const userQuery =  query(collection(database, 'AITrips'), where('userEmail','==',user?.email))
            const querySnapshot = await getDocs(userQuery);
            querySnapshot.forEach((doc)=>{
                setUserTrips(prevState => [...prevState.filter(ps => ps.id !== doc.data()?.id), doc.data()])
            });
        }catch(e){
            console.log(`Error fetching trip history of the user from firestore : message - ${error}`);
        }
    }

   /**
    * The function `getTripPhotos` asynchronously fetches images for all user trips based on their
    * location preferences and sets them in the state.
    */
    const getTripPhotos = async() =>{
        try{
            let tripImages = await Promise.all(userTrips?.map(async(trip)=>{
                const tripPlaceName = trip?.userPreference?.location?.display_name;
                return await fetchAPIWithCache(tripPlaceName);
            }));
            setUserTripImages(tripImages);
        }catch(error){
            console.log(`Error fetching images of all the trips : message - ${error}`);
        }
    }

   /**
    * The function `handleDeleteTrip` deletes a trip document from Firestore and updates the user's
    * trips list accordingly.
    */
    const handleDeleteTrip = async() =>{
        try{
            if(selectedTripId){
                await deleteDoc(doc(database, "AITrips",selectedTripId ));
                setAnchorEl(null);
                setUserTrips(userTrips.filter(trip => trip.id !== selectedTripId));
            }
        }catch(error){
            console.log(`Error deleting the selected trip from firestore : message - ${error}`);
        }
    }

  return (
     <>{userTripImages?.length ? 
    <div className='sm:px-10 md:px-16 lg:px-56 px-5 mt-8 lg:mt-20 h-full pb-46 text-[#A6CDC6]'>
        <div className='flex flex-row justify-between items-center py-4'>
        <h2 className='font-bold text-2xl lg:text-4xl'>My Trips</h2>
        <CustomButton variant='contained' size='large' bg="#DDA853" color='#16404D' borderRadius='1.5rem'  textTransform='capitalize'hoverEffect={true} hover={{bg:'#DDA853',text:'#DDA853'}} className='shadow-2xl' onClick={()=> navigate('/create-trip')} >Create New Trip</CustomButton>
        </div>
        
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 '>
            {userTrips?.map((trip,index)=>{
                let tripImage =userTripImages[index];
                return(
                <div key={trip.id} className='flex flex-col gap-2 border rounded-lg border-[#A6CDC6] p-4 shadow-xl'>
                    <img src={`${tripImage? tripImage : ''}`} alt={`${trip?.userPreference?.location?.display_name}-thumbnail`} className='object-cover rounded-sm '/>
                    <div className='flex-1'>
                    <div className='flex flex-row justify-between'> <h2 className='font-bold text-lg lg:text-2xl cursor-pointer hover:underline' onClick={() => navigate(`/view-trip/${trip.id}`)}>{trip?.userPreference?.location?.display_name}</h2>
                    <div><BsThreeDotsVertical className='h-6 w-4: lg:h-8 lg:w-6 font-normal cursor-pointer' onClick={(e)=>{toggleTripProperties(e, trip.id)}}/>
                     <Popover
                              id='user-profile'
                              open={openPop}
                              anchorEl={anchorEl}
                              onClose={() => setAnchorEl(null)}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                              className='mt-1'
                            >
                             <div className='flex flex-col gap-3 p-2 min-w-26 lg:min-w-30 cursor-pointer bg-[#A6CDC6]'>
                              <h2 onClick={handleDeleteTrip} className='text-red-600 font-medium text-sm lg:text-base tracking-wider'>Delete</h2>
                              </div>
                               
                            </Popover> 
                            </div>
                            </div>
                      <h2 className='text-sm lg:text-base text-[#fbf5dd]'>{`${trip?.userPreference?.days} Days with ${trip?.userPreference?.budget} budget for ${trip?.userPreference?.traveles} Traveles`}</h2>
                   </div>
                </div>)
            })}
        </div>
    </div> 
   : <TripHistoryShimmer/>}
   </>
  )
}

export default TripHistory