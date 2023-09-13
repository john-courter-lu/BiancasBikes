import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
} from "reactstrap";

export default function BikeCard({ bike, setDetailsBikeId }) {
  return (
    <Card color="dark" outline style={{ marginBottom: "4px" }}>
      <CardBody>
        <CardTitle tag="h5">{bike.brand}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Owner: {bike.owner.name}
        </CardSubtitle>
        <CardText>Color: {bike.color}</CardText>
        <Button
          color="dark"
          onClick={() => {
            setDetailsBikeId(bike.id);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Show Details
        </Button>
      </CardBody>
    </Card>
  );
}
