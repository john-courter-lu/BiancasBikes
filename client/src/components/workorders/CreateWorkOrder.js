import { useEffect, useState } from "react";
import { getBikes } from "../../managers/bikeManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createWorkOrder } from "../../managers/workOrderManager.js";
import { useNavigate } from "react-router-dom";

export default function CreateWorkOrder({ loggedInUser }) {
  const [description, setDescription] = useState("");
  const [bikeId, setBikeId] = useState(0);
  const [bikes, setBikes] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkOrder = {
      bikeId,
      description,
    };

    createWorkOrder(newWorkOrder).then(() => {
      navigate("/workorders");
    });
  };

  useEffect(() => {
    getBikes().then(setBikes);
  }, []);

  return (
    <>
      <h2>Open a Work Order</h2>
      <Form>
        <FormGroup>
          <Label>Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Bike</Label>
          <Input
            type="select"
            value={bikeId}
            onChange={(e) => {
              setBikeId(parseInt(e.target.value));
            }}
          >
            <option value={0}>Choose a Bike</option>
            {bikes.map((b) => (
              <option
                key={b.id}
                value={b.id}
              >{`${b.owner.name} - ${b.brand} - ${b.color}`}</option>
            ))}
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}
