import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getBaseCurrencyUrl } from '../constant/Endpoint';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2';

const ExchangeRateList = () => {

    const todaysDate = new Date()
    
    const [rateList, setRateList] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState("")
    const [date, setDate] = useState(todaysDate.toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(false)

    console.log(baseCurrency)

    
    const getRateList = async() => {
        await axios
            .post(getBaseCurrencyUrl(baseCurrency, date))
            .then(res => {
                console.log(res.data)
                setRateList(res.data.data)
                setIsLoading(false)
            })
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "Data Not Available",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 900
                })
            })
    }

    const handleClickRefresh = async() => {
      if (isLoading === false) {
        setIsLoading(true)
        await getRateList();
      }
    }

    const displayEmptyList = (
        <div className="text-center">
            <h2>List is Empty</h2>
        </div>
    )

    const displayRates = rateList.map((rate) => (
            <tr key={rate.baseCurrency + rate.targetCurrency}>
                <td>{rate.date}</td>
                <td>{rate.baseCurrency}</td>
                <td>{rate.targetCurrency}</td>
                <td>{rate.rate}</td>
            </tr>
    ));

    const displayTable = (
        <div className="container">
            <div className="row">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope='col'>Date</th>
                            <th scope='col'>Base Currency</th>
                            <th scope='col'>Target Currency</th>
                            <th scope='col'>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayRates}
                    </tbody>
                </table>
            </div>
        </div>
    )

  return (
    <>
      {/* <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{baseCurrency}</p> */}
      <div className="justify-content-center align-items-center d-flex mb-4 mt-2">
        <select
          name="Currency Rate"
          onChange={(e) => setBaseCurrency(e.target.value)}
          disabled={isLoading}
        >
          <option value="">--Please choose an option--</option>
          <option value="IDR">IDR</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="SGD">SGD</option>
          <option value="AUD">AUD</option>
          <option value="KRW">KRW</option>
          <option value="MYR">MYR</option>
          <option value="GBP">GBP</option>
        </select>
        <button onClick={handleClickRefresh}>Refresh</button>
        <ReactDatePicker
          className="date-input"
          showIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <mask id="ipSApplication0">
                <g
                  fill="none"
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                  <path
                    fill="#fff"
                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                  ></path>
                </g>
              </mask>
              <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipSApplication0)"
              ></path>
            </svg>
          }
          selected={date}
          onChange={(date) => setDate(moment(date).format("yyyy-MM-DD"))}
          dateFormat={"yyyy-MM-dd"}
          placeholderText="Enter your birth date"
        />
      </div>
      <div style={{ textAlign: "center" }}>
        {isLoading ? <h1>Loading...</h1> : rateList.length == 0 ? displayEmptyList : displayTable}
      </div>
    </>
  );
}

export default ExchangeRateList