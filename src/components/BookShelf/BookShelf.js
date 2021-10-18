import Book from "./Book";
function BookShelf(props) {
  const { title, books, shelf } = props;
  const booksOnShelf = books.filter((book) => book.shelf === shelf);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnShelf.map((book) => {
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
          })}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
