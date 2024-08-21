import React from 'react'
import ItemCard from './ItemCard'
import "./ListItems.css";

const ListItems = ({ title, items, buttonText, onButtonClick, showFavoriteButton }) => {
    return (
        <div>
            <h2>{title}</h2>
            <div className="item-card-container">
                {items.length === 0 ? (
                    <h3>Think about {title} and they will appear! Or there are none available yet</h3>
                ) : (
                    items.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            buttonText={buttonText}
                            onButtonClick={onButtonClick}
                            is_favorite={item.is_favorite}
                            showFavoriteButton={showFavoriteButton}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ListItems;