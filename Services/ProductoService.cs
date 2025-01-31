using CRUD.Repositories;
using CRUD.Models;

namespace CRUD.Services;

public interface IProductoService
{
    IEnumerable<Product> GetAll();
    Product GetById(int id);
    void Add(Product product);
    void Update(Product product);
    void Delete(int id);
    IEnumerable<Product> BuscarProductos(string query);
}

public class ProductoService : IProductoService
{
    private readonly IProductoRepository _productoRepository;

    public ProductoService(IProductoRepository productoRepository)
    {
        _productoRepository = productoRepository;
    }
public IEnumerable<Product> BuscarProductos(string query)
{
    if (string.IsNullOrWhiteSpace(query))
    {
        return _productoRepository.GetAll();
    }

    query = query.ToLower();

    return _productoRepository.GetAll().Where(p =>
        (!string.IsNullOrEmpty(p.Name) && p.Name.ToLower().Contains(query)) ||
        (!string.IsNullOrEmpty(p.Category) && p.Category.ToLower().Contains(query)) ||
        p.Price.ToString().Contains(query)
    );
}

    public IEnumerable<Product> GetAll()
    {
        return _productoRepository.GetAll();

    }

    public Product GetById(int id)
    {
        return _productoRepository.GetById(id);
    }

    public void Add(Product product)
    {
        _productoRepository.Add(product);
    }

    public void Update(Product product)
    {
        _productoRepository.Update(product);
    }

    public void Delete(int id)
    {
        _productoRepository.Delete(id);
    }
}