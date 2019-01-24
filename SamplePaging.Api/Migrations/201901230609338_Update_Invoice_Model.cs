namespace SamplePaging.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Invoice_Model : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Invoices", "GrandTotal", c => c.Double(nullable: false));
            AddColumn("dbo.Invoices", "Pay", c => c.Double(nullable: false));
            AddColumn("dbo.Invoices", "Due", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Invoices", "Due");
            DropColumn("dbo.Invoices", "Pay");
            DropColumn("dbo.Invoices", "GrandTotal");
        }
    }
}
