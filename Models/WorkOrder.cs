
namespace BiancasBikes.Models;

public class WorkOrder
{
    public int Id { get; set; }
    public string Description { get; set; }
    public DateTime DateInitiated { get; set; }
    public DateTime? DateCompleted { get; set; }

    public int? UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
    public int BikeId { get; set; }
    public Bike Bike { get; set; }
}

