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
    [RoutePrefix("api/students")]
    public class StudentsController : ApiController
    {
        private readonly DepartmentDbContext db;
        public StudentsController()
        {
            db = new DepartmentDbContext();
        }
       
        [HttpGet]
        [Route("get-students")]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult GetStudents(int pageSize, int pageNumber, string searchText)
        {
            int total = 0;
            IQueryable<Student> students = db.Students.Where(x => (
               x.Name.Contains(searchText)||string.IsNullOrEmpty(searchText)));
            total = students.Count();
            students = students.OrderBy(x => x.Department).Skip((pageNumber - 1) * pageSize).Take(pageSize);
            return Ok(new ResponseMessage<List<Student>>()
            {
                Result = students.ToList(),
                Total = total
            });
        }


        [HttpGet]
        [Route("get-student")]
        public async Task<IHttpActionResult> GetStudnet(int studentid)
        {
            Student model = await db.Students.FindAsync(studentid);
            return Ok(new ResponseMessage<Student>
            {
                Result = model
            });
        }


        [HttpPost]
        [ModelValidation]
        [Route("save-student")]
        public async Task<IHttpActionResult> SaveStudent([FromBody] Student model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Students.Add(model);
            await db.SaveChangesAsync();
            return Ok(new ResponseMessage<Student>
            {
                Result = model
            });
        }

        [HttpPut]
        [Route("update-student/{studentId}")]
        public async Task<IHttpActionResult> UpdateStudent(int studentId, [FromBody] Student model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (studentId != model.StudentId)
            {
                return BadRequest();
            }

            db.Entry(model).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(studentId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(new ResponseMessage<Student>
            {
                Result = model

            });
        }

        [HttpDelete]
        [Route("delete-student/{studentId}")]
        public async Task<IHttpActionResult> DeleteStudent(int studentId)
        {
            Student student = db.Students.Find(studentId);
            if (student == null)
            {
                return NotFound();
            }

            db.Students.Remove(student);
            int savedId = await db.SaveChangesAsync();

            return Ok(new ResponseMessage<bool>
            {
                Result = savedId > 0
            });
        }


        private bool DepartmentExists(int studentId)
        {
            return db.Students.Count(e => e.StudentId == studentId) > 0;

        }

        // DELETE: api/Students/5
        public void Delete(int id)
        {
        }
    }
}
