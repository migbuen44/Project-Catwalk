import React, {useState} from 'react';

let Search = ({questions, setQuestions, searchQuestions}) => {
  let [value, setValue] = useState('');

  let handleSearchChange = (e) => {
    let currentValue = e.target.value;

    if (currentValue.length >= 3) {
      let matchedQuestions = [];
      searchQuestions.forEach(question => {
        if (question.body.includes(currentValue)) {
          matchedQuestions.push(question);
        }
      });

      setQuestions(matchedQuestions);
    } else {
      setQuestions(searchQuestions);
    }

    return setValue(currentValue);
  };

  return (
    <form>
      <input className='search' type='text' placeholder="Enter question..."
        value={value} onChange={handleSearchChange}/>
    </form>
  );
};

export default Search;