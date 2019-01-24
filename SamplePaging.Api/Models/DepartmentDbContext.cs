using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SamplePaging.Api.Models
{
    public class DepartmentDbContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public DepartmentDbContext() : base("name=DepartmentDbContext")
        {
            //Database.SetInitializer<DepartmentDbContext>(new CreateDatabaseIfNotExists<DepartmentDbContext>());
            //Database.SetInitializer<DepartmentDbContext>(new DropCreateDatabaseIfModelChanges<DepartmentDbContext>());
            //Database.SetInitializer<DepartmentDbContext>(new DropCreateDatabaseAlways<DepartmentDbContext>());
            //Database.SetInitializer<DepartmentDbContext>(new DepartmentDbContext());

        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetails> InvoiceDetails { get; set; }
    }
}
