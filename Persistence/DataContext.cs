using Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Activity> Activities { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<Activity>()
            //    .HasData(
            //        new Activity { Id = 1, Name = "Value 101"},
            //        new Activity { Id = 2, Name = "Value 102"},
            //        new Activity { Id = 3, Name = "Value 103"}
            //    );
        }
    }
}
