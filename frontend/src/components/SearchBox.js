import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBox = (props) => {
  const [keyword, setKeyword] = useState('');

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim().length > 0) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className='form-inline my-2 my-lg-0'>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className='form-control mr-sm-2 ml-sm-5'
        type='search'
        placeholder='Search Product'
      />
      <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
