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

        public BookController(BookDbContext temp) => _bookContext = temp;

        // Get all books with optional pagination and category filtering
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategories = null)
        {
            try
            {
                var query = _bookContext.Books.AsQueryable();

                if (bookCategories != null && bookCategories.Any())
                {
                    query = query.Where(b => bookCategories.Contains(b.Category));
                }

                var totalNumBooks = query.Count();

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

        // Get all distinct book categories
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

        // ✅ Get single book by ID (used by Purchase page)
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

        // Add a new book
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        // Update an existing book
        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);

            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

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

        // Delete a book
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

            return NoContent();
        }
    }
}
