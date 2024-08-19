import React, { useState, useEffect } from 'react';
import './YourCreationDisplay.css'

const YourCreationDisplay = ({ YourCreation, setYourCreation }) => {
    const handleRemove = (type) => {

        setYourCreation((prev) => {
            const updatedCreation = { ...prev, [type]: null, [`${type}Name`]: '' };
            localStorage.setItem('YourCreation', JSON.stringify(updatedCreation));
            return updatedCreation;
        });
    };

    return (
        <div>
            <h2>Your Potential Creation</h2>
            <h6>You will lose your potential creation when you log-out unless you add it to "My Cookies"</h6>
            <h6>Click here to add to "My Cookies":</h6>
            <p>
                <strong>Flavor:</strong> {YourCreation.flavorName || 'None selected'}
                {YourCreation.flavor && (
                    <button onClick={() => handleRemove('flavor')}>Remove Flavor</button>
                )}
            </p>
            <p>
                <strong>Cookie Cutter:</strong> {YourCreation.cookieCutterName || 'None selected'}
                {YourCreation.cookieCutter && (
                    <button onClick={() => handleRemove('cookieCutter')}>Remove Cookie Cutter</button>
                )}
            </p>
            <p>
                <strong>Decoration:</strong> {YourCreation.decorationName || 'None selected'}
                {YourCreation.decoration && (
                    <button onClick={() => handleRemove('decoration')}>Remove Decoration</button>
                )}
            </p>
            <p>
                <strong>Topping:</strong> {YourCreation.toppingName || 'None selected'}
                {YourCreation.topping && (
                    <button onClick={() => handleRemove('topping')}>Remove Topping</button>
                )}
            </p>
        </div>
    );
};

export default YourCreationDisplay;
