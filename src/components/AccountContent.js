import React from 'react'
import TransactionBtn from "./TransactionBtn"

function AccountContent({ accountType }) {
  
    if ( accountType === "checking" ) {

        return (
            <section className="account">
                <div className="account-content-wrapper">
                  <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                  <p className="account-amount">$2,082.79</p>
                  <p className="account-amount-description">Available Balance</p>
                </div>
                <TransactionBtn />
            </section>
          )

    } else if ( accountType === "savings" ) {

        return (
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <TransactionBtn />
            </section>
        )

    } else {

        return (
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
                </div>
                <TransactionBtn />
            </section>
        )

    }
  
  
    
}

export default AccountContent