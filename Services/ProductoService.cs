using CRUD.Repositories;
using CRUD.Models;

namespace CRUD.Services;

public interface IProductoService {
    IEnumerable<Product> GetAll();
    Product GetById(int id);
    void Add(Product product);
    void Update(Product product);
    void Delete(int id);
}

public class ProductoService : IProductoService
{
    private readonly IProductoRepository _productoRepository;

    public ProductoService(IProductoRepository productoRepository)
    {
        _productoRepository = productoRepository;
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