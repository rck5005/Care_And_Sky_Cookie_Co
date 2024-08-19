import React from 'react'
import useFetchData from './useFetchData'
import useFavoriteData from './UseFavoriteData';
import ListItems from './ListItems'


//WITHOUT BUTTONS

const DecorationsList = () => {
    const decorations = useFetchData('decorations/');
    return <ListItems title="Decorations" items={decorations} />;
};

const FlavorsList = () => {
    const flavors = useFetchData('flavors/');
    return <ListItems title="Flavors" items={flavors} />;
};

const CookieCuttersList = () => {
    const cookieCutters = useFetchData('cookiecutters/');
    return <ListItems title="Cookie Cutters" items={cookieCutters} />;
};

const ToppingsList = () => {
    const toppings = useFetchData('toppings/');
    return <ListItems title="Toppings" items={toppings} />;
};

//WITH BUTTONS

const DecorationsListWithButton = ({ YourCreation, setYourCreation }) => {
    const decorations = useFetchData('decorations/');

    const handleButtonClick = (id, name) => {
        if (YourCreation.decoration && YourCreation.decoration !== id) {
            const confirmReplace = window.confirm(
                `The decoration "${YourCreation.decorationName}" is already selected. Would you like to replace it with "${name}"?`
            );
            if (confirmReplace) {
                setYourCreation((prev) => ({ ...prev, decoration: id, decorationName: name }));
                alert(`Decoration "${name}" selected, replacing the previous decoration.`);
            } else {
                alert('Replacement canceled.');
            }
        } else {
            setYourCreation((prev) => ({ ...prev, decoration: id, decorationName: name }));
            alert(`Decoration "${name}" selected.`);
        }
    };

    return (
        <ListItems
            title="Decorations"
            items={decorations}
            buttonText="Select Decoration"
            onButtonClick={handleButtonClick}
        />
    );
};

const FlavorsListWithButton = ({ YourCreation, setYourCreation }) => {
    const flavors = useFetchData('flavors/');

    const handleButtonClick = (id, name) => {
        if (YourCreation.flavor && YourCreation.flavor !== id) {
            const confirmReplace = window.confirm(
                `The flavor "${YourCreation.flavorName}" is already selected. Would you like to replace it with "${name}"?`
            );
            if (confirmReplace) {
                setYourCreation((prev) => ({ ...prev, flavor: id, flavorName: name }));
                alert(`Flavor "${name}" selected, replacing the previous flavor.`);
            } else {
                alert('Replacement canceled.');
            }
        } else {
            setYourCreation((prev) => ({ ...prev, flavor: id, flavorName: name }));
            alert(`Flavor "${name}" selected.`);
        }
    };

    return (
        <ListItems
            title="Flavors"
            items={flavors}
            buttonText="Select Flavor"
            onButtonClick={handleButtonClick}
        />
    );
};

const ToppingsListWithButton = ({ YourCreation, setYourCreation }) => {
    const toppings = useFetchData('toppings/');

    const handleButtonClick = (id, name) => {
        if (YourCreation.topping && YourCreation.topping !== id) {
            const confirmReplace = window.confirm(
                `The topping "${YourCreation.toppingName}" is already selected. Would you like to replace it with "${name}"?`
            );
            if (confirmReplace) {
                setYourCreation((prev) => ({ ...prev, topping: id, toppingName: name }));
                alert(`Topping "${name}" selected, replacing the previous topping.`);
            } else {
                alert('Replacement canceled.');
            }
        } else {
            setYourCreation((prev) => ({ ...prev, topping: id, toppingName: name }));
            alert(`Topping "${name}" selected.`);
        }
    };

    return (
        <ListItems
            title="Toppings"
            items={toppings}
            buttonText="Select Topping"
            onButtonClick={handleButtonClick}
        />
    );
};

const CookieCuttersListWithButton = ({ YourCreation, setYourCreation }) => {
    const cookieCutters = useFetchData('cookiecutters/');

    const handleButtonClick = (id, name) => {
        if (YourCreation.cookieCutter && YourCreation.cookieCutter !== id) {
            const confirmReplace = window.confirm(
                `The cookie cutter "${YourCreation.cookieCutterName}" is already selected. Would you like to replace it with "${name}"?`
            );
            if (confirmReplace) {
                setYourCreation((prev) => ({ ...prev, cookieCutter: id, cookieCutterName: name }));
                alert(`Cookie Cutter "${name}" selected, replacing the previous cookie cutter.`);
            } else {
                alert('Replacement canceled.');
            }
        } else {
            setYourCreation((prev) => ({ ...prev, cookieCutter: id, cookieCutterName: name }));
            alert(`Cookie Cutter "${name}" selected.`);
        }
    };

    return (
        <ListItems
            title="Cookie Cutters"
            items={cookieCutters}
            buttonText="Select Cookie Cutter"
            onButtonClick={handleButtonClick}
        />
    );
};

const MyFavoritesList = () => {
    const { data: myFavorites, addFavorite, removeFavorite } = useFavoriteData('mycookies/favorites/');

    // Transform the data to match the fields in the associated table to ListItems function
    const transformedData = myFavorites.map(item => ({
        id: item.cookie_creation.id,
        name: item.cookie_creation.name,
        description: item.cookie_creation.description,
        image: item.cookie_creation.image,
        is_favorite: item.is_favorite,
    }));

    const handleButtonClick = (id) => {
        // Toggle favorite state
        const item = transformedData.find(item => item.id === id);
        if (item.is_favorite) {
            removeFavorite(id);
            alert(`${item.name} removed from favorites.`);
        } else {
            addFavorite(id);
            alert(`${item.name} added to favorites.`);
        }
    };

    return (
        <ListItems
            title="My Favorites"
            items={transformedData}
            onButtonClick={handleButtonClick}
            showFavoriteButton={true}
        />
    );
};

const CreationsList = () => {
    // const { data: allCreationsList } = useFetchData('cookiecreations/all/');
    // const { data: favoritesList } = useFetchData('mycookies/favorites/');

    const { data: creationsList, addFavorite, removeFavorite } = useFavoriteData('cookiecreations/all/');



    //I need to cross each item in "creationsList" with the current users "favorite" items, then 
    //render the creations/all/ page with that data.
    const handleButtonClick = (id, is_favorite) => {
        // Toggle favorite state
        console.log("is favorite: ", creationsList)
        if (is_favorite) {
            // removeFavorite(id);
            // alert(`${item.name} removed from favorites.`);

            alert(`This item is already in your favorites!  You must love this creation <3.`);

        } else {
            addFavorite(id);
            alert(`This item added to favorites.`);
        }
    };

    return (
        <ListItems
            title="Creations"
            items={creationsList}
            onButtonClick={handleButtonClick}
            showFavoriteButton={true}            
        />
    );
};


const MyCreationsList = () => {
    const { data: myCookiesAll, addFavorite, removeFavorite } = useFavoriteData('mycookies/all/');

    // Transform the data to match the fields in the associated table to ListItems function
    const transformedData = myCookiesAll.map(item => ({
        id: item.cookie_creation.id,
        name: item.cookie_creation.name,
        description: item.cookie_creation.description,
        image: item.cookie_creation.image,
        is_favorite: item.is_favorite,
    }));

    const handleButtonClick = (id) => {
        // Toggle favorite state
        const item = transformedData.find(item => item.id === id);
        if (item.is_favorite) {
            removeFavorite(id);
            alert(`${item.name} removed from favorites.`);
        } else {
            addFavorite(id);
            alert(`${item.name} added to favorites.`);
        }
    };

    return (
        <ListItems
            title="My Creations"
            items={transformedData}
            onButtonClick={handleButtonClick}
            showFavoriteButton={true}
        />
    );
};


export { DecorationsList, FlavorsList, CookieCuttersList, ToppingsList,  
    DecorationsListWithButton, FlavorsListWithButton, 
    ToppingsListWithButton, CookieCuttersListWithButton,
    MyFavoritesList, CreationsList, MyCreationsList
};
