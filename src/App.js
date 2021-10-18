import React, { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf/BookShelf";
import Header from "./components/Header/Header";
import SearchPage from "./components/SearchPage/SearchPage";
import { NavLink, Route } from "react-router-dom";
function BooksApp() {
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
      <Route path="/search">
        <SearchPage books={myBooks} onMove={moveBook} />
      </Route>

      <Route path="/" exact>
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
            <NavLink to="/search">
              <button>Add a book</button>
            </NavLink>
          </div>
        </div>
      </Route>
    </div>
  );
}

export default BooksApp;
