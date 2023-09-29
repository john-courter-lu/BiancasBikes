using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BiancasBikes.Data;
using Microsoft.EntityFrameworkCore;

namespace BiancasBikes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BikeController : ControllerBase
{
    private BiancasBikesDbContext _dbContext;

    public BikeController(BiancasBikesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    //only logged in users will be able to access it. 如果comment out, 则不需要登录就可查看
    public IActionResult Get()
    {
        return Ok(_dbContext.Bikes.Include(b => b.Owner).ToList());
    }

    // Get Bike Details by Id
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id) //Name GetById is not important. Route + HttpGet is.
    {
        var bike = _dbContext
            .Bikes
            .Include(b => b.Owner)
            .Include(b => b.BikeType)
            .Include(b => b.WorkOrders)
            .SingleOrDefault(b => b.Id == id);

        if (bike == null)
        {
            return NotFound();
        }

        return Ok(bike);
    }

    // Get Bike Count // instead of using .ToList(), use .Count()
    [HttpGet("inventory")]
    [Authorize]
    public IActionResult Inventory()
    {
        int inventory = _dbContext
        .Bikes
        .Where(b => b.WorkOrders.Any(wo => wo.DateCompleted == null))
        .Count();

        return Ok(inventory);
    }
}