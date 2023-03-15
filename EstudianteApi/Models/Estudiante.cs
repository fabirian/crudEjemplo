using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EstudianteApi.Models{

    public partial class Estudiante
    {
        [Key]
        public int id{get; set;}
        public string? nombre {get; set;}
        public string? apellido {get; set;}
        
        public string? genero {get; set;}
    }
}