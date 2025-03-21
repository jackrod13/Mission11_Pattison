using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace BookStore.API.Data
{
    public class BookDbContext : DbContext
    {

        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
    }
}
