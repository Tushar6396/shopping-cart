import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screens/CartScreen';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar variant='dark' bg='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Shoe Store</Navbar.Brand>
              </LinkContainer>
              <span className='spacer'></span>
              <Nav className='me-auto'>
                <Link
                  to='/cart'
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  Cart
                  {cart && cart.cartItems && cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0) < 10
                        ? cart.cartItems.reduce((a, c) => a + c.quantity, 0)
                        : '9+'}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/product/:slug' element={<ProductScreen />} />
          </Routes>
        </main>
        <footer className='text-center mt-4 p-2 bg-dark text-white'>
          All rights reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
