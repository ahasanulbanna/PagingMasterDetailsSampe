using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SamplePaging.Api.Models
{
    public class InvoiceDetails
    {
        public int InvoiceDetailsId { get; set; }
        public string ItemName { get; set; }
        public double Quantity { get; set; }
        public double Rate { get; set; }
        public virtual Invoice Invoice { get; set; }
        public int InvoiceId { get; set; }
    }
}