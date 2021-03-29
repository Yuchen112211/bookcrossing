import React, { useState } from "react";

const Book = () => {
  const [sendingState, setSendingState] = useState(false);
  const [registeringState, setRegisteringState] = useState(false);
  const [updatingState, setUpdatingState] = useState(false);

  const navigate = (
    <nav>
      <ul>
        <li className="tm-paging-item">
          <button
            className="tm-paging-link"
            onClick={() => setSendingState(true)}
          >
            Send a book
          </button>
        </li>
        <li className="tm-paging-item">
          <button
            className="tm-paging-link"
            onClick={() => setRegisteringState(true)}
          >
            Register a book
          </button>
        </li>
        <li className="tm-paging-item">
          <button
            className="tm-paging-link"
            onClick={() => setUpdatingState(true)}
          >
            Update book info
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className="tm-paging-links">
      {!sendingState && !registeringState && !updatingState && navigate}
    </div>
  );
};

export default Book;
