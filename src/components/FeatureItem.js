import React from 'react'
import iconChat from "../assets/icon-chat.png"
import iconMoney from "../assets/icon-money.png"
import iconSecurity from "../assets/icon-security.png"

/**
 * @param {string} feature 
 * @returns {HTMLElement} Div containing a description of the advantages of using the app
 */
function FeatureItem({ feature }) {
  
  if ( feature === "chat" ) {

    return (
      <div className="feature-item">
        <img src={iconChat} alt="Chat Icon" className="feature-icon" />
        <h3 className="feature-item-title">You are our #1 priority</h3>
        <p>
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </p>
      </div>
    )

  } else if ( feature === "money" ) {

    return (
      <div className="feature-item">
        <img
          src={iconMoney}
          alt="Chat Icon"
          className="feature-icon"
        />
        <h3 className="feature-item-title">More savings means higher rates</h3>
        <p>
          The more you save with us, the higher your interest rate will be!
        </p>
      </div>
    )

  } else {

    return (
      <div className="feature-item">
        <img
          src={iconSecurity}
          alt="Chat Icon"
          className="feature-icon"
        />
        <h3 className="feature-item-title">Security you can trust</h3>
        <p>
          We use top of the line encryption to make sure your data and money
          is always safe.
        </p>
      </div>
    )

  }
  
  
}

export default FeatureItem