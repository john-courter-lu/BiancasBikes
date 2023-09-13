import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import { getBikes } from "../../managers/bikeManager";

export default function BikeList({ setDetailsBikeId }) {
  const [bikes, setBikes] = useState([]);

  const getAllBikes = () => {
    getBikes().then(setBikes);
  };

  useEffect(() => {
    getAllBikes();
  }, []);
  return (
    <>
      <h2>Bikes</h2>
      {bikes.map((bike) => (
        <BikeCard
          bike={bike}
          setDetailsBikeId={setDetailsBikeId}
          key={`bike-${bike.id}`}
        ></BikeCard>
      ))}
    </>
  );
}
