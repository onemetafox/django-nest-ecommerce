import React, { useState, useEffect } from 'react';

function Qty({
  min = 0,
  max = Infinity,
  onChangeQty,
  adClass = '',
  disabled = false,
  value = 0,
}) {
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (disabled) setCount(0);
    else value !== count && setCount(value);
  }, [value]);

  useEffect(() => {
    onChangeQty && onChangeQty(count);
  }, [count]);

  function increase() {
    setCount(Math.min(max, count + 1));
  }

  function decrease() {
    setCount(Math.max(min, count - 1));
  }

  function changeCount(e) {
    let value = e.target.value ? parseInt(e.target.value) : min;
    setCount(value < min ? min : value > max ? max : value);
  }

  return (
    <div className={'product-single-qty ' + adClass}>
      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
        <span className="input-group-btn input-group-prepend">
          <button
            className="btn btn-outline btn-down-icon bootstrap-touchspin-down"
            onClick={decrease}
            disabled={disabled}
            type="button"
          ></button>
        </span>
        <input
          className="horizontal-quantity form-control"
          type="number"
          min={min}
          max={max}
          value={disabled ? 0 : count}
          disabled={disabled}
          onChange={changeCount}
        />
        <span className="input-group-btn input-group-append">
          <button
            className="btn btn-outline btn-up-icon bootstrap-touchspin-up"
            onClick={increase}
            disabled={disabled}
            type="button"
          ></button>
        </span>
      </div>
    </div>
  );
}

export default Qty;
