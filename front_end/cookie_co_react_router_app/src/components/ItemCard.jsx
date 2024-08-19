import React from 'react'
import Button from 'react-bootstrap/Button';
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react"

function ItemCard({ id, name, description, image, buttonText, onButtonClick }) {

  return (
    <div className="item-card">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>{description}</p>
      {buttonText && (
                <button onClick={() => onButtonClick && onButtonClick(id, name)}>
                    {buttonText}
                </button>)}
    </div>
  );
}

export default ItemCard;