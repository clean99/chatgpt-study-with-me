import * as React from 'react';

interface ColorSwatchProps {
  name: string;
  code: string;
  usage: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, code, usage }) => (
  <div
    style={{
      backgroundColor: code,
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
    }}
  >
    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{name}</div>
    <div style={{ fontSize: '14px', marginBottom: '5px' }}>{code}</div>
    <div style={{ fontSize: '14px' }}>{usage}</div>
  </div>
);
export default ColorSwatch;