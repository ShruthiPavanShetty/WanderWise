import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'

/**
 * The `debounce` function takes a callback function and a delay time as parameters, and returns a new
 * function that delays invoking the callback until the specified time has passed without any new
 * invocations.
 * @param {function} callback
 * @param {number} delay
 * @returns The `debounce` function returns a new function that will execute the `callback` function
 * after a specified `delay` only if the new function is not called again within that `delay` period.
 */
const debounce=(callback,delay)=>{
    let timeoutId;
    return (...args)=>{
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()=>{
            callback(...args);
        },delay);
}}

const AutoSuggestion = ({handleSuggestionSelection}) => {

    const [query,setQuery] = useState('');
    const [suggestions,setSuggestions] = useState([]);

    //function to handle onChange event of the text field and update the state with the value.
    const handleQuery = (event) =>{
        setQuery(event.target.value)
    }

   /**
    * The function fetches suggestions based on a query using the OpenStreetMap Nominatim API
    * asynchronously and updates the state with the response.
    * @param {string} query
    */
    const fetchSuggestions = async (query)=>{
        try{
            const response = await axios.get( `https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
            setSuggestions(response.data);
        }catch(error){
            console.log('Error fetching suggestions:',error);
        }
    }

/* Creating a memoized version of the `fetchSuggestions` function that is debounced with a delay of 300
milliseconds. */
    const debounceFetchedSuggestions = useCallback(debounce(fetchSuggestions,300),[]);

   //  Triggers the debounced fetching of suggestions based on the query input. 
    useEffect(()=>{
        if(query.length > 2){
            debounceFetchedSuggestions(query);
        }
    },[query]);

  return (
    <div>
        <Autocomplete options={suggestions} getOptionLabel={(option) => option.display_name} onChange={handleSuggestionSelection}  renderInput={(params)=> <TextField {...params} label="Select Destination..." inputvalue={query} onChange={handleQuery}/>}/>
    </div>
  )
}

export default AutoSuggestion;

// The useCallback hook is used to memoize the debounced version of the fetchSuggestions function. This is important for a couple of reasons:
// 1. The useCallback hook ensures that the debounced function reference remains stable across re-renders, avoiding unnecessary re-creations of the function. Without useCallback, the debounced function would be recreated every time the component re-renders, which could defeat the purpose of debouncing.
// 2. Dependencies in useEffect: By using useCallback, we can add the memoized function to the dependency array of the useEffect hook. This ensures that the useEffect hook doesn't re-run unnecessarily when the component re-renders, which helps in optimizing performance.