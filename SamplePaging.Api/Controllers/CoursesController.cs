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
    [RoutePrefix("api/courses")]
    [EnableCors("*", "*", "*")]
    public class CoursesController : ApiController
    {
        private readonly DepartmentDbContext db;
        public CoursesController()
        {
            db = new DepartmentDbContext();
        }

        [HttpGet]
        [Route("get-courses")]
        public IHttpActionResult GetCourses(int pageSize, int pageNumber, string searchText)
        {
            int total = 0;
            IQueryable<Course> courses = db.Courses
                .Where(x => (
                x.CourseCode.Contains(searchText) || string.IsNullOrEmpty(searchText) || x.Name.Contains(searchText) || string.IsNullOrEmpty(searchText)));
            total = courses.Count();
            courses = courses.OrderBy(x => x.CourseCode).Skip((pageNumber - 1) * pageSize).Take(pageSize);
            return Ok(new ResponseMessage<List<Course>>()
            {
                Result=courses.ToList(),
                Total=total
            });
        }


        [HttpGet]
        [Route("get-course")]
        public async Task<IHttpActionResult> GetCourse(int CourseId)
        {
            Course model = await db.Courses.FindAsync(CourseId);
            return Ok(new ResponseMessage<Course>
            {
                Result=model
            });
        }

        [HttpPost]
        [ModelValidation]
        [Route("save-course")]
        public async Task<IHttpActionResult> SaveCourse([FromBody] Course model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            db.Courses.Add(model);
            await db.SaveChangesAsync();
            return Ok(new ResponseMessage<Course>
            {
                Result = model
            });
        }

        [HttpPut]
        [Route("update-course/{courseId}")]
        public async Task<IHttpActionResult> UpdateCourse(int courseId, [FromBody]Course model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (courseId != model.CourseId)
            {
                return NotFound();
            }
            db.Entry(model).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(courseId))
                {
                   return NotFound();
                }
                else
                {
                    throw;
                }
              
            }

            return Ok(new ResponseMessage<Course>
            {
                Result = model
            });
        }


        [HttpDelete]
        [Route("delete-course/{courseId}")]
        public async Task<IHttpActionResult>DeleteCourse(int courseId)
        {
            Course course = await db.Courses.FindAsync(courseId);
            if (course == null)
            {
                return NotFound();
            }
            db.Courses.Remove(course);
            int Saved = await db.SaveChangesAsync();
            return Ok(new ResponseMessage<bool>
            {
                Result = Saved > 0
            });
        }

        private bool CourseExists(int Id)
        {
            return db.Courses.Count(x => x.CourseId == Id) > 0;
        }

    }
}
