
import { useEffect, useState } from 'react';
import './App.css';
import {FaSearch} from "react-icons/fa";

const WeatherDetails = ({temp,city,country,lat,long, hum,wind})=>{
  return(
    <>
    <div className="image">
   
      <div className='temp'>{temp}°C</div>
        <div className='Location'>{city}</div>
         <div className='Country'>{country}</div>
         </div>
         <div className='cord'>
          <div>
            <span className='lat'>Latiitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className='long'>Longitude</span>
            <span>{long}</span>
          </div>
         
    </div>
    <div className='data-container'>
      <div className='data'>
        <div className='humi-per'>{hum}%</div>
        <div className='text'>Humidity</div>
      </div>
      <div className='data'>
      <div className='wind-per'> {wind} km/h</div>
        <div className='text'>Wind speed</div>
      </div>

    </div>
    </>
  )
}


function App() {
  let api_key= "393b75b4f2c161ff615b8df9b3379c6d";
  const [text,setText]= useState("ooty")

  const [temp,setTemp] = useState(0)
  const [city,setCity] = useState("Ooty")
    const [country,setCountry] = useState("IN")
     const [lat,setLat] = useState(0)
      const [long,setLong] = useState(0)
    
      const [hum,setHum] = useState(0)
      const [wind,setWind] = useState(0)
      const [error,setError]= useState(null)
      const[cityNotFound,setCityNotFound]= useState(false);
      const [loading,setLoading]= useState(false);

    
      
     
      const search = async()=>{
        setLoading(true)
      
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=393b75b4f2c161ff615b8df9b3379c6d&units=Metric`; 
        
        
        try{
          let res = await fetch(url);
          
          
          let data= await res.json();
          console.log(data)
          if(data.cod === "404"){
            console.error("City Not Found")
            setCityNotFound(true)
            setLoading(false)
            return;
          }
          setTemp(Math.floor(data.main.temp));
          setCity(data.name)
          setCountry(data.sys.country)
          setLat(data.coord.lat);
          setLong(data.coord.lon);
          setHum(data.main.humidity)
          setWind(data.wind.speed)
         
          setCityNotFound(false)
        }catch(error)
        {
        console.error("An error occurred:",error.message);
        setError("An error occured while fetching Data...");
        }
        finally{
          setLoading(false)
        }
      }
      const handleCity = (e) =>{
        setText(e.target.value);

      }
      const handleKeyDown=(e) =>{
        if(e.key==="Enter"){
          search();
        }
      };
      const handleSearch = () =>{
        search();
      }
      useEffect  (function(){
           search();
      },[]);

    return (
    <div className="container">
      <div className="input-container">
        <input type="text"
        className="cityInput"
        placeholder="Search City" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <FaSearch className='icon' onClick={handleSearch}/> 
      </div>
     
     { loading && <div className='loading-message'> Loading</div>}
    { error && <div className='error-message'>{error}</div>}
      { cityNotFound && <div className='city-not-found'>City Not Found</div>}
    { !loading && !cityNotFound && <WeatherDetails  temp={temp} city={city} country={country} lat={lat} long={long} hum= {hum} wind = {wind}/>}

    </div>
  );
}

export default App;
