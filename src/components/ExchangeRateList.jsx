import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getBaseCurrencyUrl, getCurrencyWithTimeSeriesUrl, getTodaysCurrencyUrl } from '../constant/Endpoint';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2';
import SmallLoadingSpinner from './SmallLoadingSpinner';

const ExchangeRateList = () => {

    const todaysDate = new Date()
    
    const [rateList, setRateList] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState("")
    const [date, setDate] = useState(todaysDate.toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(todaysDate.toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    
    const getRateList = async() => {
        await axios
            .post(getCurrencyWithTimeSeriesUrl(date, toDate, baseCurrency))
            .then(res => {
                console.log(res.data)
                setTotalPage(res.data.pagingResponse.totalPage)
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
                setIsLoading(false)
            })
    }

    const getRateListByPage = async() => {
      await axios
          .post(getCurrencyWithTimeSeriesUrl(date, toDate, baseCurrency) + `&page=${currentPage}`)
          .then(res => {
              setRateList(res.data.data)
              setIsLoading(false)
          })
          .catch(err => {
              console.error(err)
              setIsLoading(false)
          })
    }

    useEffect(() => {
      getRateListByPage(currentPage)
    }, [currentPage])

    const getTodaysRateList = async() => {
      if(!baseCurrency) Swal.fire("Please select a base currency")
      await axios
          .post(getTodaysCurrencyUrl(baseCurrency))
          .then(res => {
              console.log(res.data)
              setRateList(res.data.data)
              setIsLoading(false)
              setTotalPage(0)
              setCurrentPage(0)
          })
          .catch(err => {
              Swal.fire({
                  title: "Error",
                  text: "Data Not Available",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 900
              })
              setIsLoading(false)
          })
    }

    // console.log(baseCurrency)
    // console.log(totalPage)

    const handleClickRefresh = async() => {
      if (isLoading === false) {
        setIsLoading(true)
        await getRateList();
      }
    }

    const handleClickToday = async() => {
      if (isLoading === false) {
        setIsLoading(true)
        await getTodaysRateList();
      }
    }

    const displayEmptyList = (
        <div className="text-center">
          <div className="d-flex justify-content-center sorry">
                  <img src="./../src/assets/images/Sorry.png" alt="Sorry Picture" />
                </div>
            <p className='sorry-info'>Please select a country and date to view currency history, then click refresh</p>
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
                <table className="content-table">
                    <thead>
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

    const handlePrevious = async () => {
      if (currentPage != 0) {
          setCurrentPage(currentPage - 1)
      }
    }

    const handleNext = async () => {
        setCurrentPage(currentPage + 1)
    }
    const displayPagination = (
      <div className="justify-content-center align-items-center d-flex mt-4">
          <button onClick={handlePrevious} disabled={currentPage === 0}><i className="bi bi-caret-left-fill"></i></button>
          <div className='m-2' style={{fontSize:15}}>{currentPage + 1}</div>
          <button onClick={handleNext} disabled={currentPage === totalPage - 1}><i className="bi bi-caret-right-fill"></i></button>
      </div>
  )

  return (
    <>
      {/* <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{baseCurrency}</p> */}
      <div className="justify-content-center align-items-center d-flex mb-4 mt-2 exchange">
        <select
          name="Currency Rate"
          className='form-select'
          onChange={(e) => setBaseCurrency(e.target.value)}
          disabled={isLoading}>
          <option disabled selected>Please select a country</option>
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
      </div>
        
      <div className="justify-content-center align-items-center d-flex mb-4 mt-2 exchange">
        <div>from</div>

        <ReactDatePicker
          className="date-exchange"
          showIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
              style={{ width: "20px", height: "20px", marginTop: "1px" }}
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
          placeholderText="Enter date"
        />

        <div>to</div>

        <ReactDatePicker
          className="date-exchange"
          showIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
              style={{ width: "20px", height: "20px", marginTop: "1px" }}
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
          selected={toDate}
          onChange={(date) => setToDate(moment(date).format("yyyy-MM-DD"))}
          dateFormat={"yyyy-MM-dd"}
          placeholderText="Enter date"
        />
      </div>
      <div className="justify-content-center align-items-center d-flex mb-4"><button className="btn btn-green" onClick={handleClickRefresh}>Get Rate by Time Series</button></div>
      <div className="justify-content-center align-items-center d-flex mb-4"><button className="btn btn-green" onClick={handleClickToday}>Get Today's Rate Only</button></div>
      <div style={{ textAlign: "center" }}>
        {isLoading ? <SmallLoadingSpinner/>: rateList.length == 0 ? displayEmptyList : displayTable}
      </div>
      <div style={{textAlign: 'center'}}>{totalPage > 1 && displayPagination }</div>
    </>
  );
}

export default ExchangeRateList