import React from "react";
import Dugme from "./Dugme";

export default function Training({ training, getTrainersName, otkazi }) {
  return (
    <div className="card" key={training.id}>
      <div className="card-up">
        <div>
          <div>Vreme trajanja: {training.duration}</div>
          <div>Trener: {getTrainersName(training.trainer_id)}</div>
          <br />
          <div>Opis: {training.desc}</div>
        </div>
        <Dugme
          text="Otkazi"
          color="rgb(255, 169, 169)"
          click={() => otkazi(training.id)}
        ></Dugme>
      </div>
    </div>
  );
}
