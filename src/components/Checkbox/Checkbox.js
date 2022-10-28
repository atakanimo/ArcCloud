import React from 'react';

export default function Checkbox({onChange, header, checked, disabled}) {
  return (
    <div style={{flexDirection: 'row'}}>
      <input
        onChange={onChange}
        style={{width: 20, height: 20, margin: 10}}
        class="form-check-input"
        type="checkbox"
        checked={checked}
        disabled={disabled}></input>
      <label style={{marginTop: 10}} class="form-check-label">
        {header}
      </label>
    </div>
  );
}
