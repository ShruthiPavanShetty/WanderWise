import axios from "axios";

export const getPlaceImages = async(data) => {
  try{
    return axios.get(`https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${data}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`);
  }catch(error){
    console.log(`Error fetching images of places from gomaps : message - ${error}`)
  }
}
export const showPlaceImage = (data) => `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${data}&maxwidth=600&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

export const imageLink = async(data) =>{
  try{
    const result = await getPlaceImages(data);
    let [placeData] = result?.data?.results ?? '';
    let [imageData] = placeData?.photos ?? '';
    const image = await showPlaceImage(imageData?.photo_reference);
    return image;
  }catch(error){
    console.log(`Error fetching images link from gomaps : message - ${error}`)
  }  
}

export const getUserProfile =async(userInfo, updateState)=>{
  try{
    let userProfile = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo?.access_token}`,
      { headers:{
           Authorization:`Bearer ${userInfo?.access_token}`,
           Accept:'Application/json'
       }
    });
    localStorage.setItem('user',JSON.stringify(userProfile?.data));
    updateState(userProfile?.data);
    return 'SUCCESS';
  }catch(error){
    console.log(`Error fetching user profile while authorizing the application : message - ${error}`)
  }
}

export const unsplashImages = async ()=>{
  try{
    const query = 'travel landscape';
    let response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_IMAGES_API_KEY}`);
    return response?.data;
  }catch(error){
    console.log(`Error fetching images from unsplash : message - ${error}`);
  }
}

// Unspalsh query to fetch images.
  //'cities with buildings landscape';
  //'cities landscape';
  //'travel landscape';