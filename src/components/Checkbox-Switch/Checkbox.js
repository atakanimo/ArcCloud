export default function Checkbox({onChange, header, checked, disabled, color, style}) {
  const defaultStyle = {width: 20, height: 20, margin: 10};

  return (
    <div style={style || {flexDirection: 'row'}}>
      <input
        onChange={onChange}
        style={defaultStyle}
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
