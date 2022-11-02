import React from 'react';

export default function Checkbox({onChange, header, checked, disabled}) {
  return (
    <div style={{flexDirection: 'row', backgroundColor: 'red'}}>
      <input
        onChange={onChange}
        style={{width: 20, height: 20, margin: 10}}
        class="form-check-input"
        type="checkbox"
        checked={checked}
        disabled={disabled}></input>
      <label style={{height: 20, marginTop: 10, fontSize: 16, fontWeight: '500'}} class="form-check-label">
        {header}
      </label>
    </div>
  );
}
