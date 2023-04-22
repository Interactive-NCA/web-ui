import React from "react";

function LinearBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className='font-press-start'>Low</div>
      <div style={{
        flex: 1,
        height: '8px',
        borderRadius: '4px',
        margin: '0 10px',
        background: 'linear-gradient(to right, #00a8cc, #7b2cbf)',
      }}>
      </div>
      <div className='font-press-start'>High</div>
    </div>
  );
}

export default LinearBar;
