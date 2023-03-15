using Microsoft.EntityFrameworkCore;

namespace EstudianteApi.Models
{
public partial class DBContext : DbContext
{
    
    public DBContext(DbContextOptions<DBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Estudiante> Estudiantes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => e.id)
                    .HasName("PK__Estudiante__4B1329C79F454C2A");

                entity.ToTable("Estudiante");

                entity.Property(e => e.id).HasColumnName("id");

                entity.Property(e => e.nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.apellido)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("apellido");

                entity.Property(e => e.genero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("genero");

                
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}