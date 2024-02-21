import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getTransactionByPage } from '../constant/Endpoint';
import Swal from 'sweetalert2';

const TransactionHistoryList = () => {

    const [transactionList, setTransactionList] = useState([]);
    const [transactionCount, setTransactionCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const getTransactionListbyPage = async(page) => {
        await axios
            .get(getTransactionByPage(page))
            .then(res => {
                setTransactionCount(res.data.pagingResponse.totalItem)
                setTransactionList(res.data.data)
                setTotalPage(res.data.pagingResponse.totalPage)
            })
            .catch(err => console.error(err.message))
    }

    useEffect(() => {
        getTransactionListbyPage(currentPage)
    }, [currentPage])

    const displayEmptyList = (
        <div className="text-center">
            <div className="d-flex justify-content-center empty">
                  <img src="./../src/assets/images/Empty.png" alt="Empty Picture" />
                </div>
            <p className='empty-info'>The transaction history list is empty</p>
        </div>
    )

    const displayTransactions = transactionList.map((transaction) => (
            <tr key={Math.random()}>
                <td><div style={{cursor:'pointer'}} onClick={() => {
                    Swal.fire(
                        "SOURCE ACCOUNT DETAILS\n\n" +
                        `Account Number: ${transaction.source.accountNumber}\n` +
                        `Currency Code: ${transaction.source.currencyCode}\n` +
                        `${transaction.source.currencyName}`
                    )   
                }}>{transaction.source.firstName + " " + transaction.source.lastName}</div></td>
                <td><div style={{cursor:'pointer'}} onClick={() => {
                    Swal.fire(
                        "DESTINATION ACCOUNT DETAILS\n\n" +
                        `Account Number: ${transaction.destination.accountNumber}\n` +
                        `Currency Code: ${transaction.destination.currencyCode}\n` +
                        `${transaction.destination.currencyName}`
                    )   
                }}>{transaction.destination.firstName + " " + transaction.destination.lastName}</div></td>
                <td>{transaction.totalAmount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.totalFee}</td>
                <td>{transaction.withdrawalCode}</td>
            </tr>
    ));

    const displayTable = (
        <div className="container">
            <div className="row">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th scope='col'>Source</th>
                            <th scope='col'>Destination</th>
                            <th scope='col'>Total Amount</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Transaction Type</th>
                            <th scope='col'>Total Fee</th>
                            <th scope='col'>Withdrawal Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTransactions}
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
    <div>
        <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{transactionCount}</p>
        <p style={{marginBottom:25, textAlign: 'center'}}>{"Total Transaction"}</p>
        <div style={{textAlign: 'center'}}>{transactionList.length === 0 ? displayEmptyList : displayTable}</div>
        <div style={{textAlign: 'center'}}>{totalPage > 1 && displayPagination }</div>
    </div>
  )
}

export default TransactionHistoryList