import React, {useState} from 'react';

export default function Switch({headerStyle, setValue, header, checked, switchAreaStyle, switchStyle}) {
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
    <div className="form-check form-switch" style={switchAreaStyle || divStyle}>
      <input
        style={switchStyle || inputStyle}
        className="form-check-input"
        type="checkbox"
        onChange={() => setValue(!checked)}
        checked={checked}
      />
      <label style={headerStyle || label} className="form-check-label">
        {header}
      </label>
    </div>
  );
}
