import React, { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf/BookShelf";
import Header from "./components/Header/Header";
import SearchPage from "./components/SearchPage/SearchPage";

function BooksApp() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [myBooks, setMyBooks] = useState([]);

  const bookshelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
  ];
  useEffect(() => {
    BooksAPI.getAll().then((booksFromAPI) => {
      setMyBooks(booksFromAPI);
    });
  }, [myBooks]);

  function hideSearchHandler() {
    setShowSearchPage(false);
  }

  function showSearchHandler() {
    setShowSearchPage(true);
  }

  function moveBook(book, shelf) {
    BooksAPI.update(book, shelf).then((books) => {
      if (book.shelf === "none" && shelf !== "none") {
        const newBooks = myBooks.concat(book);
        setMyBooks(newBooks);
      }
      const updatedBooks = myBooks.map((c) => {
        if (c.id === book.id) {
          c.shelf = shelf;
        }
        return c;
      });

      setMyBooks(updatedBooks);

      if (shelf === "none") {
        const newBooks = myBooks.filter(
          (deleteBook) => deleteBook.id !== book.id
        );
        setMyBooks(newBooks);
      }
    });
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          onHideSearchPage={hideSearchHandler}
          books={myBooks}
          onMove={moveBook}
        />
      ) : (
        <div className="list-books">
          <Header />

          <div className="list-books-content">
            <div>
              {bookshelves.map((bookShelf) => {
                return (
                  <BookShelf
                    key={bookShelf.key}
                    books={myBooks}
                    title={bookShelf.name}
                    shelf={bookShelf.key}
                    onMove={moveBook}
                  />
                );
              })}
            </div>
          </div>
          <div className="open-search">
            <button onClick={showSearchHandler}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksApp;
