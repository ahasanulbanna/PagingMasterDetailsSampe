using SamplePaging.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SamplePaging.Api.Controllers
{
    [RoutePrefix("api/invoices")]
    [EnableCors("*", "*", "*")]
    public class InvoicesController : ApiController
    {
        private readonly DepartmentDbContext db;
        public InvoicesController()
        {
            db = new DepartmentDbContext();
        }


        [HttpGet]
        [Route("get-invoices")]
        public IHttpActionResult Getinvoices(int pageSize, int pageNumber, string searchText)
        {
            int total = 0;
            IQueryable<Invoice> invoice = db.Invoices
                .Where(x =>
                (x.Phone.Contains(searchText) || string.IsNullOrEmpty(searchText)
                || (x.Phone.Contains(searchText) || string.IsNullOrEmpty(searchText))));
            total = invoice.Count();

            invoice = invoice.OrderBy(x => x.Date).Skip((pageNumber - 1) * pageSize).Take(pageSize);
            return Ok(new ResponseMessage<List<Invoice>>()
            {
                Result = invoice.ToList(),
                Total = total
            });
        }


        [HttpPost]
        [ModelValidation]
        [Route("save-invoice")]
        public async Task<IHttpActionResult> SaveInvoice([FromBody] Invoice model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Invoices.Add(model);
            await db.SaveChangesAsync();
            return Ok(new ResponseMessage<Invoice>
            {
                Result = model
            });
        }

        [HttpGet]
        [Route("get-invoice")]
        public async Task<IHttpActionResult> GetInvoice(int invoiceId)
        {
            Invoice model = await db.Invoices.FindAsync(invoiceId);
            var getMaxInvoiceNo = db.Invoices.Max(x => x.InvoiceNo);
            if (model == null)
            {
                return Ok(new ResponseMessage<int>
                {

                    Result = getMaxInvoiceNo + 1,
                    Message="InvoiceNo"
                });

            }
            else
            {
                return Ok(new ResponseMessage<Invoice>
                {

                    Result = model
                });

            }
        }


        [HttpPut]
        [Route("update-invoice/{invoiceId}")]
        public async Task<IHttpActionResult> UpdateInvoice(int invoiceId, [FromBody] Invoice model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (invoiceId != model.InvoiceId)
            {
                return BadRequest();
            }

            var existinginvoice = db.Invoices
               .Where(p => p.InvoiceId == model.InvoiceId)
               .Include(p => p.InvoiceDetails)
               .SingleOrDefault();

            if (existinginvoice != null)
            {
                // Update Invoice
                db.Entry(existinginvoice).CurrentValues.SetValues(model);
                foreach (var InvoiceDetail in existinginvoice.InvoiceDetails.ToList())
                {
                    if (!model.InvoiceDetails.Any(x=>x.InvoiceDetailsId==InvoiceDetail.InvoiceDetailsId))
                    {               
                        db.InvoiceDetails.Remove(InvoiceDetail);
                        db.SaveChanges();
                    }
                  
                }

                foreach (var invoicedetail in model.InvoiceDetails)
                {
                    var existingInvoiceDetail = existinginvoice.InvoiceDetails
                        .Where(c => c.InvoiceDetailsId == invoicedetail.InvoiceDetailsId)
                        .SingleOrDefault();

                    if (existingInvoiceDetail != null)
                    {
                        // Update InvoiceDetails
                        db.Entry(existingInvoiceDetail).CurrentValues.SetValues(invoicedetail);
                    }
                    else
                    {
                        existinginvoice.InvoiceDetails.Add(invoicedetail);
                    }
                    db.SaveChanges();
                                 
                }
            }
           
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExits(invoiceId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(new ResponseMessage<Invoice>
            {
                Result = model

            });
        }

        private bool InvoiceExits(int invoiceId)
        {
            return db.Invoices.Count(e => e.InvoiceId == invoiceId) > 0;
        }
    }
}
