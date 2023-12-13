/* 
Filename: complexProgram.js
Content: A complex program that simulates a library management system.
*/

// Define Library class
class Library {
  constructor(name, books) {
    this.name = name;
    this.books = books;
    this.availableBooks = this.books.filter(book => book.status === "available");
    this.borrowedBooks = this.books.filter(book => book.status === "borrowed");
  }

  addBook(book) {
    this.books.push(book);
    if (book.status === "available") {
      this.availableBooks.push(book);
    } else if (book.status === "borrowed") {
      this.borrowedBooks.push(book);
    }
  }

  removeBook(bookId) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      const book = this.books.splice(bookIndex, 1)[0];
      if (book.status === "available") {
        const availableIndex = this.availableBooks.findIndex(b => b.id === bookId);
        if (availableIndex !== -1) {
          this.availableBooks.splice(availableIndex, 1);
        }
      } else if (book.status === "borrowed") {
        const borrowedIndex = this.borrowedBooks.findIndex(b => b.id === bookId);
        if (borrowedIndex !== -1) {
          this.borrowedBooks.splice(borrowedIndex, 1);
        }
      }
      console.log(`Successfully removed book: ${book.title}`);
    } else {
      console.log(`Book with ID ${bookId} does not exist.`);
    }
  }

  borrowBook(bookId, borrower) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      const book = this.books[bookIndex];
      if (book.status === "available") {
        book.status = "borrowed";
        book.borrower = borrower;
        this.borrowedBooks.push(book);
        const availableIndex = this.availableBooks.findIndex(b => b.id === bookId);
        if (availableIndex !== -1) {
          this.availableBooks.splice(availableIndex, 1);
        }
        console.log(`Successfully borrowed book: ${book.title}`);
      } else {
        console.log(`Book with ID ${bookId} is not available for borrowing.`);
      }
    } else {
      console.log(`Book with ID ${bookId} does not exist.`);
    }
  }

  returnBook(bookId) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      const book = this.books[bookIndex];
      if (book.status === "borrowed") {
        book.status = "available";
        book.borrower = null;
        this.availableBooks.push(book);
        const borrowedIndex = this.borrowedBooks.findIndex(b => b.id === bookId);
        if (borrowedIndex !== -1) {
          this.borrowedBooks.splice(borrowedIndex, 1);
        }
        console.log(`Successfully returned book: ${book.title}`);
      } else {
        console.log(`Book with ID ${bookId} is not currently borrowed.`);
      }
    } else {
      console.log(`Book with ID ${bookId} does not exist.`);
    }
  }
}

// Define Book class
class Book {
  constructor(id, title, author, status, borrower) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.status = status;
    this.borrower = borrower;
  }
}

// Create sample library and books
const sampleBooks = [
  new Book(1, "JavaScript: The Good Parts", "Douglas Crockford", "available", null),
  new Book(2, "Clean Code", "Robert C. Martin", "borrowed", "John Doe"),
  new Book(3, "Design Patterns", "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", "available", null),
  new Book(4, "The Pragmatic Programmer", "Andrew Hunt, David Thomas", "available", null),
  new Book(5, "Refactoring", "Martin Fowler", "borrowed", "Jane Smith")
];

const library = new Library("My Library", sampleBooks);

// Demonstrate library functionalities
console.log(`Welcome to ${library.name}!`);
console.log(`Total Books: ${library.books.length}`);
console.log(`Available Books: ${library.availableBooks.length}`);
console.log(`Borrowed Books: ${library.borrowedBooks.length}`);

library.removeBook(4);
library.borrowBook(3, "John Doe");
library.borrowBook(1, "Jane Smith");
library.returnBook(5);

console.log(`Available Books: ${library.availableBooks.length}`);
console.log(`Borrowed Books: ${library.borrowedBooks.length}`);
console.log("Library Demo Finished.");