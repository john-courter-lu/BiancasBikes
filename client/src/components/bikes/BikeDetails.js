import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText } from "reactstrap";
import { getBikeById } from "../../managers/bikeManager";

export default function BikeDetails({ detailsBikeId }) {
  const [bike, setBike] = useState(null);

  const getBikeDetails = (id) => {
    getBikeById(id).then(setBike);
  };

  useEffect(() => {
    if (detailsBikeId) {
      getBikeDetails(detailsBikeId);
    }
  }, [detailsBikeId]);

  if (!bike) {
    return (
      <>
        <h2>Bike Details</h2>
        <p>Please choose a bike...</p>
      </>
    );
  }
  return (
    <>
      <h2>Bike Details</h2>
      <Card color="dark" inverse>
        <CardBody>
          <CardTitle tag="h4">{bike.brand}</CardTitle>
          <p>Owner: {bike.owner.name}</p>
          <p>Address: {bike.owner.address}</p>
          <p>Type: {bike.bikeType.name}</p>
          <p>Color: {bike.color}</p>
        </CardBody>
      </Card>
      <h4>Work Order History</h4>
      {bike.workOrders.map((wo) => (
        <Card
          outline
          color="warning"
          key={wo.id}
          style={{ marginBottom: "4px" }}
        >
          <CardBody>
            <CardTitle tag="h5">{wo.dateInitiated.split("T")[0]}</CardTitle>
            <CardSubtitle>
              Completed:{" "}
              {wo.dateCompleted ? wo.dateCompleted.split("T")[0] : "Open"}
            </CardSubtitle>
            <CardText>Description: {wo.description}</CardText>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
