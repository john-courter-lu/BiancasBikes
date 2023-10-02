using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using BiancasBikes.Data;
using BiancasBikes.Models;

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

    // Get incomplete work orders
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

    // Post a new work order
    [HttpPost]
    [Authorize]
    public IActionResult CreateWorkOrder(WorkOrder workOrder)
    {
        workOrder.DateInitiated = DateTime.Now;
        _dbContext.WorkOrders.Add(workOrder);
        _dbContext.SaveChanges();
        return Created($"/api/workorder/{workOrder.Id}", workOrder);
    }

    // Update the work order
    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateWorkOrder(WorkOrder workOrder, int id)
    {
        WorkOrder workOrderToUpdate = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
        if (workOrderToUpdate == null)
        {
            return NotFound();
        }
        else if (id != workOrder.Id)
        {
            return BadRequest();
        }

        //These are the only properties that we want to make editable
        workOrderToUpdate.Description = workOrder.Description;
        workOrderToUpdate.UserProfileId = workOrder.UserProfileId;
        workOrderToUpdate.BikeId = workOrder.BikeId;

        _dbContext.SaveChanges();

        return NoContent();
    }

    // Complete a work order
    [HttpPost("{id}/complete")]
    [Authorize]
    public IActionResult CompleteWorkOrder(int id)
    {
        WorkOrder workOrderToUpdate = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
        if (workOrderToUpdate == null)
        {
            return NotFound();
        }

        //There is only one property that we want to make editable
        workOrderToUpdate.DateCompleted = DateTime.Now;

        _dbContext.SaveChanges();

        return NoContent();
    }

    // Delete an incomplete work order
    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteWorkOrder(int id)
    {
        WorkOrder workOrderToDelete = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
        if (workOrderToDelete == null)
        {
            return NotFound();
        }

        _dbContext.WorkOrders.Remove(workOrderToDelete);
        _dbContext.SaveChanges();

        return NoContent(); // return 204
    }
}

