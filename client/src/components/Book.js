import React, { useState } from "react";
import RegisterBook from "./RegisterBook";
import UpdateBook from "./UpdateBook";
import SendBook from "./SendBook";

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

  const back = (
    <button
      onClick={() => {
        setRegisteringState(false);
        setUpdatingState(false);
        setSendingState(false);
      }}
    >
      Back
    </button>
  );

  return (
    <div className="tm-paging-links">
      {!sendingState && !registeringState && !updatingState && navigate}
      {sendingState && <SendBook />}
      {registeringState && <RegisterBook />}
      {updatingState && <UpdateBook />}
      <br />
      {(sendingState || registeringState || updatingState) && back}
    </div>
  );
};

export default Book;
