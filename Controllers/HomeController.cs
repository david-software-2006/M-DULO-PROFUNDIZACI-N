using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CRUD.Models;
using CRUD.Services;

namespace CRUD.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IProductoService _productoService;

    public HomeController(ILogger<HomeController> logger, IProductoService productoService)
    {
        _logger = logger;
        _productoService = productoService;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult Products()
    {
        var productos = _productoService.GetAll();
        return View(productos);
    }

    public IActionResult CrearProducto()
    {
        return View();
    }

    [HttpPost]
    public IActionResult CrearProducto(Product product)
    {
        if (ModelState.IsValid)
        {
            _productoService.Add(product);
            return RedirectToAction("Products");
        }
        return View(product);
    }

    public IActionResult ActualizarProducto(int id)
    {
        var product = _productoService.GetById(id);
        if (product == null)
        {
            return NotFound("Producto no encontrado");
        }
        return View(product);  
    }

    [HttpPost]
   [HttpPost]
public IActionResult ActualizarProducto(Product product)
{
    if (product.Id == 0)
    {
        return BadRequest("Id del producto no proporcionado");
    }

    if (ModelState.IsValid)
    {
        _productoService.Update(product);
        return RedirectToAction("Products");
    }
    return View(product);
}
    public IActionResult EliminarProducto(int id)
    {
        var producto = _productoService.GetById(id);
        if (producto == null)
        {
            return NotFound("Producto no encontrado");
        }

        return View(producto); 
    }



    [HttpPost]
    public IActionResult ConfirmarEliminar(int id)
    {
        var producto = _productoService.GetById(id);
        if (producto != null)
        {
            _productoService.Delete(id); // Elimina el producto
            return RedirectToAction("Products"); // Redirige de nuevo a la lista de productos
        }
        return NotFound("Producto no encontrado");
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
