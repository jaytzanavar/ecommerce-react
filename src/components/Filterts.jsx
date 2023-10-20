import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Filterts.css";
import Rating from "./Rating";
import { CartState } from "../context/context";

function Filterts() {
  const {
    prodState: { byStock, byFastDelivery, sort, byRating },
    prodDispatch,
  } = CartState();

  return (
    <div className="filters">
      <span className="title"> Filter Prods</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={(i) =>
            prodDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Decending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={(i) =>
            prodDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={(i) =>
            prodDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast delivery only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            prodDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label htmlFor="" style={{ padingRight: 10 }}>
          Rating:
        </label>
        <Rating
          rating={byRating}
          style={{ cursor: "pointer" }}
          onCLick={(i) =>
            prodDispatch({
              type: "FILTER_BY_RATING",
              payload: i,
            })
          }
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          prodDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
}

export default Filterts;
