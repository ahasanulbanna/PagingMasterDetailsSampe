using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SamplePaging.Api.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}