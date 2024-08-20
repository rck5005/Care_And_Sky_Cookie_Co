import React, { useState, useEffect } from 'react'
import { ToppingsListWithButton } from '../components/Lists'

function VariationsPageToppings() {

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

<ToppingsListWithButton
          YourCreation={YourCreation}
          setYourCreation={setYourCreation}
      />

    </div>
  )
}

export default VariationsPageToppings