import React, { useEffect, useState } from 'react';
import axios from "axios";

const Header = () => {

    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [cityName, setCityName] = useState("");
    const [humidity, setHumidity] = useState("");
    const [wind, setWind] = useState("");
    const [temp, setTemp] = useState("");
    const apiKey = process.env.REACT_APP_API_KEY_TWO;

    const addZero = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[new Date().getDay()];
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    hour = addZero(hour);
    minutes = addZero(minutes);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=sofia&appid=${apiKey}&units=metric`)
            .then((response) => {
                setCityName(response.data.name);
                setWind(response.data.wind.speed);
                setHumidity(response.data.main.humidity);
                setTemp(response.data.main.temp);
                setIcon(`https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`);
                setDescription(response.data.weather[0].description[0].toUpperCase() + response.data.weather[0].description.substring(1));
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <header className='header'>
            <div>
                <h1>NEWS</h1>
            </div>
            <div>
                <div className='header-icon'>
                    <img src={icon} alt={icon} />
                </div>
                <div className='header-temp'>
                    <p>{Math.round(temp)}</p>
                </div>
                <div>
                    <p style={{ marginLeft: "-6px", marginTop: "12px" }}><sup>&#8451;</sup></p>
                </div>
                <div className='header-desc'>
                    <p>Humidity: {humidity} %</p>
                    <p>Wind: {Math.round(wind)} km/h</p>
                </div>
                <div className='header-city'>
                    <h3>{cityName}</h3>
                    <p>{day} {hour}:{minutes}</p>
                    <p>{description}</p>
                </div>
            </div>
        </header>
    )
};

export default Header;