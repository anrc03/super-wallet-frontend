import React, { useEffect, useState } from 'react'
import { GET_TRANSACTION_CUSTOMER } from '../constant/Endpoint'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from './navbar/Navbar'

const CustomerDashboard = () => {

    const [transactionList, setTransactionList] = useState([])

    const getTransactionList = async () => {
        await axios
            .get(GET_TRANSACTION_CUSTOMER)
            .then(res => {
                setTransactionList(res.data.data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getTransactionList()
    }, [])

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
            <td><div style={{ cursor: 'pointer' }} onClick={() => {
                Swal.fire(
                    "SOURCE ACCOUNT DETAILS\n\n" +
                    `Account Number: ${transaction.source.accountNumber}\n` +
                    `Currency Code: ${transaction.source.currencyCode}\n` +
                    `${transaction.source.currencyName}`
                )
            }}>{transaction.source.firstName + " " + transaction.source.lastName}</div></td>
            <td><div style={{ cursor: 'pointer' }} onClick={() => {
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

    return (
        <div>
            <Navbar />
            <p style={{ marginTop: 25, textAlign: 'center' }}>{"You have"}</p>
            <p style={{ marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>{transactionList.length}</p>
            <p style={{ marginBottom: 25, textAlign: 'center' }}>{"Total Transaction"}</p>
            <div style={{ textAlign: 'center' }}>{transactionList.length === 0 ? displayEmptyList : displayTable}</div>
        </div>
    )
}

export default CustomerDashboard