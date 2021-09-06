import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ActualWheather from './components/ActualWeather';
import WeatherDataForFiveDays from './components/WeatherDataForFiveDays';

function App() {

  const [actualWeather, setActuaWeather] = useState();
  const [dataSetForFiveDays, setDataSetForFiveDays] = useState();

  const city = 'Bucharest'
  const country = 'RO';
  const apiKey = '71f6b9b7f9d0c8c8ffa03fc1019a3245';

  const fetchWeatherDataForActualWeather =()=> { 
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)
      .then((res)=> setActuaWeather(res.data))
      .catch((error) => console.log(error))
  }

  const fetchWeatherDataForFiveDays =()=> { 
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}`)
      .then((res)=> setDataSetForFiveDays(res.data))
      .catch((error) => console.log(error))
  } 

  useEffect(() => {
    fetchWeatherDataForFiveDays();
    fetchWeatherDataForActualWeather();
  }, [])

  return (
    <div className="App">

      <ActualWheather
        actualWeather={actualWeather}
      /> 
      <WeatherDataForFiveDays
        dataSetForFiveDays={dataSetForFiveDays}
      />
    </div>
  );
}

export default App;