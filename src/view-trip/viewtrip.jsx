import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { database } from '../service/firebaseConfig';
import TripInfo from './TripInfo';
import PlacesToVisit from './PlacesToVisit';
import TripInfoShimmer from '../components/shimmer/TripInfoShimmer';

const Viewtrip = () => {
    const {id}=useParams();
    const [trip,setTrip] = useState({});
    
    useEffect(()=>{
        getTripData();
    },[]);

   /**
    * The function `getTripData` retrieves trip data from a Firestore database using the provided ID.
    */
    const getTripData = async () =>{
        try{
            const docRef = doc(database,'AITrips', id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setTrip(docSnap.data())
            }else{
                console.log('No such document');
            }
        }catch(error){console.log(`Error fetching trip data from firestore : message - ${error}`)} 
    }
    

  return (
    <div className='flex flex-col gap-5 p-6 md:px-20 lg:px-44 text-[#A6CDC6]'>
            <TripInfo trip={trip}/>
            <PlacesToVisit trip={trip} />
    </div>
  )
}

export default Viewtrip