namespace SamplePaging.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Master_Detais : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.InvoiceDetails",
                c => new
                    {
                        InvoiceDetailsId = c.Int(nullable: false, identity: true),
                        ItemName = c.String(),
                        Quantity = c.Double(nullable: false),
                        Rate = c.Double(nullable: false),
                        InvoiceId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.InvoiceDetailsId)
                .ForeignKey("dbo.Invoices", t => t.InvoiceId, cascadeDelete: true)
                .Index(t => t.InvoiceId);
            
            CreateTable(
                "dbo.Invoices",
                c => new
                    {
                        InvoiceId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        Date = c.DateTime(nullable: false),
                        InvoiceNo = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.InvoiceId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.InvoiceDetails", "InvoiceId", "dbo.Invoices");
            DropIndex("dbo.InvoiceDetails", new[] { "InvoiceId" });
            DropTable("dbo.Invoices");
            DropTable("dbo.InvoiceDetails");
        }
    }
}
