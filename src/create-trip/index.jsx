import React, { useEffect, useState } from 'react'
import AutoSuggestion from '../components/AutoSuggestion';
import { Backdrop, Button, CircularProgress, Slider, TextField, Tooltip } from '@mui/material';
import { AI_PROMPT, SELECT_BUDGET_OPTIONS, SELECT_TRAVELES_LIST  } from '../constants/options';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { database } from '../service/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import LoginDialog from '../components/LoginDialog';
import { useAuth } from '../service/Authentication';
import { model } from '../service/AIModal';
// import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
// import axios from 'axios';
// import CurrencySelect from '../components/CurrencySelect';

// --feature enhancement
// const TOOLTIP_MESSAGES={
//     budget:{cards:'Switch to add your custom budget.',custom:'Switch to cards view.'},
//     traveles:{cards:'Switch to add your custom budget.',custom:'Switch to cards view.'}
// }
// const DEFAULT_SLIDER_VALUE = [20000, 80000];

const CreateTrip = () => {
    const navigate = useNavigate();
    const {user, login} = useAuth();
    const [isLoginClicked,setIsLoginClicked] = useState(false);
    const [formData,setFormData] = useState({});
    const [error,setError] = useState({});
    const [openDialog,setOpenDialog] = useState(false);
    const [loading,setLoading] = useState(false);

    // --feature enhancement
    // const [currencies,setCurrencies] = useState([]);
    // const [customInputs,setCustomInputs] = useState({
    //     budget:{custom:false, tooltipMessage:TOOLTIP_MESSAGES?.budget?.cards},
    //     traveles:{custom:false,tooltipMessage:TOOLTIP_MESSAGES?.traveles?.cards}
    // })

   /* This `useEffect` hook runs a function `handleTripGeneration()` when the `isLoginClicked` state is true and the `user` prop changes. */
    useEffect(()=>{
        isLoginClicked && handleTripGeneration();
    },[user]);

    // useEffect (() => {getCurrencies();},[]) --feature enhancement


/**
 * The function `validateNumberInput` ensures that the input value is a non-negative number.
 */
    const validateNumberInput = (e) =>{
        const numericValue = parseFloat(e.target.value);
        // Check if the numeric value exceeds the max value (15)
        // if (!isNaN(numericValue) && numericValue > 15) {
        //   e.target.value = "15";
        // }
        // Check if the numeric value is below the min value (0)
        if (!isNaN(numericValue) && numericValue < 0) {
          e.target.value = "0";
        }
    }

  /**
   * The function `handleInputChange` updates the form data with the new value while also performing
   * trip input validation.
   * @param {string} name - Parameter name holds a string, key of formaData. 
   * @param {any} value - Parameter value may hold either a string or a number.
   */
    const handleInputchange =(name,value)=>{
        handleTripInputValidation(name,value)
        setFormData(prevState => ({...prevState,[name]:value}))
    }

    /**
     * The function `handleTripInputValidation` validates user input for a trip form, displaying error
     * messages for specific conditions.
     * @param {string} name - Parameter name holds a string, key of formaData. 
     * @param {any} value - Parameter value may hold either a string or a number.
     */
    const handleTripInputValidation = (name,value) =>{
        if(name==='location'&& value===null){
            setError(prevState => ({...prevState,location:`Please select your destination` }));
        }
        else if(name === 'days' &&  value>30){
            setError(prevState => ({...prevState,days:`Days shouldn't be more than 30 days` }));
        }else if(name === 'days' &&  value === ''){
            setError(prevState => ({...prevState,days:`Please select nunmber of days` }));
        }
        else{
            delete error[name];
            setError(prevState => ({...prevState,...error }))
        }
    }

   /**
    * The handleLogin function triggers a login action, sets a state variable to indicate that login
    * was clicked, and closes a dialog box.
    */
    const handleLogin = async() =>{
        try{
            login();
            setIsLoginClicked(true);
            setOpenDialog(false);
        }catch(e){console.log(`Error logging user via Google oAuth : message - ${e}`)} 
    }

    /**
     * The function `handleTripGeneration` checks for user authentication, error existence, and
     * destination days input before generating a trip prompt using AI and saving the trip details.
     * @returns The function `handleTripGeneration` returns nothing explicitly. It either sets
     * `openDialog` to true and returns, or it checks for conditions and returns early if certain
     * errors exist or if `destinationDaysExists` is false. If none of these conditions are met, it
     * proceeds with the logic inside the function and then returns nothing at the end.
     */
    const handleTripGeneration = async() =>{
        try{
            if(!user){
                setOpenDialog(true);
                return;
            }
            const errorExists = Object.values(error)?.length;
            const destinationDaysExists = (formData?.location && formData?.days) === undefined ? false :true;
            if( errorExists || !destinationDaysExists ) return;
            setLoading(true);
            const FINAL_PROMPT = AI_PROMPT.replace('{location}',formData?.location?.display_name
            ) .replace('{days}',formData?.days).replace('{budget}',formData?.budget).replace('{traveles}',formData?.traveles);
            try{
                const result = await model.generateContent(FINAL_PROMPT);
                const promptResult = result?.response?.text()?.match(/```json\n([\s\S]*?)\n```/)[1];
                saveAiTrip(promptResult);
            }catch(e){
                console.log(`Error fetching information from AI : message - ${e}`);
            }
        }catch(e){
            console.log(`Error generating the trip information : message - ${e}`);
        }
    }

    /**
     * The `saveAiTrip` function saves trip data to a Firestore collection and navigates to view the
     * saved trip.
     */
    const saveAiTrip = async(tripData) =>{
        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem('user'));
        try{
             // Add a new document in collection "AITrips"
            await setDoc(doc(database, "AITrips", docId), {
                userPreference:formData,
                tripData: JSON.parse(tripData),
                userEmail:user['email'],
                id:docId
            });
            navigate(`/view-trip/${docId}`);
            setLoading(false);
        }catch(e){
            console.log(`Error creating new trip record in firestore : message - ${e}`);
        }
    }

    // --feature enhancement
    // const getCurrencies = async() =>{
    //     let response = await axios.get('https://restcountries.com/v3.1/all');
    //     response && setCurrencies(response?.data)
    // }

    // --feature enhancement
    // const handleCustomInputToggle = (label) =>{
    //     let currentState = !customInputs[label]?.custom;
    //     let messageKey = currentState ? 'custom' : 'cards' ;
    //     let message = TOOLTIP_MESSAGES[label][messageKey];
    //     setCustomInputs(prev => ({...prev,[label]:{custom:currentState,tooltipMessage:message}}));
    //     setFormData(prevState => ({...prevState,budget:DEFAULT_SLIDER_VALUE}))
    // }

  return (
    <div className='bg-[url(/beachBg.jpg)] bg-cover'>
        <h2 className='text-4xl md:text-5xl lg:text-6xl text-[#DDA853] font-bold text-center py-10 md:py-20' >Explore Smarter, Travel Better</h2>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 px-4 md:px-12 py-1 lg:py-5'>
        <div>
            <div className='bg-[#A6CDC6] text-[#16404D] rounded-lg px-6 md:px-12 py-7 md:py-14'>
                <h2 className='font-bold text-2xl md:text-3xl'> Let us craft your trip based on your interests</h2>
                <p className='mt-3 text-[#324c53] text-base md:text-xl'>Provide a few key details, and our trip planner will create a tailored itinerary for you.</p>
                <div className='flex flex-col gap-4 md:gap-8 mt-4 md:mt-8'>
                    <div>
                        <h2 className='text-lg md:text-xl my-3 font-medium'>What is your destination of choice?</h2>
                        <AutoSuggestion 
                        handleSuggestionSelection={(_,value) => {handleInputchange('location', value)}}
                        />
                        {error.location && <p className='mt-2 text-red-400'>{error.location}</p>}
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                        <TextField type='number' label='Ex.3' variant='outlined' name='days' onChange={(event)=>{handleInputchange('days',event.target.value)}} onInput={validateNumberInput} />
                        {error.days && <p className='mt-2 text-red-400'>{error.days}</p>}
                    </div>
            
                <div>
                    <div className='flex flex-row justify-between items-center'>
                        <h2 className='text-lg md:text-xl my-3 font-medium'>What is your budget?</h2>
                        {/* <div><Tooltip title={customInputs?.budget?.tooltipMessage} arrow><MdOutlineSwapHorizontalCircle className={`w-7 h-7 rounded-[50%] scale-100 duration-300 ease-out hover:scale-125 hover:duration-300 hover:ease-out cursor-pointer ${customInputs?.budget?.custom && 'text-[#DDA853]'}`} onClick={()=>handleCustomInputToggle('budget')}/></Tooltip></div> --feature enhancement */}
                    </div>
                {/* {!customInputs?.budget?.custom ? ( --feature enhancement */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:mt-5'>
                        {SELECT_BUDGET_OPTIONS.map(option => {
                        return(<div key={option.id} onClick={() => {handleInputchange('budget',option.title)}}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-xl ${formData?.budget === option.title ? 'border lg:border-2 border-[#16404D] shadow-md lg:shadow-xl': 'border-[#92b4ae]'}`}>
                        <h2 className='text-base md:text-lg font-bold'>{option.title}</h2>
                        <p className='text-xs md:text-sm text-[#324c53]'>{option.description}</p></div>)
                        })}
                    </div>
                    {/* ):
                    (<div>
                        <Slider
                            name='budget'
                            getAriaLabel={() => 'Budget Range'}
                            value={formData?.budget}
                            onChange={(e) => {handleInputchange('budget',e.target.value)}}
                            valueLabelDisplay="auto"
                            color="#16404D"
                            min={1000}
                            max={100000}
                            defaultValue={DEFAULT_SLIDER_VALUE}
                        />
                        <div className='flex flex-row justify-between my-2'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Min"
                                defaultValue={formData?.budget[0]}
                                color="#16404D"
                                sx={{color:'#16404D', width:'100px'}}
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    },
                                }}
                            /> 
                            <TextField
                                id="outlined-read-only-input"
                                label="Max"
                                defaultValue={formData?.budget[1]}
                                className='text-[#16404D]'
                                sx={{color:'#16404D', width:'100px'}}
                                slotProps={{
                                input: {
                                    readOnly: true,
                                },
                                }}
                            />
                        </div>
                    </div>)} --feature enhancement */}
                </div>
                <div>
                    <div className='flex flex-row justify-between items-center'>
                        <h2 className='text-lg md:text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                        {/* <div><Tooltip title={customInputs?.traveles?.tooltipMessage} arrow><MdOutlineSwapHorizontalCircle className={`w-7 h-7 rounded-[50%] scale-100 duration-300 ease-out hover:scale-125 hover:duration-300 hover:ease-out cursor-pointer ${customInputs?.traveles?.custom && 'text-[#DDA853]'}`} onClick={()=>handleCustomInputToggle('traveles')}/></Tooltip></div> --feature enhancement */}
                    </div>
                    {/* {!customInputs?.traveles?.custom ?(  --feature enhancement */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:mt-5'>
                        {SELECT_TRAVELES_LIST .map(option => {
                        return(<div key={option.id} onClick={() => {handleInputchange('traveles',option.people)}} className={`p-4 border rounded-lg  cursor-pointer hover:shadow-xl ${formData?.traveles === option.people ? 'border lg:border-2 border-[#16404D] shadow-md lg:shadow-xl': 'border-[#92b4ae]'}`}>
                        <h2 className='text-base md:text-lg font-bold'>{option.title}</h2>
                        <p className='text-xs md:text-sm text-[#324c53]'>{option.description}</p></div>)
                        })}
                    </div>
                    {/* ) :
                     (<div><TextField id="outlined-basic" label="Traveles" variant="outlined" placeholder='Number of Traveles' onChange={(e) => {handleInputchange('traveles',e.target.value)}} /></div> --feature enhancement)} */}
                </div>
                </div>
                <div className='my-10 flex justify-center lg:justify-start'> <Button variant='contained' sx={{backgroundColor:'#16404D',padding:'12px 26px', letterSpacing:'3px',color:'#FBF5DD'}} className='pt-5' size='large' onClick={handleTripGeneration} disabled={loading}>{loading ?<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip'}</Button></div>
            {/* <CurrencySelect currencies={currencies}/> --feature enhancement */}
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}><CircularProgress color="inherit" size='4rem' /><div className=' px-4 text-2xl text-[#FBF5DD]'>  Please wait, It may take some time.</div></Backdrop>
            <LoginDialog openDialog={openDialog} setOpenDialog={setOpenDialog} login={handleLogin}/>
            </div>
            </div>
     <img src='/banner3.svg' alt='trip-banner' className='object-cover w-full '/>
    </div></div>
  )
}

export default CreateTrip;