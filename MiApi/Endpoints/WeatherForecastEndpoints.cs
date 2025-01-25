using MyApp.Models;

namespace MyApp.Endpoints;

public static class WeatherForecastEndpoints
{
    private static readonly List<WeatherForecast> weatherForecasts = new();

    public static void MapWeatherForecastEndpoints(this WebApplication app)
    {
        app.MapGet("/weatherforecast/{index}", (int index) =>
        {
            var result = ValidateIndex(index);
            if (result != null) return result;

            return Results.Ok(weatherForecasts[index]);
        });

        app.MapPost("/weatherforecast", (WeatherForecast weather) =>
        {
            weatherForecasts.Add(weather);
            return Results.Created($"/weatherforecast/{weatherForecasts.Count - 1}", weather);
        });

        app.MapPut("/weatherforecast/{index}", (int index, WeatherForecast updatedWeather) =>
        {
            var result = ValidateIndex(index);
            if (result != null) return result;

            weatherForecasts[index] = updatedWeather;
            return Results.Ok(new { message = "Elemento actualizado correctamente", updatedWeather });
        });

        app.MapDelete("/weatherforecast/{index}", (int index) =>
        {
            var result = ValidateIndex(index);
            if (result != null) return result;

            var deletedWeather = weatherForecasts[index];
            weatherForecasts.RemoveAt(index);

            return Results.Ok(new { message = "Elemento eliminado correctamente", deletedWeather });
        });

        app.MapGet("/weatherforecast", () =>
        {
            return Results.Ok(weatherForecasts);
        })
        .WithName("GetWeatherForecast");
    }

    private static IResult? ValidateIndex(int index)
    {
        if (index < 0 || index >= weatherForecasts.Count)
        {
            return Results.NotFound(new { message = "El índice está fuera de rango" });
        }
        return null; 
    }
}
