import React, {useState} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import info from '../info';

const url = info.url;
const auth = info.auth;

let FullImage = ({open, onClose, src}) => {
  if (!open) {
    return null;
  }
  const MODAL_STYLES = {
    maxWidth: '600px',
    maxHeight: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '7px',
    zIndex: 1000
  };

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
  };

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose}/>
      <div style={MODAL_STYLES}>
        <img src={src} style={MODAL_STYLES}></img>
      </div>
    </>,
    document.getElementById('app')
  );
};

export default FullImage;