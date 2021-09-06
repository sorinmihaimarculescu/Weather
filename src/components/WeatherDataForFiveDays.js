import React, { useState } from 'react'
import './weather.css'

const kelvinToCelsius = (kelvin = 272.15)=>{ 
  return (kelvin - 272.15).toFixed(1)
}

const celsiusToFahrenheit = (celsius = 0) => { 
  return ((celsius * 9/5) + 32).toFixed(1); 
}

const WeatherDataForFiveDays = (props)=> {

  const dataWeatherList = props.dataSetForFiveDays?.list || []; 
  const dataWeather = props.dataSetForFiveDays || []; 
  
  const [activeDay, setActiveDay] = useState(null); 

  let groupByDay = {};
  
  dataWeatherList.forEach((value)=>{ 

    const day = value['dt_txt'].split(' ')[0].split('-')[2]; 

    if(!groupByDay[day]) { 
      groupByDay[day] = [];
    } 
    
    groupByDay[day].push(value)
  }) 

  const days = Object.keys(groupByDay)

  return (
    <>
      {days.map((day)=>{ 
        return( 
          <button onClick={()=> setActiveDay(day === activeDay ? null : day)}> {day} </button>
        )
      })}

      <div className='group-by-days'> 
        {
          groupByDay[activeDay]?.map((item)=>{ 

            const {main, wind, dt_txt} = item
            const day = dt_txt.split(' ')[0].split('-')[2]
            const hour = dt_txt.split(' ')[1].slice(0,5);
            const temp = kelvinToCelsius(main.temp);
            const min = kelvinToCelsius(main.temp_min);
            const max = kelvinToCelsius(main.temp_max)

            return( 
              <div className='days-container'>
                <h2>{day}</h2>
                <p>Hour: {hour}</p>
                <p>Temp: {temp}</p>
                <p>Min: {min}</p>
                <p>Max: {max}</p>
                <p>Wind: {wind.speed} km/h</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default WeatherDataForFiveDays
