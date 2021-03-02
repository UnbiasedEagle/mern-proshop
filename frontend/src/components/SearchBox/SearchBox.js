import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="form-inline">
      <input
        type="text"
        className="form-control  mr-sm-2 ml-sm-5"
        placeholder="Search Products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn btn-outline-success p-2">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
