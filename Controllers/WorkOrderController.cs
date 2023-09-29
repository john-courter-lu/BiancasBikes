using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using BiancasBikes.Data;

namespace BiancasBikes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkOrderController : ControllerBase
{
    private BiancasBikesDbContext _dbContext;

    public WorkOrderController(BiancasBikesDbContext context)
    {
        _dbContext = context;
    }
    //the WorkOrderController constructor is injecting an instance of the BiancasBikesDbContext class to use to access the database.

    [HttpGet("incomplete")]
    [Authorize]
    public IActionResult GetIncompleteWorkOrders() //first endpoint in the class with the name: GetIncompleteWorkOrder
    {
        return Ok(_dbContext.WorkOrders
        .Include(wo => wo.Bike)
            .ThenInclude(b => b.Owner)
        .Include(wo => wo.Bike)
            .ThenInclude(b => b.BikeType)
        .Include(wo => wo.UserProfile)
        .Where(wo => wo.DateCompleted == null)
        .OrderBy(wo => wo.DateInitiated)
        .ThenByDescending(wo => wo.UserProfileId == null).ToList());

        //The query in the method uses OrderBy and ThenByDescending to order the work orders first by when they were created, so that the oldest appear first. Then they are further sorted by whether an employee has been assigned to them or not. If the work order does not have a UserProfileId, it will appear before one that does.

        //notice that we had to use Include twice for Bike. Once, to be able to call ThenInclude for Owner, and a second time to be able to call ThenInclude for BikeType.
    }
}