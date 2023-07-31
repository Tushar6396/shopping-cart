import React from 'react';
import { Col, Row } from 'react-bootstrap';
import data from '../data';
import Product from '../components/Product';

function HomeScreen() {
  return (
    <div className='products'>
      <h1>Featured Products</h1>
      <Row>
        {data.products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
