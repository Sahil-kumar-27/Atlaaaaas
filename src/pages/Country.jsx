import React, { useTransition } from 'react' 
import { useEffect } from 'react'
import { getCountryData } from '../api/postApi'
import { useState } from 'react'
import Loader from '../components/UI/Loader'
import CountryCard from '../components/Layout/CountryCard'
import SearchFilter from '../components/UI/SearchFilter'


const Country = () => {

  const [isPending, startTransition] = useTransition()
  const [Countries, setCountries] = useState([])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")


  useEffect(() => {
        startTransition( async ()=> {
          const res = await getCountryData()
          setCountries(res.data)
        })
  },[]) 

    if (isPending) return <Loader />
     
    const searchCountry = (country) => {
      if (search){
        return country.name.common.toLowerCase().includes(search.toLowerCase())
      }
      return country
    }

    const filteredRegion = (country) => {
      if (filter === "all") return country
      return country.region === filter 
    }

    const filteredCountries = Countries.filter((country) => searchCountry(country) && filteredRegion(country))

  return (
    <section className='country-section'>
    <SearchFilter search = {search} setSearch={setSearch} filter={filter} setFilter={setFilter} countries={Countries} setCountries={setCountries} />

        <ul className='grid grid-four-cols'>
          {
            filteredCountries.map((curCountry, index)=>{
              return <CountryCard country={curCountry} key={index} />
            })
          }
        </ul>

    </section>
  )
}

export default Country
