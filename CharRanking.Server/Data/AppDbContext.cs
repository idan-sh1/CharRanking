using CharRanking.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace CharRanking.Server.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set relationships between entities
            modelBuilder.Entity<AppUser>()
                .HasMany(au => au.Rankings)             // User has many Ranking Data
                .WithOne(r => r.AppUser)                 // Ranking Data has one User
                .HasForeignKey(r => r.AppUserID)         // Foreign key is AppUserID in Ranking
                .IsRequired();                     // Can't have Ranking Data without User
        }

        public DbSet<Ranking> Rankings { get; set; }

    }
}
