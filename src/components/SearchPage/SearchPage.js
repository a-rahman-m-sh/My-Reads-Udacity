import { useRef, useState } from "react";
import * as BooksAPI from "../../BooksAPI";
import Book from "../BookShelf/Book";
import { NavLink } from "react-router-dom";

function SearchPage(props) {
  const [searchBooks, setSearchBooks] = useState([]);
  const searchInputRef = useRef();
  const { books } = props;
  function searchHandler() {
    const enteredSearchTerm = searchInputRef.current.value;
    if (enteredSearchTerm.length > 0) {
      BooksAPI.search(enteredSearchTerm).then((books) => {
        if (books.error) {
          setSearchBooks([]);
        } else {
          setSearchBooks(books);
        }
      });
    } else {
      setSearchBooks([]);
    }
  }

  searchBooks.forEach(function (searchedBook) {
    books.forEach(function (book) {
      if (book.id === searchedBook.id) {
        searchedBook.shelf = book.shelf;
      }
    });
    if (!searchedBook.shelf) {
      searchedBook.shelf = "none";
    }
  });
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <NavLink to="/">
          <button className="close-search">Close</button>{" "}
        </NavLink>
        <div className="search-books-input-wrapper">
          {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
          <input
            type="text"
            placeholder="Search by title or author"
            ref={searchInputRef}
            onChange={searchHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBooks.map((book) => {
            if (book.imageLinks && book.title && book.authors) {
              return (
                <Book
                  key={book.id}
                  bookTitle={book.title}
                  bookImage={book.imageLinks.thumbnail}
                  bookAuthor={book.authors}
                  shelf={book.shelf}
                  onMove={props.onMove}
                  book={book}
                />
              );
            }
            return "";
          })}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
