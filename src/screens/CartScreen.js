import React, { useContext } from 'react';
import { Store } from '../Store';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = (item, newQuantity) => {
    if (item.countInStock < newQuantity) {
      window.alert('Sorry, The Product is out of Stock');
      return;
    }
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    dispatch({
      type: 'UPDATE_CART_ITEMS',
      payload: updatedCartItems,
    });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: item });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty <Link to='/'>Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded img-thumbnail'
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant='light'
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className='fa-solid fa-circle-minus'></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant='light'
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className='fa-solid fa-circle-plus'></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant='light'
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className='fa-solid fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) <br></br>
                    <strong>
                      Price: $
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </strong>
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      variant='primary'
                      disabled={cartItems.length === 0}
                    >
                      Proceed To Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
