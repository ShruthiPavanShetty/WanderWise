import { createContext, useContext, useState } from "react"
import { imageLink } from "./GlobalAPI.service";

const CacheAPIContext = createContext();

export const CacheAPIProvider = ({children}) =>{
    const [cacheData,setCacheData] = useState({});

    const fetchAPIWithCache = async(data) =>{
        if(data){
            if(cacheData[data]){
                return cacheData[data];
            }else{
                 try{
                    let imagesUrl = await imageLink(data);
                    setCacheData(prev=>({...prev,[data]: imagesUrl}));
                    return imagesUrl;
                }catch(error){
                    console.log(`Error fetching image URL : message - ${error}`)
                }
            }
        }
    }

    return(
        <CacheAPIContext.Provider value={{fetchAPIWithCache}}>{children}</CacheAPIContext.Provider>
    )
}

export const useCacheAPI = () => useContext(CacheAPIContext);