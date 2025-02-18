using Xunit;

namespace TDD.Tests;

public class CalculadoraTests
{
    [Fact]
    public void Sumar_DeberiaRetornarLaSumaDeDosNumeros()
    {
        // Arrange
        var calculadora = new Calculadora();

        // Act
        int resultado = calculadora.Sumar(2, 3);

        // Assert
        Assert.Equal(5, resultado);
    }
}
