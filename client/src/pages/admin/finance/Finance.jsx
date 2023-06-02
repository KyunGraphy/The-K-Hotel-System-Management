import React, { useState } from 'react'
import './styles/finance.css'

import { FaCoins } from "react-icons/fa";

const Finance = () => {
  const [currentHeaderOptions, setCurrentHeaderOptions] = useState(0);
  const headerOptions = ['request', 'expense', 'incomes', 'statistics'];

  return (
    <div className='finance'>
      {/* <h2>Finance</h2> */}
      <div className='fHeader'>
        <div className='fHeaderOptions'>
          {headerOptions.map((item, index) => (
            <div
              className={currentHeaderOptions === index && 'active'}
              onClick={() => setCurrentHeaderOptions(index)}
            >{item}</div>
          ))}
        </div>
        <div className='fHeaderBalance'>
          <FaCoins className='fHeaderBalanceIcon' />
          30000000$
        </div>
      </div>
    </div>
  )
}

export default Finance