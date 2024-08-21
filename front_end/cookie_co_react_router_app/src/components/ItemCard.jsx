import React from 'react'
import Button from 'react-bootstrap/Button';
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ItemCard.css";

function ItemCard({ id, name, description, image, buttonText, onButtonClick, is_favorite, showFavoriteButton }) {

  return (
    <div className ="item-card">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>{description}</p>

      {/* Conditionally render the "Select Item" button if buttonText is provided */}
      {buttonText && (
          <button onClick={() => onButtonClick(id, name)}>
              {buttonText}
          </button>
      )}

      {/* Conditionally render the favorite button based on showFavoriteButton prop */}
      {showFavoriteButton && (
          <button onClick={() => onButtonClick(id)}>
              {is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
      )}

    </div>
  );
}

export default ItemCard;
