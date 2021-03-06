import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Image from './image.jsx';
import FullImage from './fullImage.jsx';
import info from '../info';

let Answer = ({answer}) => {
  let [answerHelpfulness, setAnswerHelpfulness] = useState();
  let [helpfulClicked, setHelpfulClicked] = useState(false);
  let [reportClicked, setReportClicked] = useState(false);

  useEffect(() => {
    setAnswerHelpfulness(answer.helpfulness);
    setHelpfulClicked(false);
    setReportClicked(false);
  }, [answer]);

  const url = info.url;
  const auth = info.auth;

  let helpfulClickHandler = () => {

    if (!helpfulClicked) {
      setAnswerHelpfulness(prevCount => prevCount + 1);
      setHelpfulClicked(true);

      axios.put(`${url}/qa/answers/${answer.id}/helpful`, answerHelpfulness,
        auth)
        .then(data => {
        })
        .catch(err => {
          throw err;
        });
    }
  };

  let reportClickHandler = () => {
    if (!reportClicked) {
      setReportClicked(true);

      axios.put(`${url}/qa/answers/${answer.id}/report`, 'report', auth)
        .catch(err => {
          throw err;
        });
    }
  };

  return (
    <div className='answer'>
      <span className='letter'>A:</span>
      <span className='answerBody'> {answer.body}</span>
      <div>
        {answer.photos.map((photo, index) => {
          let style = {height: '70px', width: 'auto'};
          return (
            <>
              <Image key={index} src={photo.url} style={style}/>
            </>
          );
        })}
      </div>
      <div className='answerInfo'>  By
        <span className='userName'> {answer.name}</span>
        {/* <span className='date'>&nbsp;{new Date(answer.date_written).toString().slice(4, 16)}</span> */}
        <span className='helpful'> | Helpful? </span>
        <span className='yes' onClick={helpfulClickHandler}> Yes</span>
        <span className='helpfulness'> ({answerHelpfulness}) |</span>
        <span className='report' onClick={reportClickHandler}> Report</span>
      </div>
    </div>
  );
};

export default Answer;