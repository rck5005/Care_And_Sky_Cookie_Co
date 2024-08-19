import React from 'react'
import ItemCard from './ItemCard'
import '../App.css'

const ListItems = ({ title, items, buttonText, onButtonClick }) => {
    return (
        <div>
            <h2>{title}</h2>
            <div>
                {items.length === 0 ? (
                    <h3>No {title} Available Yet</h3>
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
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ListItems;