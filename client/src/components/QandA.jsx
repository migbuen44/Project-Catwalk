import React, {useState, useEffect} from 'react';
import Search from './QAcomponents/search.jsx';
import Question from './QAcomponents/question.jsx';
import AddQuestion from './QAcomponents/addQuestion.jsx';
import axios from 'axios';
import _ from 'underscore';
import bluebird from 'bluebird';
import {useSelector} from 'react-redux';
import info from './info';

const url = info.url;
const auth = info.auth;

let QandA = ({productId}) => {
  let PRODUCT_ID = productId;

  let [questions, setQuestions] = useState([]);
  let [questionCount, setQuestionCount] = useState(4);
  let [searchQuestions, setSearchQuestions] = useState([]);
  let [addQuestionIsOpen, setAddQuestionIsOpen] = useState(false);

  let retrieveQuestions = (page, count) => {
    axios.get(`${url}/qa/questions?product_id=${PRODUCT_ID}&page=${page}&count=${count}`, auth)
      .then(({data}) => {
        let sortedQuestions = _.sortBy(data.results, (question) => {
          return question.question_helpfulness;
        });
        sortedQuestions = sortedQuestions.reverse();
        setQuestions(sortedQuestions);
        setSearchQuestions(sortedQuestions);
      })
      .catch(err => {
        console.log(err);
      });
  };


  useEffect(() => {
    setQuestionCount(4);
    retrieveQuestions(1, questionCount);
    setAddQuestionIsOpen(false);
  }, [productId]);

  let moreQuestionsHandler = () => {
    setQuestionCount(prevQuestionCount => {
      let currentCount = prevQuestionCount + 2;
      retrieveQuestions(1, currentCount);
      return currentCount;
    });
  };

  return (
    <>
      <h5>Questions and Answers</h5>
      <Search setQuestions={setQuestions} questions={questions}
        searchQuestions={searchQuestions}/>
      <div className='questionAndAnswer'>
        {questions.map((question, index) => {
          return <Question question={question} key={index} PRODUCT_ID={PRODUCT_ID}/>;
        })}
      </div>
      <div className='buttonContainer'>
        <span className='moreQuestions' onClick={moreQuestionsHandler}>
          More Answered Questions
        </span>
        <span className='addQuestion' onClick={() => setAddQuestionIsOpen(true)}>
          Add A Question +
        </span>
      </div>
      <AddQuestion open={addQuestionIsOpen} PRODUCT_ID = {PRODUCT_ID}
        onClose={() => setAddQuestionIsOpen(false)}/>
    </>
  );

};


export default QandA;