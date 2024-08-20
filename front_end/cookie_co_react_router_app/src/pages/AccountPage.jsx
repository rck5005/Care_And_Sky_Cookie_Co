import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { getInfo, updateNameAndAddress, updatePassword } from '../utilities'
import { useOutletContext } from 'react-router-dom'

function AccountPage() {
    const { user, setUser } = useOutletContext()

    const [userInfo, setUserInfo] = useState({
        user: '',
        email: '',
        address: '',
      });

    const [newUserName, setNewUserName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const userData = await getInfo();
            setUserInfo({
                user: userData.user || 'none selected',
                email: userData.email || '',
                address: userData.address || '',
              });
            setNewUserName(userData.user || '');
            setNewAddress(userData.address) || '';
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        };

        fetchUserInfo();
  }, []);


  const handleDisplayNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };


  const handleUpdateDisplayName = async () => {
    try {
        // console.log("handleupdatedisplayname:", newUserName)
        const updatedData = await updateNameAndAddress(newUserName, userInfo.address);
        alert('Username updated:', updatedData);
        // Optionally update the UI to reflect the changes
        setUserInfo(updatedData);

        // Update the `user` in the context to trigger a re-render on other components
        setUser(updatedData.user);

    } catch (error) {
        console.error('Error updating username:', error);
    }
  };

  const handleUpdateAddress = async () => {
    try {
        const updatedData = await updateNameAndAddress(userInfo.user, newAddress);
        alert('Address updated:', updatedData);
        // Optionally update the UI to reflect the changes
        setUserInfo(updatedData);
    } catch (error) {
        console.error('Error updating address:', error);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
        alert('Desired Password and Confirmation Password do not match.');
        return;
    }

    try {
        const response = await updatePassword(oldPassword, newPassword);
        if(response['password_updated']){
          alert('Password updated')
        }
        else {
          alert('Current password incorrec. Password not updated.')
        }
        // Optionally clear the password fields
        handleClearPasswordFields();
    } catch (error) {
        console.error('Error updating password:', error);
    }
};

const handleClearPasswordFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
};

  return (
    <Container>
      <h1>Account Page</h1>

        {/* Display current user details */}
            <div className="mb-4">
        <h4>Current Information</h4>
        <p><strong>Display Name:</strong> {userInfo.user}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
      </div>

      {/* Instructions for updating information */}
      <div className="mb-4">
        <h4>Please use the fields below to update your display name and address. </h4>
      </div>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              value={newUserName}
              onChange={handleDisplayNameChange}
              placeholder="Enter your desired display name"
            />
            <Button variant="primary" onClick={handleUpdateDisplayName} className="mt-2">
              Update Display Name
            </Button>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={newAddress}
              onChange={handleAddressChange}
              placeholder="Enter your new address"
            />
            <Button variant="primary" onClick={handleUpdateAddress} className="mt-2">
              Update Address
            </Button>
          </Form.Group>
        </Col>
      </Row>


      <div className="mb-4">
        <h4>Please use the fields below to update your password. </h4>
      </div>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formOldPassword">
            <Form.Label> Current Password </Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              placeholder="Enter your current password here"
            />

          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formNewPassword">
            <Form.Label>Desired Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Enter Desired Password Here"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Label>Confirm Desired Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              placeholder="Confirm Desired Password Here"
            />
            <Button variant="primary" onClick={handleUpdatePassword} className="mt-2">
              Update Password
            </Button>
            <Button variant="primary" onClick={handleClearPasswordFields} className="mt-2">
              Clear Password Fields
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountPage;
