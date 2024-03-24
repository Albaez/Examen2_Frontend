import React from 'react';

export const Footer = () => {
  const footerStyles = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#f5f5f5',
    color: '#333',
    textAlign: 'center',
    padding: '10px'
  };

  return (
    <footer style={footerStyles}>Copyright Alba Zuniga | Desarrollo Aplicaciones Web I</footer>
  )
}