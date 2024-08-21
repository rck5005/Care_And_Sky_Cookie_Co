import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { getInfo, updateNameAndAddress, updatePassword, deleteUser, deleteMailChimpAccount, subscribeToMailChimp, unsubscribeFromMailChimp } from '../utilities'
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
        location.reload();

        // Update the `user` in the context to trigger a re-render on other components
        // setUser(updatedData.user);

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
        location.reload();
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
          alert('Current password incorrect. Password not updated.')
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

  const handleSubscribeMailChimpAccount = async () => {
    try {

        //this is here for lack of tracking if i have an account or not
        const response0 = await deleteMailChimpAccount(userInfo.email)

        const response = await subscribeToMailChimp(userInfo.email, newUserName, userInfo.user);
        if (response) {
            swal('Subscribed successfully!', 'You are now subscribed to the newsletter.', 'success');
        }
    } catch (error) {
        console.error('Subscription failed:', error);
        swal('Subscription failed', 'There was an error subscribing. Please try again.', 'error');
    }
  };

  const handleUnsubscribeMailChimpAccount = async () => {
      try {
          const response = await unsubscribeFromMailChimp(userInfo.email);
          if (response) {
              swal('Unsubscribed successfully!', 'You have been unsubscribed from the newsletter.', 'success');
          }
      } catch (error) {
          console.error('Unsubscription failed:', error);
          swal('Unsubscription failed', 'There was an error unsubscribing. Please try again.', 'error');
      }
  };

  const handleDeleteMailChimpAccount = async () => {
    try {
        const response = await deleteMailChimpAccount(userInfo.email);
        if (response) {
            swal('MailChimp account deleted successfully!', '', 'success');
        } else {
            swal('Failed to delete MailChimp account', '', 'error');
        }
    } catch (error) {
        console.error('Error deleting MailChimp account:', error);
        swal('Error deleting MailChimp account', 'Please try again later.', 'error');
    }
  };

  const handleDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          visible:true,
          className :"btn-danger",
        }
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "Final Confirmation",
          text: "LAST CHANCE! Are you absolutely sure?",
          icon: "warning",
          buttons: {
            cancel: "Cancel",
            confirm:{
              text: "Permanently Delete Account",
              value: true,
              visible: true,
              className :"btn-danger",
            }
          },
          dangerMode: true,
        }).then((finalConfirmation) => {
          if (finalConfirmation) {
            const deleteProfile = async () => {
              try {
                await deleteUser();
                setUser(null); // Clear the user context
                swal({
                  title: "ACCOUNT DELETED",
                  text: "Your Account Has Successfully Been Deleted!",
                  icon: "success",
                  })
                }
                catch (error) {
                console.error('Error deleting account:', error);
                alert('There was an error deleting your account. Please try again.');
              }
            };
            deleteProfile();
          }
        });
      }
    });
  };

  return (
    <Container>
      <h1>Account Page</h1>

        {/* Display current user details */}
            <div className ="mb-4">
        <h4>Current Information</h4>
        <p><strong>Display Name:</strong> {userInfo.user}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
      </div>

      {/* Instructions for updating information */}
      <div className ="mb-4">
        <h4>Please use the fields below to update your display name and address. </h4>
      </div>

      <Row className ="mb-3">
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

      <div className ="mb-4">
        <h4>Please use the fields below to update your password. </h4>
      </div>

      <Row className ="mb-3">
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

      <h4>Manage your MailChimp Account</h4>

      <Row className ="mb-3">
          <Col md={6}>
              <h6 className ="text-muted">
                  This will sign you up for our newsletter sent via e-mail through MailChimp.
              </h6>
              <Button variant="success" onClick={handleSubscribeMailChimpAccount}>
                  Click Here to Subscribe and Receive Newsletters
              </Button>
          </Col>  

          <Col md={6}>
              <h6 className ="text-muted">
                  This will unsubscribe you from receiving newsletters; however, you will still receive emails regarding active orders.
              </h6>
              <Button variant="danger" onClick={handleUnsubscribeMailChimpAccount}>
                  Click Here to Unsubscribe and Stop Receiving Newsletters
              </Button>
          </Col>
      </Row>

      <div className ="mb-3 p-3 bg-light border rounded">
        <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. 
        You will be logged out and redirected to the login page upon deletion.
      </div>
      <Button onClick={handleDeleteClick} variant="outline-danger">Permanently Delete Account</Button>

    

    </Container>
    

    
  );
}

export default AccountPage;
