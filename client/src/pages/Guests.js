import React, { useEffect, useState } from 'react'
import { Table, Modal, Button, Form } from 'react-bootstrap'
import { useAppContext } from '../context';
import editpic from '../images/editer.png'
import supprimer from '../images/supprimer.png'

export default function Guests() {
    const { guests, editGuest, deleteGuest, addGuest } = useAppContext();
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [showLogin, setShowLogin] = useState(!localStorage.getItem('connect'));
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [updatedGuest, setUpdatedGuest] = useState(null);
    const [password, setPassword] = useState(null);
    let _total = 0;
    const [total, setTotal] = useState(_total);
    const handleBack = () => {
        window.location = "/";
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (password === "12345") {
            setShowLogin(false);
            localStorage.setItem('connect', true);
        }
        else {
            alert("Votre mot de passe est incorrect.")
        }
    }
    const onChangeHandler = e => {
        setInput(e.target.value);
    }

    const edit = guest => {
        editGuest(guest);
        setShowEdit(false);
    }

    const delete_guest = guest => {
        setShowEdit(false);
        deleteGuest(guest);
        setShowDelete(false);
    }

    const addNewGuest = guest => {
        addGuest(guest);
        setShowAdd(false);
    }
    useEffect(() => {
        setList(guests.filter(guest => guest.name.toLowerCase().includes(input.toLowerCase()) || guest.phone.includes(input)));
        setTotal(guests.reduce((prev, curr) => prev + parseInt(curr.numberOfGuests), 0));
    }, [input, guests])

    return (
        <div>
            <h1>My Guests List</h1>
            <div id='searchBar'>
                <div><label htmlFor="" className='mx-2'>Search:</label>
                    <input type="text" onChange={onChangeHandler} placeholder='Name/Phone' />
                </div>
                <div>
                    <label htmlFor="" className='mx-2'>Confirmations: <strong>{total}</strong></label>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Confirmations</th>
                        <th><button className='btn btn-primary btn-sm' onClick={() => {setUpdatedGuest(null);setShowAdd(true)}}>+Add</button></th>
                    </tr>
                </thead>
                <tbody>
                    {input ? (
                        list.map(guest => {
                            _total += parseInt(guest.numberOfGuests);
                            return (
                                <tr key={guest._id}>
                                    <td>{guest.name}</td>
                                    <td>{guest.phone}</td>
                                    <td>{guest.numberOfGuests}</td>
                                    <td><button className='btn btn-secondary btn-sm btn-edit' onClick={() => {setUpdatedGuest(guest); setShowEdit(true)}}><img src={editpic} alt='' style={{width: "20px", filter: "invert(1)", opacity: "0.9"}}/></button></td>
                                </tr>
                            )
                        })) :
                        (
                            guests.map(guest => {
                                _total += parseInt(guest.numberOfGuests);
                                return (
                                    <tr key={guest._id}>
                                        <td>{guest.name}</td>
                                        <td>{guest.phone}</td>
                                        <td>{guest.numberOfGuests}</td>
                                        <td><button className='btn btn-secondary btn-sm btn-edit' onClick={() => {setUpdatedGuest(guest); setShowEdit(true)}}><img src={editpic} alt='' style={{width: "20px", filter: "invert(1)", opacity: "0.9"}}/></button></td>
                                    </tr>
                                )
                            })
                        )
                    }
                    <tr key={1}>
                        <td>TOTAL</td>
                        <td></td>
                        <td>{_total}</td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={showLogin} onHide={handleBack} dialogClassName='dialog'>
                <Modal.Header closeButton>
                    <Modal.Title>Please authenticate:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>This space is reserved for authorized persons. Please enter the password or return to the home page:</Form.Label>
                            <Form.Control type='text' placeholder='Mot de passe' onChange={handlePassword} autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={() => {setShowEdit(false)}}>
                <Modal.Header closeButton>
                    Edit Contact
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' value={updatedGuest?.name} onChange={(e) => {setUpdatedGuest({...updatedGuest, name: e.target.value})}}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type='text' value={updatedGuest?.phone} onChange={(e) => {setUpdatedGuest({...updatedGuest, phone: e.target.value})}}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Number of people</Form.Label>
                            <Form.Control type='number' value={updatedGuest?.numberOfGuests} onChange={(e) => {setUpdatedGuest({...updatedGuest, numberOfGuests: e.target.value})}}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger btn-edit' onClick={() => {setShowDelete(true)}}><img src={supprimer} alt='' style={{width: "20px", filter: "invert(1)", opacity: "0.9"}}/></button>
                    <Button variant="secondary" onClick={() => {setShowEdit(false)}}>Back</Button>
                    <Button variant="primary" onClick={() => {edit(updatedGuest)}}>Edit</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={() => {setShowDelete(false)}}>
                <Modal.Header closeButton>
                    Delete Contact
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this guest's reply?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowDelete(false)}}>Back</Button>
                    <Button variant="danger" onClick={() => {delete_guest(updatedGuest)}}>Yes, permanently delete.</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAdd} onHide={() => {setShowAdd(false)}}>
                <Modal.Header closeButton>
                    Add Contact
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Nom' onChange={(e) => {setUpdatedGuest({...updatedGuest, name: e.target.value})}} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type='text' placeholder='Numéro de téléphone' onChange={(e) => {setUpdatedGuest({...updatedGuest, phone: e.target.value})}} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Number of people</Form.Label>
                            <Form.Control type='text' placeholder='Nombre' onChange={(e) => {setUpdatedGuest({...updatedGuest, numberOfGuests: e.target.value})}} required></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowAdd(false)}}>Cancel</Button>
                    <Button variant="primary" onClick={() => {addNewGuest(updatedGuest)}} disabled={!(updatedGuest?.name && updatedGuest?.phone && updatedGuest?.numberOfGuests)}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
