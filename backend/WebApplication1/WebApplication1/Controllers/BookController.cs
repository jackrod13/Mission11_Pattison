using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookStore.API.Data;
using WebApplication1.Data;
using System.Linq;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        // Inject BookDbContext through constructor
        public BookController(BookDbContext temp) => _bookContext = temp;

        // GET: api/Book/AllBooks
        // Returns paginated list of books with optional category filtering
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategories = null)
        {
            try
            {
                var query = _bookContext.Books.AsQueryable();

                // Apply category filter if provided
                if (bookCategories != null && bookCategories.Any())
                {
                    query = query.Where(b => bookCategories.Contains(b.Category));
                }

                var totalNumBooks = query.Count();

                // Apply pagination
                var books = query
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var result = new
                {
                    Books = books,
                    TotalNumBooks = totalNumBooks
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/Book/GetBookCategories
        // Returns all distinct book categories from the database
        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            try
            {
                var bookCategories = _bookContext.Books
                    .Select(b => b.Category)
                    .Distinct()
                    .ToList();

                return Ok(bookCategories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/Book/{bookId}
        // Returns a single book by its ID (used on Purchase page)
        [HttpGet("{bookId}")]
        public IActionResult GetBookById(int bookId)
        {
            var book = _bookContext.Books.FirstOrDefault(b => b.BookID == bookId);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            return Ok(book);
        }

        // POST: api/Book/AddBook
        // Adds a new book to the database
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        // PUT: api/Book/UpdateBook/{bookId}
        // Updates an existing book in the database
        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);

            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            // Update individual fields
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Category = updatedBook.Category;
            existingBook.Price = updatedBook.Price;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        // DELETE: api/Book/DeleteBook/{bookId}
        // Deletes a book by ID
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent(); // 204 No Content
        }
    }
}
