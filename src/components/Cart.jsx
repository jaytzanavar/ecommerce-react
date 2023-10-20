import React, { useState, useEffect } from "react";
import { CartState } from "../context/context";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import Ratting from "./Rating";
import { AiFillDelete } from "react-icons/ai";

function Cart() {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log(cart);

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainerF">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row style={{ width: "100%" }}>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>
                  <span>{prod.price}</span>
                </Col>
                <Col md={2}>
                  <Ratting rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <FormControl
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(Number(prod.inStock)).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </FormControl>
                </Col>
                <Col md={2}>
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
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}> Total {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to CHeckout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
