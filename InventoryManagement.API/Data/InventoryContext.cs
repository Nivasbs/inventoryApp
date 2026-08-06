using Microsoft.EntityFrameworkCore;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Data
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options) : base(options) { }
        
        public DbSet<Product> Products { get; set; } = null!;
    }
}