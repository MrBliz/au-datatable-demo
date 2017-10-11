using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using X.PagedList;
using static Gridtests.Controllers.SampleDataController;

namespace Gridtests.Controllers
{
  [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpPost("[action]")]
        public PagedResponse<WeatherForecast> WeatherForecasts(string sortProperty = "summary", string direction = "asc", int pageSize = 25, int pageNumber = 1)
        {
            var data = SeedData.GetForecasts(pageNumber, pageSize, sortProperty, direction);

            return new PagedResponse<WeatherForecast> { Result = data, Count = data.TotalItemCount };
        }

        public class PagedResponse<T>
        {
            public IEnumerable<T> Result { get; set; }
            public int Count { get; set; }
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(this.TemperatureC / 0.5556);
                }
            }
        }
    }

    public static class SeedData
    {

        public static IEnumerable<WeatherForecast> Forecasts { get; set; }
        public static IPagedList<WeatherForecast> GetForecasts(int pageNumber, int pageSize, string sortProperty, string direction)
        {
            var query = Forecasts.AsQueryable();

            bool ascending = direction == "asc";

            query = sortProperty == "dateFormatted" ? query.OrderBy(X => X.DateFormatted) : query.OrderByDescending(X => X.DateFormatted);
            query = sortProperty == "temperatureC" ? query.OrderBy(X => X.TemperatureC) : query.OrderByDescending(X => X.TemperatureC);
            query = sortProperty == "temperatureF" ? query.OrderBy(X => X.TemperatureF) : query.OrderByDescending(X => X.TemperatureF);
            query = sortProperty == "summary" ? query.OrderBy(X => X.Summary) : query.OrderByDescending(X => X.Summary);

            return query.ToPagedList(pageNumber, pageSize);
        }

        public static void Data()
        {
            var rng = new Random();


            Forecasts = Enumerable.Range(1, 500).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }


        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
    }
}
