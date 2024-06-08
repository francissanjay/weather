import React, { useEffect, useRef, useState } from 'react'
import Searchicon from '../assets/search.png'
import Clear from '../assets/clear.png'
import Clouds from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'

const Weather = () => {

    const inputref = useRef()

    const [weath,Setweath] = useState(false)
    const toticons =  {
        "01d":Clear,
        "01n":Clear,
        "02d":Clouds,
        "02n":Clouds,
        "03n":Clouds,
        "03d":Clouds,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "010d":rain,
        "010n":rain,
        "013d":snow,
        "013n":snow,

       
    }

const weather = async(city)=>{

    if(city===""){
        alert("Enter City name")
        return
    }
    try {
       
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric &appid=${"e2c82591a50cb4b2fd7ae8576eb33994"}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        const icon = toticons[data.weather[0].icon] || Clear;
        Setweath({

humidity:data.main.humidity,
windSpeed:data.wind.speed,
temperature: Math.floor(data.main.temp),
location:data.name,
icon: icon

        })
    } catch (error) {
        
    }
}

useEffect(()=>{
    weather("chennai")
},[])

  return (
    <div className='weather'>
        
        <div className="search">
            <input type="text" placeholder='Search' ref={inputref} />
            <img src={Searchicon} alt="" onClick={()=>weather(inputref.current.value)} />
        </div>
<img src={weath.icon} alt="" className='clearicon' />
<p className='temp'>{weath.temperature}</p>
<p className='city'>{weath.location}</p>

<div className="weatherdata">
    <div className="col">
        <img src={humidity} alt="" />
        <div>
            <p>{weath.humidity}</p>
            <span>Humidity</span>
        </div>
    </div>
    <div className="col">
        <img src={wind} alt="" />
        <div>
            <p>{weath.windSpeed} </p>
            <span>Wind speed</span>
        </div>
    </div>
</div>

    </div>
  )
}

export default Weather