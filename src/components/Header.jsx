import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {
  Container,
  FormControl,
  Navbar,
  Dropdown,
  Nav,
  Badge,
  Button,
} from "react-bootstrap";
import { CartState } from "../context/context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    prodDispatch,
  } = CartState();
  return (
    <Navbar bg="dark" expand="md" variant="dark" style={{ height: 80 }}>
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search"
            className="m-auto"
            onChange={(e) => {
              prodDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="success">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370, backgroundColor: "green" }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartItem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>{prod.price.split(".")[0]}</span>
                        <AiFillDelete
                          fontSize="20px"
                          className="hover-del"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }
                        />
                      </div>
                    </span>
                  ))}
                </>
              ) : (
                <Dropdown.Item>
                  <span className="bg-success">Cart is Empty!</span>
                </Dropdown.Item>
              )}
              <Link to="/cart">
                <Button style={{ width: "95%", margin: "0 10px" }}>
                  Go to Cart
                </Button>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
