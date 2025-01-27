using CRUD.Models;
using CRUD.Data;

namespace CRUD.Repositories;

public interface IProductoRepository {
    IEnumerable<Product> GetAll();
    Product GetById(int id);
    void Add(Product product);
    void Update(Product product);
    void Delete(int id);
}

public class ProductoRepository : IProductoRepository {
    
    private readonly AppDbContext _context;

    public ProductoRepository(AppDbContext context) {
        _context = context;
    }

    public IEnumerable<Product> GetAll() {
        return _context.Products.ToList();
    }

    public Product GetById(int id) {
    return _context.Products.FirstOrDefault(p => p.Id == id) 
        ?? throw new InvalidOperationException($"No se encontró un producto con ID {id}");
    }



    public void Add(Product product) {
        _context.Products.Add(product);
        _context.SaveChanges();
    }

    public void Update(Product product) {
        var productoExistente = GetById(product.Id);
        if (productoExistente != null)
        {
            productoExistente.Name = product.Name;;
            productoExistente.Price = product.Price;
            productoExistente.Category = product.Category;
            productoExistente.Description = product.Description;

            _context.Products.Update(productoExistente);
            _context.SaveChanges();
        }
    }

    public void Delete(int id) {
        var product = GetById(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();
        }
    }
}
