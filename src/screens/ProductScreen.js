import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import data from '../data';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Store } from '../Store';

function ProductScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const product = data.products.find((product) => product.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert('Sorry, The Product is out of Stock');
      return;
    }
    dispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '45vw' }}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item className='reviews'>
              {product.numReviews} reviews
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        variant='primary'
                        onClick={() => addToCartHandler()}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
