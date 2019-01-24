
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using SamplePaging.Api.Models;
using System.Web.Http.Cors;
using System.Threading.Tasks;

namespace SamplePaging.Api.Controllers
{
    [RoutePrefix("api/departments")]
    [EnableCors("*", "*", "*")]
    public class DepartmentsController : ApiController
    {
        private readonly DepartmentDbContext db;
        public DepartmentsController()
        {
            db = new DepartmentDbContext();
        }
    

        [HttpGet]
        [Route("get-departments")]
        public IHttpActionResult GetDepartments(int pageSize, int pageNumber,string searchText)
        {
            int total = 0;
            IQueryable<Department> department = db.Departments
                .Where(x=>
                (x.DepartmentCode.Contains(searchText)||string.IsNullOrEmpty(searchText)
                ||(x.Name.Contains(searchText)|| string.IsNullOrEmpty(searchText))));
            total = department.Count();

            department = department.OrderBy(x => x.DepartmentCode).Skip((pageNumber - 1) * pageSize).Take(pageSize);
            return Ok(new ResponseMessage<List<Department>>()
            {
                Result = department.ToList(),
                Total = total
            });
        }

        [HttpGet]
        [Route("get-department")]
        public async Task<IHttpActionResult> GetDepartment(int departmentId)
        {
            Department model = await db.Departments.FindAsync(departmentId);
            return Ok(new ResponseMessage<Department>
            {
                Result = model
            });
        }

        [HttpPost]
        [ModelValidation]
        [Route("save-department")]
        public async Task<IHttpActionResult> SaveDepartment([FromBody] Department model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Departments.Add(model);
            await db.SaveChangesAsync();
            return Ok(new ResponseMessage<Department>
            {
                Result = model
            });
        }

        [HttpPut]
        [Route("update-department/{departmentId}")]
        public async Task<IHttpActionResult> UpdateDepartment(int departmentId, [FromBody] Department model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (departmentId != model.DepartmentId)
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
                if (!DepartmentExists(departmentId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(new ResponseMessage<Department>
            {
                Result = model

            });
        }


        [HttpDelete]
        [Route("delete-department/{departmentId}")]
        public async Task<IHttpActionResult> DeleteDepartment(int departmentId)
        {
            Department department = db.Departments.Find(departmentId);
            if (department == null)
            {
                return NotFound();
            }

            db.Departments.Remove(department);
          int savedId=  await db.SaveChangesAsync();

            return Ok(new ResponseMessage<bool>
            {
                Result = savedId>0
            });
        }

        private bool DepartmentExists(int id)
        {
            return db.Departments.Count(e => e.DepartmentId == id) > 0;
        }
    }
}