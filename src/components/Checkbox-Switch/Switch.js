import React, {useState} from 'react';

export default function Switch({setValue, header, checked, switchAreaStyle, switchStyle}) {
  const divStyle = {
    flexDirection: 'row',
    marginTop: 10,
    minHeight: 30,
    display: 'flex',
    alignItems: 'center',
  };
  const label = {fontSize: 16, fontWeight: '500', width: 250};
  const inputStyle = {width: 50, height: 25, marginRight: 10};

  return (
    <div class="form-check form-switch" style={switchAreaStyle || divStyle}>
      <input style={switchStyle || inputStyle} class="form-check-input" type="checkbox" onChange={() => setValue(!checked)} checked={checked} />
      <label style={label} class="form-check-label">
        {header}
      </label>
    </div>
  );
}
