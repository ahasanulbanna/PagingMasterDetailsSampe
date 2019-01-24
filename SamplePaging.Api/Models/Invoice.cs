using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SamplePaging.Api.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Date { get; set; }
        public int InvoiceNo { get; set; }
        public double GrandTotal { get; set; }
        public double Pay { get; set; }
        public double Due { get; set; }
        public virtual ICollection<InvoiceDetails> InvoiceDetails { get; set; }
    }
}