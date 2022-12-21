import React from 'react'

function AccountContent({ accountType }) {

    let accountTitle
    let accountAmount
    if(accountType === "checking") {
        accountTitle = "Argent Bank Checking (x8349)"
        accountAmount = "$2,082.79"
    } else if (accountType === "savings") {
        accountTitle = "Argent Bank Savings (x6712)"
        accountAmount = "$10,928.42"
    } else {
        accountTitle = "Argent Bank Credit Card (x8349)"
        accountAmount = "$184.30"
    }

    return (
        <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">{accountTitle}</h3>
              <p className="account-amount">{accountAmount}</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
      )
          
}

export default AccountContent