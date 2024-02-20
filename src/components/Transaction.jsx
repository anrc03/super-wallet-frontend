import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Navbar from './navbar/Navbar'
import axios from 'axios'
import { BASE_ACCOUNT } from '../constant/Endpoint'

const Transaction = () => {

    const [accountNumberList, setAccountNumberList] = useState([])
    const [formData, setFormData] = useState({
        dummyBankId: '',
        accountId: '',
        amount: '',
        fromNumber: '',
        toNumber: '',
    })


    const getAccountList = async() => {
        await axios
            .get(BASE_ACCOUNT)
            .then(res => {
                setAccountNumberList(res)
            })
            .catch(err => console.error(err))
    }

    const handleDeposit = () => {
        
    }


  return (
    <div>
        <Navbar/>
        <div style={{padding:50, backgroundColor:'#A9BA9D'}}>
            <div>
                <h1 style={{color:'black', textAlign:'center'}}>TRANSACTION</h1>
                <p style={{color:'black', textAlign:'center'}}>Hassle free transaction with Super Wallet</p>
            </div>
            <div style={{padding:25, backgroundColor:'#FFF7ED', borderRadius:'20px'}}>
                <section className='m-3'>
                    <h2>Transfer</h2>
                    <p>Select a category</p>
                    <Button variant='success m-3' style={{width:400}}>
                        <h3 style={{textAlign:'left'}}>Transfer to Other Account</h3>
                        <p style={{textAlign:'left', fontWeight:'lighter', fontSize:12}}>Pay bill or give to loved ones</p>
                    </Button>
                    {/* <br></br> */}
                    <Button variant='success m-3' style={{width:400}}>
                        <h3 style={{textAlign:'left'}}>Transfer to Own Account</h3>
                        <p style={{textAlign:'left', fontWeight:'lighter', fontSize:12}}>Transfer wealth to your other wallet</p>
                    </Button>
                </section>
                <section className='m-3'>
                    <h2>Deposit</h2>
                    <Button variant='success m-3' style={{width:400}}>
                        <h3 style={{textAlign:'left'}}>Top Up Your Wallet</h3>
                        <p style={{textAlign:'left', fontWeight:'lighter', fontSize:12}}>Keep your wallet filled</p>
                    </Button>
                </section>
                <section className='m-3'>
                    <h2>Withdraw</h2>
                    <Button variant='success m-3' style={{width:400}}>
                        <h3 style={{textAlign:'left'}}>Cash Withdrawal</h3>
                        <p style={{textAlign:'left', fontWeight:'lighter', fontSize:12}}>Get a withdrawal code based on your wallet's currency</p>
                    </Button>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Transaction