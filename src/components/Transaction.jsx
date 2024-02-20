import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Navbar from './navbar/Navbar'
import axios from 'axios'
import { BASE_ACCOUNT, BASE_CUSTOMER, BASE_TRANSACTION, TRANSFER, WITHDRAW } from '../constant/Endpoint'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { selectUser } from './redux/UserSlice'

const Transaction = () => {

    const user = useDispatch(selectUser)

    const [showWithdraw, setShowWithdraw] = useState(false)
    const [showDeposit, setShowDeposit] = useState(false)
    const [showTransferOther, setShowTransferOther] = useState(false)
    const [showTransferOwn, setShowTransferOwn] = useState(false)
    const [balance, setBalance] = useState(0)
    const [bankData, setBankData] = useState(null)

    const [accountNumberList, setAccountNumberList] = useState([])
    const [formData, setFormData] = useState({
        dummyBankId: '',
        accountId: '',
        amount: 0,
        fromNumber: '',
        toNumber: '',
    })

    console.log(formData)


    const getAccountList = async() => {
        await axios
            .get(BASE_ACCOUNT)
            .then(res => {
                setAccountNumberList(res.data.data)
            })
            .catch(err => console.error(err))
    }

    const getBankData = async() => {
        await axios.get(BASE_CUSTOMER + "/" + user.customerId)
            .then(res => {
                setBankData(res.data.data.bankData)
                setFormData({...formData, dummyBankId: bankData})
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAccountList()
        getBankData()
    }, [])

    const accountOption = accountNumberList.map((account) => (
        <>
        <option value={[account.accountNumber, account.balance]}>{account.currency.code}</option>
        </>
    ))

    const accountNumberOption = accountNumberList.map((account) => (
        <>
        <option value={[account, account.balance]}>{account.currency.code}</option>
        </>
    ))

    const handleWithdrawal = () => {
        if (formData.accountId && formData.amount > 0) {
            if (formData.amount > balance) {
                Swal.fire("Insufficient balance")
            }
            axios.post(WITHDRAW, {
                accountId: formData.accountId,
                amount: formData.amount
            })
                .then(res => {
                    console.log(res.data.data)
                    Swal.fire({
                        icon: "success",
                        title: "Yay! Success! Save your withdrawal code",
                        text: "Code: " + res.data.data.withdrawalCode,
                        showConfirmButton: true,
                        timer: 1500
                    });
                    setFormData({...formData, accountId: '', amount: 0})
                    setBalance(0)
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire({
                        icon: "error",
                        title: err.message,
                        showConfirmButton: false,
                        timer: 1000
                    });
                })
        }
        else Swal.fire("Please enter a valid data")
    }

    const handleTransferToOther = () => {
        if (formData.fromNumber && formData.toNumber && formData.amount > 0) {
            if (formData.amount > balance) {
                Swal.fire("Insufficient balance")
            }
            axios.post(TRANSFER, {
                fromNumber: formData.fromNumber,
                amountTransfer: formData.amount,
                toNumber: formData.toNumber,
            })
                .then(res => {
                    console.log(res.data.data)
                    Swal.fire({
                        icon: "success",
                        title: "Transfer Success!",
                        text: res.data.message,
                        showConfirmButton: true,
                        timer: 1500
                    });
                    setFormData({...formData, fromNumber: '', toNumber: '', amount: 0})
                    setBalance(0)
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire({
                        icon: "error",
                        title: err.message,
                        showConfirmButton: false,
                        timer: 1000
                    });
                })
            }
            else Swal.fire("Please enter a valid data")
        }

        const handleDeposit = () => {
            if (formData.dummyBankId && formData.accountId && formData.amount > 0) {
                if (formData.amount > balance) {
                    Swal.fire("Insufficient balance")
                }
                axios.post(BASE_TRANSACTION, {
                    dummyBankId: formData.dummyBankId,
                    accountId: formData.accountId,
                    amount: formData.amount,
                })
                    .then(res => {
                        console.log(res.data.data)
                        Swal.fire({
                            icon: "success",
                            title: "Deposit Success!",
                            text: res.data.message,
                            showConfirmButton: true,
                            timer: 1500
                        });
                        setFormData({...formData, dummyBankId: '', accountId: '', amount: 0})
                        setBalance(0)
                    })
                    .catch((err) => {
                        console.error(err)
                        Swal.fire({
                            icon: "error",
                            title: err.message,
                            showConfirmButton: false,
                            timer: 1000
                        });
                    })
                }
                else Swal.fire("Please enter a valid data")
            }


  return (
    <div>
      <Navbar />
      <div style={{ padding: 50, backgroundColor: "#A9BA9D" }}>
        <div>
          <h1 style={{ color: "black", textAlign: "center" }}>TRANSACTION</h1>
          <p style={{ color: "black", textAlign: "center" }}>
            Hassle free transaction with Super Wallet
          </p>
        </div>
        <div
          style={{
            padding: 25,
            backgroundColor: "#FFF7ED",
            borderRadius: "20px",
          }}
        >
          <section className="m-3">
            <h2>Transfer</h2>
            <p>Select a category</p>
            <Button variant="success m-3" style={{ width: 400 }} onClick={() => setShowTransferOther(true)}>
              <h3 style={{ textAlign: "left" }}>Transfer to Other Account</h3>
              <p
                style={{
                  textAlign: "left",
                  fontWeight: "lighter",
                  fontSize: 12,
                }}
              >
                Pay bill or give to loved ones
              </p>
            </Button>
            {/* <br></br> */}
            <Button variant="success m-3" style={{ width: 400 }}>
              <h3 style={{ textAlign: "left" }}>Transfer to Own Account</h3>
              <p
                style={{
                  textAlign: "left",
                  fontWeight: "lighter",
                  fontSize: 12,
                }}
              >
                Transfer wealth to your other wallet
              </p>
            </Button>
          </section>
          <section className="m-3">
            <h2>Deposit</h2>
            <Button variant="success m-3" style={{ width: 400 }} onClick={() => setShowDeposit(true)}>
              <h3 style={{ textAlign: "left" }}>Top Up Your Wallet</h3>
              <p
                style={{
                  textAlign: "left",
                  fontWeight: "lighter",
                  fontSize: 12,
                }}
              >
                Keep your wallet filled
              </p>
            </Button>
          </section>
          <section className="m-3">
            <h2>Withdraw</h2>
            <Button
              variant="success m-3"
              style={{ width: 400 }}
              onClick={() => setShowWithdraw(true)}
            >
              <h3 style={{ textAlign: "left" }}>Cash Withdrawal</h3>
              <p
                style={{
                  textAlign: "left",
                  fontWeight: "lighter",
                  fontSize: 12,
                }}
              >
                Get a withdrawal code based on your wallet's currency
              </p>
            </Button>
          </section>
        </div>
      </div>

      <Modal
        show={showWithdraw}
        onHide={() => setShowWithdraw(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Withdaw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label>Select an account</label>
              <select
                name="Currency"
                className='form-select'
                onChange={(e) => {
                    setFormData({...formData, accountId: e.target.value.split(",")[0]})
                    setBalance(e.target.value.split(",")[1])
                    console.log("change", e.target.value)
                }}
            >
                <option disabled>Please select an account</option>
                {accountOption}
                </select>
            </div>
            <div className="mb-2">
              <label>Amount</label>
              <input
                type="number"
                name="address"
                className="form-control"
                placeholder="Enter withdraw amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
          </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Balance: {balance}</label>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setFormData({...formData, accountId: '', amount: 0})
            setShowWithdraw(false)}
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleWithdrawal}>
            Get Withdrawal Code
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTransferOther}
        onHide={() => setShowTransferOther(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Transfer to Other Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label>Select source account</label>
              <select
                name="Currency"
                className='form-select'
                onChange={(e) => {
                    setFormData({...formData, fromNumber: e.target.value.split(",")[0]})
                    setBalance(e.target.value.split(",")[1])
                    console.log("change", e.target.value)
                }}
            >
                <option disabled>Please select an account</option>
                {accountOption}
                </select>
            </div>
            <div className="mb-2">
              <label>Amount</label>
              <input
                type="number"
                name="address"
                className="form-control"
                placeholder="Enter withdraw amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label> Destination</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter destined account number"
                onChange={(e) =>
                  setFormData({ ...formData, toNumber: e.target.value })
                }
              />
            </div>
          </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Balance: {balance}</label>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setFormData({...formData, fromNumber: '', toNumber: '', amount: 0})
            setShowTransferOther(false)}
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTransferToOther}>
            Transfer Now
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeposit}
        onHide={() => setShowDeposit(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label>Select deposit destination account</label>
              <select
                name="Currency"
                className='form-select'
                onChange={(e) => {
                    setFormData({...formData, accountId: e.target.value.split(",")[0]})
                    setBalance(e.target.value.split(",")[1])
                    console.log("change", e.target.value)
                }}
            >
                <option disabled>Please select an account</option>
                {accountOption}
                </select>
            </div>
            <div className="mb-2">
              <label>Amount</label>
              <input
                type="number"
                name="address"
                className="form-control"
                placeholder="Enter withdraw amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Bank Source: {bankData ? bankData : "You have not registered a bank data yet"}</label>
              {bankData == null && <Button variant='success'>Register Bank</Button>}
            </div>
          </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Balance: {balance}</label>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setFormData({...formData, accountId: '', amount: 0})
            setShowDeposit(false)}
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleDeposit}>
            Deposit Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
        }

export default Transaction