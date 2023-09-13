import { useState } from "react";
import BikeList from "./BikeList";
import BikeDetails from "./BikeDetails";

export default function Bikes() {
  const [detailsBikeId, setDetailsBikeId] = useState(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <BikeList setDetailsBikeId={setDetailsBikeId} />
        </div>
        <div className="col-sm-4">
          <BikeDetails detailsBikeId={detailsBikeId} />
        </div>
      </div>
    </div>
  );
}
