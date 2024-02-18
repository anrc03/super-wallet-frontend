import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getBaseTransactionUrl } from '../constant/Endpoint';

const TransactionHistoryList = () => {

    const [transactionList, setTransactionList] = useState([]);
    const [size, setSize] = useState(5);

    const getTransactionList = async() => {
        await axios
            .get(getBaseTransactionUrl(size))
            .then(res => setTransactionList(res.data.data))
            .catch(err => console.error(err.message))
    }

    useEffect(() => {
        getTransactionList()
    }, [])

    const displayEmptyList = (
        <div className="text-center">
            <h2>List is Empty</h2>
        </div>
    )

    const displayTransactions = transactionList.map((transaction) => (
            <tr key={transaction.source.accountNumber + transaction.destination.accountNumber + transaction.totalAmount}>
                <td>{transaction.source.accountNumber}</td>
                <td>{transaction.destination.accountNumber}</td>
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
                <table className="table table-bordered">
                    <thead className="thead-light">
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
        <p style={{marginBottom: -5, textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{transactionList.length}</p>
        <p style={{marginBottom:25, textAlign: 'center'}}>{"Total Transaction"}</p>
    </div>
  )
}

export default TransactionHistoryList