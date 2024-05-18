import React, { useEffect } from 'react'
import { useState } from "react";
import axios from "axios";

export default function Main() {

    const [date,setDate]=useState(null);
    const [sourceCurrency,setSourceCurrency]=useState("");
    const [targetCurrency,setTargetCurrency]=useState("");
    const [amountInSourceCurrency,setAmountInSourceCurrency]=useState(1);
    const [amountInTargetCurrency,setAmountInTargetCurrency]=useState(0);
    const [currencyNames,setCurrencyNames]=useState([]);
    const [loading,setLoading]=useState(true);

    //get currency names

    useEffect( ()=>{
        const getcurrencyNames=async ()=>{
            try {
                const response=await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setCurrencyNames(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getcurrencyNames();
    },[] );






    const handleSubmit= async(e)=>{
        e.preventDefault();
        //console.log(date,setSourceCurrency,targetCurrency,amountInSourceCurrency,sourceCurrency);
        try {
            const response=await axios.get("http://localhost:5000/convert",{
                params:{
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountInSourceCurrency
                }
            });

            setAmountInTargetCurrency(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };



  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-500 text-center'>Convert your Currencies</h1>
        

        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>
                    
                        <div className="mb-4">
                            <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Date
                            </label>

                            <input 
                                onChange={(e)=>setDate(e.target.value)}
                                type="Date" 
                                id={date} 
                                name= {date} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor={sourceCurrency} 
                            name={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>

                            <select
                                onChange={(e)=>setSourceCurrency(e.target.value)}
                            id={sourceCurrency} name={sourceCurrency} value={sourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">


                                <option value="">Select Source currency</option>
                                {Object.keys(currencyNames).map((currency)=>(
                                    <option className='' key={currency} value={currency}>
                                        {currencyNames[currency]}

                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="mb-4">
                            <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>

                            <select
                                onChange={(e)=>setTargetCurrency(e.target.value)}
                                id={targetCurrency} name={targetCurrency} value={targetCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">


                                <option value="">Select target currency</option>
                                {Object.keys(currencyNames).map((currency)=>(
                                    <option className='' key={currency} value={currency}>
                                        {currencyNames[currency]}

                                    </option>
                                ))}
                            </select>
                            
                        </div>

                        <div className="mb-4">
                            <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>

                            <input
                                onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
                                type="number" name={amountInSourceCurrency} id={amountInSourceCurrency} value={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Amount in source currency" required />
                        </div>
                        <div class="flex justify-center items-center h-full">
                            <button className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md '>
                                 Get
                         </button>
                         </div>
                         


                </form>
            </section>
        </div>

        {!loading ?  <div class="flex justify-center items-center h-full">
  <a href="#" class="block max-w-fit p-6 m-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {amountInSourceCurrency} {sourceCurrency} = {amountInTargetCurrency} {targetCurrency}
    </h5>

  </a>
</div>
:(null)}

        
       

        

        
    </div>
  )
}
