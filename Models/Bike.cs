
namespace BiancasBikes.Models;
public class Bike
{
    public int Id { get; set; }
    public string Brand { get; set; }
    public string Color { get; set; }
    public int OwnerId { get; set; }
    public Owner Owner { get; set; }
    public int BikeTypeId { get; set; }
    public BikeType BikeType { get; set; }
    public List<WorkOrder> WorkOrders { get; set; }
}
