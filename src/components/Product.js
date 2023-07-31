import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

function Product(props) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (item.countInStock < quantity) {
      window.alert('Sorry, The Product is out of Stock');
      return;
    }
    dispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity },
    });
  };
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '200px', height: '250px' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Card.Text>
          <strong>
            <p>Price: ${product.price}</p>
          </strong>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant='light' disabled>
            Out of Stock
          </Button>
        ) : (
          <Button variant='primary' onClick={() => addToCartHandler(product)}>
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
