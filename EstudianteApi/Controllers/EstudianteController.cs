using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EstudianteApi.Models;

namespace EstudianteApi.Controllers
{
    [Route("api/[controller]")]
    public class EstudianteController : ControllerBase
    {

        private readonly DBContext context;

        public EstudianteController(DBContext context)
        {

            this.context = context;

        }

        [HttpGet]
        public async Task<IActionResult> Lista() {

            List<Estudiante> lista = await context.Estudiantes.OrderByDescending(c => c.id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Estudiante request) {

            await context.Estudiantes.AddAsync(request);
            await context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Estudiante request)
        {

            context.Estudiantes.Update(request);
            await context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id) { 
        
            Estudiante estudiante = context.Estudiantes.Find(id);

            context.Estudiantes.Remove(estudiante);
            await context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

    }
}
