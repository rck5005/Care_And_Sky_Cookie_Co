import React, { useState, useEffect } from 'react'
import { CookieCuttersListWithButton } from '../components/Lists'
// import './VariationsPage.css';

function VariationsPageCookieCutters() {

    // Load the initial state from localStorage if available
    const loadSavedCreation = () => {
      const savedCreation = localStorage.getItem('YourCreation');
      return savedCreation ? JSON.parse(savedCreation) : {
          flavor: null,
          flavorName: '',
          topping: null,
          toppingName: '',
          cookieCutter: null,
          cookieCutterName: '',
          decoration: null,
          decorationName: ''
      };
  };

  const [YourCreation, setYourCreation] = useState(loadSavedCreation());

  // Save the current state to localStorage whenever it changes
  useEffect(() => {
      localStorage.setItem('YourCreation', JSON.stringify(YourCreation));
  }, [YourCreation]);

  return (
    <div>
      
      <CookieCuttersListWithButton
          YourCreation={YourCreation}
          setYourCreation={setYourCreation}
      />
    </div>
  )
}

export default VariationsPageCookieCutters