import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import App from '../App';
import RootLayout from '../layouts/RootLayout';
import CreateTrip from '../create-trip';
import ViewTripLayout from '../layouts/ViewTripLayout';
import Viewtrip from '../view-trip/viewtrip';
import TripHistory from '../view-trip/TripHistory';

export const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<App/>} />
    <Route path='/' element={<RootLayout/>}>
        <Route path='create-trip' element={<CreateTrip/>}/>
        <Route path='view-trip' element={<ViewTripLayout/>}>
          <Route path=':id' element={<Viewtrip/>}/>
        </Route>
        <Route path='my-trips' element={<TripHistory/>}/>
    </Route></>
  ));