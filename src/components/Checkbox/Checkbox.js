// import React from 'react';

// export default function Switch({onChange, header, checked, disabled, color}) {
//   const inputStyle = {width: 50, height: 25};
//   const divStyle = {flexDirection: 'row', backgroundColor: 'red', marginTop: 10};
//   return (
//     <div class="form-check form-switch" style={divStyle}>
//       <input style={inputStyle} class="form-check-input" type="checkbox" checked={checked} />
//       <label style={{height: 25, fontSize: 16, fontWeight: '500'}} class="form-check-label">
//         {header}
//       </label>
//     </div>
//   );
// }
import React from 'react';

export default function Checkbox({onChange, header, checked, disabled, color}) {
  return (
    <div style={{flexDirection: 'row'}}>
      <input
        onChange={onChange}
        style={{width: 20, height: 20, margin: 10}}
        className="form-check-input"
        type="checkbox"
        color={color || 'blue'}
        defaultChecked={checked}
        disabled={disabled}></input>
      <label style={{height: 20, marginTop: 10, fontSize: 16, fontWeight: '500'}} className="form-check-label">
        {header}
      </label>
    </div>
  );
}
