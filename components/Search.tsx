'use client'
import { Input, Listbox, ListboxItem, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface CountryData {
    name:string,
    flag:string
}

const Search = () => {
    const [allCountriesData, setAllCountriesData] = useState<CountryData[]>()
    const [filteredContries, setFilteredCountries] = useState<CountryData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    const [specifiedCountry, setSpecifiedCountry] = useState()
    useEffect(()=>{
        const firstFetchData = async()=>{
            const response = await fetch(`https://countriesnow.space/api/v0.1/countries/info?returns=flag`)
            const result = await response.json()
            // console.log(result)
            if(!result.error){
                setAllCountriesData(result.data)
            }
        }
        firstFetchData()
    },[])
    const filterCountriesData = async(keywords:string)=>{
        if(keywords === ""){
            setFilteredCountries([])
            return
        }

        const filteredArray = allCountriesData?.filter((country)=>country.name.toLowerCase().startsWith(keywords))
        if(filteredArray){
            console.log(filteredArray)
            setFilteredCountries(filteredArray)
        }
    }
    const handleSearch = (e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value)
        filterCountriesData(e.target.value)
    }
    const fetchSpecifiedCountryData = async(country:string)=>{
        setLoading(true)
        setFilteredCountries([])
        const postObject = {"country": country}
        console.log(postObject)
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/population", {
            headers:{
                "Content-Type": "application/json",
              },
            method:"POST", 
            body:JSON.stringify(postObject)
        })
        const result = await response.json()
        console.log(result)
        if(result){
            setSpecifiedCountry(result)
        }
        setLoading(false)
    }
    const handleClick = (country:string)=>{
        console.log(country)
        fetchSpecifiedCountryData(country)
    }
  return (
    <>
    <div>
      <Input size='sm' type="text" label="country name" onChange={(e)=>{handleSearch(e)}}></Input>
    {loading && <Spinner size='sm' color='default' className='m-2'></Spinner>}
    </div>
    <div className='h-80 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-500
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
    {filteredContries.length > 0 &&
        <Listbox items={filteredContries} label="country-list">
            {(filteredContry)=>(
                filteredContry.flag?
                <ListboxItem key={filteredContry.name} endContent={<Image src={filteredContry.flag} width={20} height={20} className='w-6 h-auto' alt='country flag'/>} onClick={(e)=>{handleClick(e.currentTarget.textContent || "")}}>{filteredContry.name}</ListboxItem>
                :
                <ListboxItem key={filteredContry.name} onClick={(e)=>{handleClick(e.currentTarget.textContent || "")}}>{filteredContry.name}</ListboxItem>
            )}
        </Listbox>
    }
    </div>
    </>
  )
}

export default Search
