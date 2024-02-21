import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Navbar from './navbar/Navbar'
import axios from 'axios'
import { BASE_ACCOUNT, BASE_CUSTOMER, BASE_DUMMY_BANK, BASE_TRANSACTION, TRANSFER, WITHDRAW } from '../constant/Endpoint'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/UserSlice'

const Transaction = () => {

    const user = useSelector(selectUser)

    const [showWithdraw, setShowWithdraw] = useState(false)
    const [showDeposit, setShowDeposit] = useState(false)
    const [showTransfer, setShowTransfer] = useState(false)
    const [showOwnTransfer, setShowOwnTransfer] = useState(false)
    const [showRegisterBank, setShowRegisterBank] = useState(false)
    const [balance, setBalance] = useState(0)
    const [destinationBalance, setDestinationBalance] = useState(0)
    const [bankData, setBankData] = useState(null)

    const [accountNumberList, setAccountNumberList] = useState([])
    const [formData, setFormData] = useState({
        dummyBankId: '',
        accountId: '',
        amount: 0,
        fromNumber: '',
        toNumber: '',
    })

    const [bankForm, setBankForm] = useState({
      cardNumber: '',
      cvv: '',
      holderName: '',
      expDate: '',
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
                setFormData({...formData, dummyBankId: bankData.id})
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAccountList()
        getBankData()
    }, [])

    const accountNumberOption = accountNumberList.map((account) => (
        <>
        <option value={[account.accountNumber, account.balance]}>{account.currency.code}</option>
        </>
    ))

    const accountIdOption = accountNumberList.map((account) => (
        <>
        <option value={[account.id, account.balance]}>{account.currency.code}</option>
        </>
    ))


    const handleWithdrawal = () => {
        if (formData.accountId && formData.amount > 0) {
            if (formData.amount > balance) {
                Swal.fire("Insufficient balance")
                return;
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

    const handleTransfer = () => {
        if (formData.fromNumber && formData.toNumber && formData.amount > 0) {
            if (formData.amount > balance) {
                Swal.fire("Insufficient balance")
                return;
            }
            if (formData.fromNumber === formData.toNumber) {
                Swal.fire("Cannot transfer to same wallet")
                return;
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

        const handleRegisterBank = () => {
          if (bankForm.cardNumber && bankForm.holderName && bankForm.cvv && bankForm.expDate) {
              axios.post(BASE_DUMMY_BANK, {
                  cardNumber: bankForm.cardNumber,
                  cvv: bankForm.cvv,
                  holderName: bankForm.holderName,
                  expDate: bankForm.expDate
              })
                    .then(res => {
                      console.log(res.data.data)
                      Swal.fire({
                          icon: "success",
                          title: "Bank Successfully Registered!",
                          text: res.data.message,
                          showConfirmButton: true,
                          timer: 1500
                      });
                      setBankForm({...bankForm, cardNumber:'', cvv:'', holderName:'', expDate:''})
                      getAccountList()
                      getBankData()
                      setShowRegisterBank(false)
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

          const displayBankData = () => bankData !== null && (
            <>
              <div className='mt-2'>Card Number: {bankData.cardNumber}</div>
              <div className='m-0'>Holder Name: {bankData.holderName}</div>
              <div className='m-0'>Expiry Date: {bankData.expDate}</div>
            </>
          )


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
            <Button variant="success m-3" style={{ width: 400 }} onClick={(e) => {setShowTransfer(true)}}>
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
            <br></br>
            <Button variant="success m-3" style={{ width: 400 }} onClick={(e) => {setShowOwnTransfer(true)}}>
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
          <Modal.Title>Withdraw</Modal.Title>
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
                <option value="">Please select an account</option>
                {accountIdOption}
                </select>
            </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Wallet Balance: {balance}</label>
            </div>
            <div className="mb-2">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Enter withdraw amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
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
        show={showTransfer}
        onHide={() => setShowTransfer(false)}
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
                <option value="">Please select an account</option>
                {accountNumberOption}
                </select>
            </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Wallet Balance: {balance}</label>
            </div>
            <div className="mb-2">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Enter withdraw amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                className="form-control"
                placeholder="Enter destined account number"
                onChange={(e) =>
                  setFormData({ ...formData, toNumber: e.target.value })
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setFormData({...formData, fromNumber: '', toNumber: '', amount: 0})
            setShowTransfer(false)}
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTransfer}>
            Transfer Now
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOwnTransfer}
        onHide={() => setShowOwnTransfer(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Transfer to Your Other Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label>Select source account</label>
              <select
                name="Source currency"
                className='form-select'
                onChange={(e) => {
                    setFormData({...formData, fromNumber: e.target.value.split(",")[0]})
                    setBalance(e.target.value.split(",")[1])
                    console.log("change", e.target.value)
                }}
            >
                <option value="">Please select an account</option>
                {accountNumberOption}
                </select>
            </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Source Balance: {balance}</label>
            </div>
            <div className="mb-2">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Enter withdraw amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Select destination account</label>
              <select
                name="Destination currency"
                className='form-select'
                onChange={(e) => {
                    setFormData({...formData, toNumber: e.target.value.split(",")[0]})
                    setDestinationBalance(e.target.value.split(",")[1])
                    console.log("change", e.target.value)
                }}
            >
                <option value="">Please select destination account</option>
                {accountNumberOption}
                </select>
            </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Destination Balance: {destinationBalance}</label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setDestinationBalance(0)
            setFormData({...formData, fromNumber: '', toNumber: '', amount: 0})
            setShowOwnTransfer(false)}
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTransfer}>
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
                <option value="">Please select an account</option>
                {accountIdOption}
                </select>
            </div>
            <div className="mb-2">
              <label style={{fontWeight:'bold'}}>Wallet Balance: {balance}</label>
            </div>
            <div className="mb-2">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Enter deposit amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label style={{textDecoration: 'underline'}}>Bank Source </label>
              {bankData ? displayBankData() : <div>You have not registered a bank data yet</div>}
              {bankData == null && <Button variant='success' onClick={() => setShowRegisterBank(true)}>Register Bank</Button>}
            </div>
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

      <Modal
        show={showRegisterBank}
        onHide={() => setShowRegisterBank(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Register Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label>Card Number</label>
              <input
                type="text"
                name="card number"
                className="form-control"
                placeholder="Enter your card number"
                onChange={(e) =>
                  setBankForm({ ...bankForm, cardNumber: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                className="form-control"
                placeholder="Enter cvv"
                onChange={(e) =>
                  setBankForm({ ...bankForm, cvv: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Holder Name</label>
              <input
                type="text"
                name="holder"
                className="form-control"
                placeholder="Enter holder name"
                onChange={(e) =>
                  setBankForm({ ...bankForm, holderName: e.target.value })
                }
              />
            </div>
          </div>
            <div className="mb-2">
            <label>Expiry Date</label>
              <input
                type="text"
                name="holder"
                className="form-control"
                placeholder="Enter exp date"
                onChange={(e) =>
                  setBankForm({ ...bankForm, expDate: e.target.value })
                }
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBankForm({...bankForm, cardNumber: '', holderName: '', cvv: '', expDate: ''})
            setShowRegisterBank(false)}
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleRegisterBank}>
            Register Bank
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
        }

export default Transaction