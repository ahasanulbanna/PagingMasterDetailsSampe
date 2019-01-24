namespace SamplePaging.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Course_Model : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "CourseCode", c => c.String());
            AddColumn("dbo.Courses", "Description", c => c.String());
            DropColumn("dbo.Courses", "Code");
            DropColumn("dbo.Courses", "Discription");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Courses", "Discription", c => c.String());
            AddColumn("dbo.Courses", "Code", c => c.String());
            DropColumn("dbo.Courses", "Description");
            DropColumn("dbo.Courses", "CourseCode");
        }
    }
}
