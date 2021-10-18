import { useState } from "react";

function Book(props) {
  const [bookShelf, setBookShelf] = useState(props.shelf);
  const { onMove, book } = props;

  function changeHandler(event) {
    setBookShelf(event.target.value);
    onMove(book, event.target.value);
  }
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.bookImage})`,
          }}
        />
        <div className="book-shelf-changer">
          <select value={bookShelf} onChange={changeHandler}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.bookTitle}</div>
      <div className="book-authors">{props.bookAuthor}</div>
    </div>
  );
}

export default Book;
