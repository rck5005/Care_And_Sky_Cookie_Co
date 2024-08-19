import React, { useState, useEffect } from 'react'
import { DecorationsListWithButton, FlavorsListWithButton, 
  CookieCuttersListWithButton, ToppingsListWithButton } from '../components/Lists'
import YourCreationDisplay from "../components/YourCreationDisplay"



function CreationsPageMake() {

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

      {/* Display the current creation */}
      <YourCreationDisplay YourCreation={YourCreation} 
          setYourCreation={setYourCreation}/>

      <FlavorsListWithButton
          YourCreation={YourCreation}
          setYourCreation={setYourCreation}
      />
      <CookieCuttersListWithButton
          YourCreation={YourCreation}
          setYourCreation={setYourCreation}
      />
      <DecorationsListWithButton
          YourCreation={YourCreation}
          setYourCreation={setYourCreation}
      />
      <ToppingsListWithButton
          YourCreation={YourCreation}
          setYourCreation={setYourCreation}
      />
  </div>
    );
  }
export default CreationsPageMake