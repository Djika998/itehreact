import React from "react";
import Dugme from "./Dugme";

export default function Trainer({ trainer, otvoriZakazivanje, zakazi }) {
  return (
    <div className="card" key={trainer.id}>
      <div className="card-up">
        <div>
          <div>
            {trainer.firstname} {trainer.lastname}
          </div>
          <div>{trainer.email}</div>
        </div>
        <Dugme
          text="Popuni"
          color="rgb(237, 255, 170)"
          click={otvoriZakazivanje}
        ></Dugme>
      </div>
      <div className="card-down hidden">
        <div className="card-down-container">
          <p>Duration</p>
          <input type="text" />
          <br />
          <p>Description</p>
          <input type="text" />
        </div>
        <Dugme
          text="Zakazi"
          color="rgb(180, 255, 170)"
          click={(e) => zakazi(trainer.id, e)}
        ></Dugme>
      </div>
    </div>
  );
}
