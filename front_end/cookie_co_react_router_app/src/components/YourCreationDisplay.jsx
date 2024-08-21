import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import { addCreationToUser, createCreation, zeroizeYourCreationValue } from  '../utilities'

const YourCreationDisplay = ({ YourCreation, setYourCreation }) => {
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newURL, setNewURL] = useState('');
    const [prevPurchased, setPrevPurchased] = useState(false); // Default to false if not provided



    const handleRemove = (type) => {
        setYourCreation((prev) => {
            const updatedCreation = { ...prev, [type]: null, [`${type}Name`]: '' };
            localStorage.setItem('YourCreation', JSON.stringify(updatedCreation));
            return updatedCreation;
        });
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSaveUserCreation = async () => {

        const storedCreation = JSON.parse(localStorage.getItem('YourCreation'));

        // Construct creation
        const creation = {
            name: newName,
            flavor: storedCreation.flavor,
            description: newDescription,
            cookie_cutter: storedCreation.cookieCutter,
            topping: storedCreation.topping,
            decoration: storedCreation.decoration,
            prev_purchased: prevPurchased,
            image: newURL,
        };

        try {
            // Call the createCreation function
            const result = await createCreation(creation);
            // console.log('Creation result:', result.id);

            try{
            // Call function to add to users creations
            const result2 = await addCreationToUser(result.id)
            zeroizeYourCreationValue()
            location.reload()
            alert('Creation Created!! Check "My Creations" to view your creations')
            }
            catch(error) {
                console.error('Created Creation, but failed to add to User Cookie Creation.')
            }

        } catch (error) {
            console.error('Failed to create creation:', error);
        }



        // Close the modal after saving
        handleClose();
    };

    return (
        <div>
            <h2>Your Potential Creation</h2>
            <h6>Selected Flavor, Cookie Cutter, Decoration and Topping will be removed upon logging out.</h6>
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

            {/* Button to open the modal */}
            <Button onClick={handleShow} className="btn btn-primary">
                Add New Creation
            </Button>

            {/* Modal for adding new creation */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Creation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Choose A Name For Your Creation!</Form.Label>
                            <Form.Control
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Enter the name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Select A Description </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Feel free to include what inspired you to make this wonderful creation! Such as the holiday, occasion, a picture you saw, or just because."
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="formURL">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={newURL}
                                onChange={(e) => setNewURL(e.target.value)}
                                placeholder="URL of picture (if applicable)"
                            />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUserCreation}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    );
};

export default YourCreationDisplay;
