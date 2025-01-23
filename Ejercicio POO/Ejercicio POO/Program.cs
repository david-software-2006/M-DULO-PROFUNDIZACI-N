public abstract class Empleado
{
    public String Nombre { get; set; }

    protected Empleado(String nombre)
    {
        Nombre = nombre;
    } 

    public abstract decimal calcularSalario();

    public override string ToString()
    {
        return $"Empleado: {Nombre}";

    }
}

public class EmpleadoTiempoCompleto : Empleado
{
    public decimal SalarioAnual {  get; set; }

    public EmpleadoTiempoCompleto(String nombre, decimal salarioAnual) : base (nombre)
    {
        SalarioAnual = salarioAnual;
    }


    public override decimal calcularSalario()
    {
        return SalarioAnual / 12;
    }
}

public class EmpleadoPorHora : Empleado
{
    public decimal TarifaPorHora { get; set; }

    public int HorasTrabajadas { get; set; }

    public EmpleadoPorHora(String nombre, decimal tarifaPorHora,  int horasTrabajadas) : base (nombre)
    {
        TarifaPorHora = tarifaPorHora;  
        HorasTrabajadas = horasTrabajadas;
    }

    public override decimal calcularSalario() 
    {
        return TarifaPorHora * HorasTrabajadas;
    }

}

class Program
{
    static void Main(string[] args)
    {
        List<Empleado> empleados = new List<Empleado>
        {
            new EmpleadoTiempoCompleto("Jazz", 5000000),
            new EmpleadoTiempoCompleto("Son", 12000000),
            new EmpleadoPorHora("Tab", 60000, 8),
            new EmpleadoPorHora("Rin", 80000, 10)
        };

        foreach (Empleado empleado in empleados) 
        {
            Console.WriteLine($"{empleado.ToString()} - Salario: {empleado.calcularSalario():c}");
        }
    }
}