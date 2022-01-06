import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState({
    data: {
      name: '',
      capital: '',
      population: '',
      flag: ''
    },
    found: false
  })
  const baseUrl = 'https://restcountries.com/v2/name'
  const getCountry = async (name) => {
    const request = axios.get(`${baseUrl}/${name}?fullText=true`)
    const r = await request
    return r.data[0]
  }
  console.log('this is country: ', getCountry())

  useEffect(() => {
    let c = getCountry()
    // setCountry({
    //   data: {
    //     name: c.name
    //   }
    // })
    axios.get(`${baseUrl}/${name}?fullText=true`)
    .then( r => { 
      if (r.data[0]) {
        setCountry({
        data: {
          name: r.data[0].name,
          capital: r.data[0].capital,
          population: r.data[0].population,
          flag: r.data[0].flag
        },
        found: true
        })
      } else {
        setCountry({
          ...country,
          found: false
        })
      }
    })
  },[name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log('this iscomponent',country)

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
