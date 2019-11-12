import React from "react";

import "./BuildControls.css";
import BuildControl from "./buildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
  return (
    <div className="BuildControls">
      <p>
        price:<strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          added={props.ctrlAdd}
          removed={props.ctrlRemove}
          disabled={props.disabled}
        />
      ))}
      <button
        className="OrderButton"
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        Summary
      </button>
    </div>
  );
};

export default BuildControls;
