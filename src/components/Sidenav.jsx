import React from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {
  return (
    <div className='d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
        <div>
            <div className='d-flex align-items-center'>
                <span>SuperWallet</span>
            </div>
            <hr className='text-secondary mt-2' />
            <ul className='nav nav-pills flex-column p-0 m-0'>
                <li className='nav-item p-1'>
                    <Link to="" className='nav-link text-white'>
                        <span className='fs-5'>Dashboard</span>
                    </Link>
                </li>
                <li className='nav-item p-1'>
                    <Link to="/admin" className='nav-link text-white'>
                        <span className='fs-5'>Admin</span>
                    </Link>
                </li>
                <li className='nav-item p-1'>
                    <Link to="" className='nav-link text-white'>
                        <span className='fs-5'>Customer</span>
                    </Link>
                </li>
                <li className='nav-item p-1'>
                    <Link to="" className='nav-link text-white'>
                        <span className='fs-5'>Transaction History</span>
                    </Link>
                </li>
            </ul>
        </div>
        <div>
            <hr className='text-secondary' />
            <span className='fs-4'>Logout</span>
        </div>
    </div>
  )
}

export default Sidenav