import React, {useState} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Image from './image.jsx';
import info from '../info';

const MODAL_STYLES = {
  width: '700px',
  height: '550px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
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

const url = info.url;
const auth = info.auth;

let AddAnswer = ({open, onClose, question_id, question_body}) => {

  if (!open) {
    return null;
  }

  let [answer, setAnswer] = useState('');
  let [nickname, setNickName] = useState('');
  let [email, setEmail] = useState('');
  let [photos, setPhotos] = useState([]);
  let [currentPhoto, setCurrentPhoto] = useState([]);

  let handleSubmit = () => {
    if (answer === '') {
      return;
    }
    if (nickname === '') {
      return;
    }
    if (email === '') {
      return;
    }

    let body = {
      body: answer,
      name: nickname,
      email: email,
      photos: photos
    };

    axios.post(`${url}/qa/questions/${question_id}/answers`, body, auth)
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        let resetElements = document.getElementsByClassName('answerInput');
        for (let i = 0; i < resetElements.length; i++) {
          resetElements[i].value = '';
          resetElements[i].src = '';
        }
      });
  };

  let handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  let handleNickname = (e) => {
    setNickName(e.target.value);
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handleYourPhoto = (e) => {
    setCurrentPhoto(e.target.value);
  };

  let handleAddPhoto = () => {
    setPhotos(prev => {
      let current = prev.concat([currentPhoto]);
      return current;
    });

    let photoElement = document.getElementsByClassName('yourPhoto');
    photoElement[0].value = '';
  };

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='x' onClick={onClose}>X</button>
        <div className='addAnswerTitle'>Submit Your Answer</div>
        <div className='addAnswerSubtitle'>Question: {question_body}</div>
        <div className='answerForm'>
          <div>Your Answer *</div>
          <textarea className='yourAnswer answerInput' type='text' placeholder='I think the product is...'
            onChange={handleAnswer}/>
          <div>Your Photos</div>
          <input type='text' className='yourPhoto answerInput' placeholder='Place photo URL here...' onChange={handleYourPhoto}/>
          <span className='addPhoto' onClick={handleAddPhoto}>Add Photo</span>
          <div>
            {photos.map((photo, index) => {
              let style = {height: '50px', width: 'auto'};
              return <Image key={index} src={photo} style={style}/>;
            })}
          </div>
          <div>Your Nickname *</div>
          <input type='text' className='yourNickname answerInput' placeholder='jack11'
            onChange={handleNickname} />
          <div className='addAnswerInfo'>For privacy reasons, do not use your full name or
          email address</div>
          <div>Your Email *</div>
          <input type='email' className='yourEmail answerInput' placeholder='jack@gmail.com'
            onChange={handleEmail}/>
          <div className='addAnswerInfo'>For authentication reasons, you will
          not be emailed</div>
        </div>
        <div className='submitAnswer' onClick={handleSubmit}>
          Submit Answer
        </div>
      </div>
    </>,
    document.getElementById('app')
  );
};

export default AddAnswer;