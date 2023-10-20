import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Rating({ rating, onCLick, style }) {
  const [rate, setRate] = useState(3);
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onCLick(i + 1)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </div>
  );
}

export default Rating;
