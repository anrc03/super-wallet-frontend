import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Navbar from './navbar/Navbar'
import axios from 'axios'
import { BASE_ACCOUNT, BASE_CUSTOMER, BASE_DUMMY_BANK, BASE_TRANSACTION, CREATE_PIN, TRANSFER, WITHDRAW } from '../constant/Endpoint'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/UserSlice'
import PinInput from 'react-pin-input';
import Footer from './Footer'
import LoadSpinner from './LoadSpinner'
import { Helmet } from 'react-helmet'

const Transaction = () => {

  const user = useSelector(selectUser)

  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showOwnTransfer, setShowOwnTransfer] = useState(false)
  const [showRegisterBank, setShowRegisterBank] = useState(false)
  const [showRegisterPin, setShowRegisterPin] = useState(false)
  const [balance, setBalance] = useState(0)
  const [destinationBalance, setDestinationBalance] = useState(0)
  const [bankData, setBankData] = useState(null)
  const [yyDate, setYyDate] = useState("")
  const [mmDate, setMmDate] = useState("")

  const [havePin, setHavePin] = useState(false)
  const [pin, setPin] = useState(null);

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

  const getAccountList = async () => {
    await axios
      .get(BASE_ACCOUNT)
      .then(res => {
        setAccountNumberList(res.data.data)
      })
      .catch(err => console.error(err))
  }

  const getBankData = async () => {
    await axios.get(BASE_CUSTOMER + "/" + user.customerId)
      .then(res => {
        res.data.data.userCredential.pin && setHavePin(true)
        setBankData(res.data.data.bankData)
        setFormData({ ...formData, dummyBankId: bankData.id })
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

  const accountIdOptionDeposit = accountNumberList.map((account) => (
    <>
      <option value={[account.id, account.balance]} disabled={account.currency.code !== "IDR"}>{account.currency.code}</option>
    </>
  ))

  const accountIdOption = accountNumberList.map((account) => (
    <>
      <option value={[account.id, account.balance]}>{account.currency.code}</option>
    </>
  ))

  const handleWithdrawal = () => {
    if (formData.accountId && formData.amount > 0 && pin) {
      if (parseFloat(formData.amount) > balance) {
        Swal.fire("Insufficient balance")
        return;
      }
      axios.post(WITHDRAW, {
        accountId: formData.accountId,
        amount: formData.amount,
        pin: pin
      })
        .then(res => {
          // console.log(res.data.data)
          Swal.fire({
            icon: "success",
            title: "Success! Save your withdrawal code or get them via your email in case you forgot ;)",
            text: "Code: " + res.data.data.withdrawalCode,
            showConfirmButton: true,
          });
          setFormData({ ...formData, accountId: '', amount: 0 })
          setPin("")
          setShowWithdraw(false)
          setBalance(0)
          getAccountList()
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
    if (formData.fromNumber && formData.toNumber && formData.amount > 0 && pin) {
      if (parseFloat(formData.amount) > balance) {
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
        pin: pin
      })
        .then(res => {
          // console.log(res.data.data)
          Swal.fire({
            icon: "success",
            title: "Transfer Success!",
            text: res.data.message,
            showConfirmButton: true,
          });
          setFormData({ ...formData, fromNumber: '', toNumber: '', amount: 0 })
          setPin("")
          setShowTransfer(false)
          setShowOwnTransfer(false)
          setBalance(0)
          setDestinationBalance(0)
          getAccountList()
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
    if (formData.dummyBankId && formData.accountId && formData.amount > 0 && pin) {
      axios.post(BASE_TRANSACTION, {
        accountId: formData.accountId,
        amount: formData.amount,
        pin: pin
      })
        .then(res => {
          // console.log(res.data.data)
          Swal.fire({
            icon: "success",
            title: "Deposit Success!",
            text: res.data.message,
            showConfirmButton: true,
            timer: 1500
          });
          setFormData({ ...formData, dummyBankId: '', accountId: '', amount: 0 })
          setPin("")
          setBalance(0)
          setShowDeposit(false)
          getAccountList()
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
    if (bankForm.cardNumber && bankForm.holderName && bankForm.cvv && yyDate && mmDate) {
      if (yyDate < 24) {
        Swal.fire("Card exp date invalid")
        return;
      }
      if (mmDate <= 0 || mmDate > 12) {
        Swal.fire("Card exp date invalid")
        return;
      }
      axios.post(BASE_DUMMY_BANK, {
        cardNumber: bankForm.cardNumber,
        cvv: bankForm.cvv,
        holderName: bankForm.holderName,
        expDate: yyDate + "/" + mmDate
      })
        .then(res => {
          Swal.fire({
            icon: "success",
            title: "Bank Successfully Registered!",
            text: res.data.message,
            showConfirmButton: true,
            timer: 1500
          });
          setBankForm({ ...bankForm, cardNumber: '', cvv: '', holderName: '', expDate: '' })
          setYyDate("")
          setMmDate("")
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

  const handleRegisterPin = () => {
    if (pin && pin.length === 6) {
      axios.post(CREATE_PIN, { pin: pin, })
        .then(res => {
          Swal.fire({
            icon: "success",
            title: "Pin Successfully Created!",
            text: res.data.message,
            showConfirmButton: true,
            timer: 1500
          });
          setPin("")
          setHavePin(true)
          getAccountList()
          getBankData()
          setShowRegisterPin(false)
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500)
  }, [])

  if (isLoading) return <LoadSpinner />

  return (
    <div>
      <Helmet>
        <title>Transaction | Super Wallet</title>
      </Helmet>
      <Navbar />
      <div style={{ paddingBottom: 50, paddingRight: 50, paddingLeft: 50 }}>
        <div
          style={{
            padding: 25,
            backgroundColor: "#b6d7a8",
            borderRadius: "20px",
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <section className="m-4">
                <h2>Transfer</h2>
                <p>Select a category</p>
                <Button className='btn-green' style={{ width: 400, paddingLeft: 20, paddingTop: 20, marginBottom: '10px' }} onClick={(e) => { setShowTransfer(true) }}>
                  <h3 style={{ textAlign: "left", fontWeight: '600' }}>Transfer to other account</h3>
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
                <Button className='btn-green' style={{ width: 400, paddingLeft: 20, paddingTop: 20 }} onClick={(e) => { setShowOwnTransfer(true) }}>
                  <h3 style={{ textAlign: "left", fontWeight: '600' }}>Transfer to own account</h3>
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
                <Button className='btn-green' style={{ width: 400, paddingLeft: 20, paddingTop: 20 }} onClick={() => setShowDeposit(true)}>
                  <h3 style={{ textAlign: "left", fontWeight: '600' }}>Top up your wallet</h3>
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
                  className='btn-green'
                  style={{ width: 400, paddingLeft: 20, paddingTop: 20 }}
                  onClick={() => setShowWithdraw(true)}
                >
                  <h3 style={{ textAlign: "left", fontWeight: '600' }}>Cash withdrawal</h3>
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
            <div className="col-md-8 animate__animated animate_fadeIn">
              <div className="d-flex justify-content-center align-items-center animate__animated animate__pulse animate__infinite">
                <img src="./../src/assets/images/Histrory-Transaction.png" alt="Transaction Picture" style={{ width: '700px', animationDuration: "3s" }} />

              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showWithdraw}
        onHide={() => setShowWithdraw(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label className="mb-2">Select an account</label>
              <select
                name="Currency"
                className='form-select'
                onChange={(e) => {
                  setFormData({ ...formData, accountId: e.target.value.split(",")[0] })
                  setBalance(e.target.value.split(",")[1])
                }}
              >
                <option value="">Please select an account</option>
                {accountIdOption}
              </select>
            </div>
            <div className="mb-2">
              <label style={{ fontWeight: 'bold', color: '#6f9459' }}>Wallet balance : {balance}</label>
            </div>
            <div className="mb-2">
              <label className="mb-2">Amount</label>
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
              <label style={{ marginRight: 10 }}>PIN</label>
              {havePin ?
                <PinInput
                  length={6}
                  type='numeric'
                  secret
                  onChange={(value, index) => setPin(value)}
                />
                :
                <>
                  <div className="mb-2">You have not set a pin yet</div>
                  <Button variant='success' onClick={() => setShowRegisterPin(true)}>Create Pin</Button>
                </>
              }
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setFormData({ ...formData, accountId: '', amount: 0 })
            setShowWithdraw(false)
          }
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleWithdrawal} disabled={!havePin}>
            Get Withdrawal Code
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTransfer}
        onHide={() => setShowTransfer(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Transfer to other account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label className="mb-2">Select source account</label>
              <select
                name="Currency"
                className='form-select'
                onChange={(e) => {
                  setFormData({ ...formData, fromNumber: e.target.value.split(",")[0] })
                  setBalance(e.target.value.split(",")[1])
                }}
              >
                <option value="">Please select an account</option>
                {accountNumberOption}
              </select>
            </div>
            <div className="mb-2 mt-3">
              <label style={{ fontWeight: 'bold', color: '#6f9459' }}>Wallet balance : {balance}</label>
            </div>
            <div className="mb-2">
              <label className="mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Enter transfer amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="mb-2">Destination</label>
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

            <div className="mb-2">
              <label>PIN</label>
              {havePin ?
                <PinInput
                  length={6}
                  type='numeric'
                  secret
                  onChange={(value, index) => setPin(value)}
                />
                :
                <>
                  <div className='mb-2'>You have not set a pin yet</div>
                  <Button variant='success' onClick={() => setShowRegisterPin(true)}>Create Pin</Button>
                </>
              }
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setFormData({ ...formData, fromNumber: '', toNumber: '', amount: 0 })
            setShowTransfer(false)
          }
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTransfer} disabled={!havePin}>
            Transfer Now
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOwnTransfer}
        onHide={() => setShowOwnTransfer(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Transfer to your other wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label className="mb-2">Select source account</label>
              <select
                name="Source currency"
                className='form-select'
                onChange={(e) => {
                  setFormData({ ...formData, fromNumber: e.target.value.split(",")[0] })
                  setBalance(e.target.value.split(",")[1])
                }}
              >
                <option value="">Please select an account</option>
                {accountNumberOption}
              </select>
            </div>
            <div className="mb-2 mt-3">
              <label style={{ fontWeight: 'bold', color: '#6f9459' }}>Source balance : {balance}</label>
            </div>
            <div className="mb-2">
              <label className="mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Enter transfer amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="mb-2">Select destination account</label>
              <select
                name="Destination currency"
                className='form-select'
                onChange={(e) => {
                  setFormData({ ...formData, toNumber: e.target.value.split(",")[0] })
                  setDestinationBalance(e.target.value.split(",")[1])
                }}
              >
                <option value="">Please select destination account</option>
                {accountNumberOption}
              </select>
            </div>
            <div className="mb-2 mt-3">
              <label style={{ fontWeight: 'bold', color: '#6f9459' }}>Destination balance : {destinationBalance}</label>
            </div>

            <div className="mb-2">
              <label className='mb-2'>PIN</label>
              {havePin ?
                <PinInput
                  length={6}
                  type='numeric'
                  secret
                  onChange={(value, index) => setPin(value)}
                />
                :
                <>
                  <div className='mb-2'>You have not set a pin yet</div>
                  <Button variant='success' onClick={() => setShowRegisterPin(true)}>Create Pin</Button>
                </>
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setDestinationBalance(0)
            setFormData({ ...formData, fromNumber: '', toNumber: '', amount: 0 })
            setShowOwnTransfer(false)
          }
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTransfer} disabled={!havePin}>
            Transfer Now
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeposit}
        onHide={() => setShowDeposit(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label className="mb-2">Select deposit destination account</label>
              <select
                name="Currency"
                className='form-select'
                onChange={(e) => {
                  setFormData({ ...formData, accountId: e.target.value.split(",")[0] })
                  setBalance(e.target.value.split(",")[1])
                }}
              >
                <option value="">Please select an account</option>
                {accountIdOptionDeposit}
              </select>
            </div>
            <div className="mb-2 mt-3">
              <label style={{ fontWeight: 'bold', color: '#6f9459' }}>Wallet Balance: {balance}</label>
            </div>
            <div className="mb-2">
              <label className="mb-2">Amount</label>
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
              <label className="mb-2">Bank Source </label>
              {bankData ? displayBankData() : <div className='mb-2'>You have not registered a bank data yet</div>}
              {bankData == null && <Button variant='success' onClick={() => setShowRegisterBank(true)}>Register Bank</Button>}
            </div>

            <div className="mb-2">
              <label style={{ marginRight: 10 }}>PIN</label>
              {havePin ?
                <PinInput
                  length={6}
                  type='numeric'
                  secret
                  onChange={(value, index) => setPin(value)}
                />
                :
                <>
                  <div className='mb-2'>You have not set a pin yet</div>
                  <Button variant='success' onClick={() => setShowRegisterPin(true)}>Create Pin</Button>
                </>
              }
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBalance(0)
            setFormData({ ...formData, accountId: '', amount: 0 })
            setShowDeposit(false)
          }
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleDeposit} disabled={!bankData && !havePin}>
            Deposit Now
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRegisterBank}
        onHide={() => setShowRegisterBank(false)}
        backdrop="static"
        keyboard={false}
        className='modal-regi-bank'
      >
        <Modal.Header>
          <Modal.Title>Register Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <label className="mb-2">Card Number</label>
              <PinInput
                length={12}
                type='numeric'
                onChange={(value, index) => setBankForm({ ...bankForm, cardNumber: value })}
              />
            </div>
            <div className="mb-2">
              <label className="mb-2">CVV</label>
              <PinInput
                length={3}
                type='numeric'
                onChange={(value, index) => setBankForm({ ...bankForm, cvv: value })}
              />
            </div>
            <div className="mb-2">
              <label className="mb-2">Holder Name</label>
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
            <label className="mb-2">Expiry Date</label>
            <div className='d-flex'>
              <PinInput
                length={2}
                type='numeric'
                onChange={(value, index) => setYyDate(value)}
              />
              <label style={{ fontSize: 35 }}>/</label>
              <PinInput
                length={2}
                type='numeric'
                onChange={(value, index) => setMmDate(value)}
              />
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setBankForm({ ...bankForm, cardNumber: '', holderName: '', cvv: '', expDate: '' })
            setShowRegisterBank(false)
          }
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleRegisterBank}>
            Register Bank
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRegisterPin}
        onHide={() => setShowRegisterPin(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Register PIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <PinInput
              length={6}
              type='numeric'
              secret
              onChange={(value, index) => setPin(value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setPin('')
            setShowRegisterPin(false)
          }
          }>
            Cancel
          </Button>
          <Button variant="success" onClick={handleRegisterPin}>
            Create Pin
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
}

export default Transaction