import React, { useState } from 'react'

export const WheatherApp = () => {

    const urlBase = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "33af5c04b434f74b0071114f4dc7b5f6"

    const difKel = 276.15

    const [ciudad, setCiudad] = useState("")
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    
    }

    const fetchClima = async() => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }
    
    return (
        <div className='container'>
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' value={ciudad} name={ciudad} onChange={handleCambioCiudad}/>
                <button>Buscar</button>
            </form>
            { 
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima.main.temp - difKel)}°C</p>
                        <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@4x.png`}/>
                    </div>
                )
            }
        </div>
    )
}
