import { Route, Routes } from 'react-router-dom'
import './App.css'
import Indexpage from './pages/indexpage'
import LoginPage from './pages/loginpage'
import Layout from './layout'
import RegisterPage from './pages/registerpage'
import axios from 'axios';
import { UserContextProvider } from './usercontext'
import AccountPage from './pages/accountpage'
import PlacesPage from './pages/palcespage'
import PlacesFormPage from './pages/placesformpage'
import SinglePlace from './pages/singleplacepage'
import BookingPage from './pages/bookingspage'
import SingleBookingPage from './pages/singlebookingpage'

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<SinglePlace />}/>
          <Route path="/account/bookings" element={<BookingPage />}/>
          <Route path="/account/bookings/:id" element={<SingleBookingPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
