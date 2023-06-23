import React from "react";

export default function Tags({ name }) {
  return (
    <div className="tag__wrapper">
      <div className="tag">{name}</div>
    </div>
  );
}
