import React, { useState } from 'react'
import './actualWeather.css'

const kelvinToCelsius = (kelvin = 272.15)=>{ 
  return (kelvin - 272.15).toFixed(1)
}

const celsiusToFahrenheit = (celsius = 0) => { 
  return ((celsius * 9/5) + 32).toFixed(1); 
}

const stringifyTime = (value) =>{ 
  return value < 10 ? "0" + value : value;
}

function ActualWeather(props) {
  
  const dataWeather = props.actualWeather || {};
  const weatherTemp = props.actualWeather?.main || {}; 

  const [currentTemp, setCurrentTemp] = useState(0)
  const [feels, setFeels] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  
  const celsius = kelvinToCelsius(weatherTemp.temp);
  const feelsLike = kelvinToCelsius(weatherTemp.feels_like)
  const tempMin = kelvinToCelsius(weatherTemp.temp_min)
  const tempMax = kelvinToCelsius(weatherTemp.temp_max)

  const weatherInfo = dataWeather.weather;
  
  const actualHour = () =>{
    let date = new Date();
    let actual = stringifyTime(date.getHours()) + ':' + stringifyTime(date.getMinutes());
    return actual;
  }
  

  const handleClickCelsius = () => { 
    setCurrentTemp(celsius)
    setFeels(feelsLike)
    setMin(tempMin)
    setMax(tempMax)
  }

  const handleClickFahrenheit = () => { 
    setCurrentTemp(celsiusToFahrenheit(celsius))
    setFeels(celsiusToFahrenheit(feelsLike))
    setMin(celsiusToFahrenheit(tempMin))
    setMax(celsiusToFahrenheit(tempMax))
    
  }

  let weatherIcon;
  dataWeather?.weather?.map((info)=>{ 
    weatherIcon = info.icon;
  })
  
  return (
    <div className='weather-container'>
      <div className='top-part'>
        <p className='city'>{dataWeather.name}</p>
        <img className ='weather-image' src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}></img>
      </div>
      <div className='middle-part'>
        <div className='middle-part-current-temp'>
          <p className='current-temp'>
            {currentTemp || celsius }
          </p>
          <span className='current-temp-o'>O</span>
        <div className='middle-part-temp'>
          <button className='temperature-in-c' onClick={()=>handleClickCelsius()}> C </button>
          <button className='temperature-in-f' 
          onClick={()=> handleClickFahrenheit()}
          > F </button>
        </div>
        </div>
        <div className='wheater-info'>
          {weatherInfo?.map((info)=>(
            <div key={info.id}>
              {info.description.charAt(0).toUpperCase() + info.description.slice(1)}
            </div>
          ))}
        </div>
        <p className='last-update'> Last update at: {actualHour()}</p>
      </div>
      <div className='bottom-part'>
        <p className='feels-like'>
            Feels like: {feels || feelsLike} 
            <span className='white-circle'> &#9675; </span>
          </p>
        <p className='min'> 
          Min: {min || tempMin} 
          <span className='white-circle'> &#9675; </span>
        </p>
        <p className='max'>
            Max: {max || tempMax} 
            <span className='white-circle'> &#9675; </span>
          </p>
        <p className='humidity'> Humidity: {weatherTemp.humidity}%</p>
        <p className='wind'> Wind speed: {dataWeather?.wind?.speed}km/h</p>
      </div> 
    </div>
  )
}

export default ActualWeather;

