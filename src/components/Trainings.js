import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import Trainer from "./Trainer";
import Training from "./Training";

const Trainings = ({ users, user, setUser }) => {
  const [menu, setMenu] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const history = useHistory();

  useEffect(() => {
    console.log(user);
    if (!user) {
      history.push("/");
      return;
    }

    getData();
  }, []);

  const getData = async () => {
    // Trainers
    const resTrainers = await axios.get("http://localhost:8000/api/trainers");
    setTrainers(resTrainers.data.data);

    // My trainings
    const resTrainings = await axios.get("http://localhost:8000/api/trainings");

    const trainingsArr = resTrainings.data.data
      .reverse()
      .filter((training) => training.user_id == user.id);

    console.log(trainingsArr);
    setTrainings(trainingsArr);
  };

  const otvoriZakazivanje = (e) => {
    const downElement = e.target.parentNode.nextSibling;
    console.log(downElement);
    downElement.classList.toggle("hidden");
  };

  const zakazi = async (trainerId, e) => {
    const inputs = e.target.parentNode.getElementsByTagName("INPUT");
    const duration = inputs[0].value;
    const desc = inputs[1].value;

    console.log(user.id, trainerId, duration, desc);

    if (duration == "" || desc == "") {
      alert("Unesite polja!");
      return;
    }

    console.log(e.target.parentNode);

    const formData = new FormData();

    formData.append("user_id", user.id);
    formData.append("trainer_id", trainerId);
    formData.append("duration", duration);
    formData.append("desc", desc);

    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/trainings",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status == 201) {
        alert("Uspesno ste zakazali");
        inputs[0].value = "";
        inputs[1].value = "";
        e.target.parentNode.classList.toggle("hidden");
        getData();
      } else {
        alert("Nije uspelo zakazivanje");
      }
    } catch (err) {
      console.log(err);
      alert("Nije uspelo zakazivanje");
    }
  };

  const otkazi = async (trainingId) => {
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/trainings/${trainingId}`
    );

    if (res.status == 200) {
      alert("Trening uspesno otkazan!");
      getData();
    } else {
      alert("Doslo je do greske");
    }
  };

  const getTrainersName = (trainerId) => {
    const found = trainers.filter((trainer) => trainer.id == trainerId)[0];

    if (found) {
      return `${found.firstname} ${found.lastname}`;
    }
  };

  return (
    <>
      {user && (
        <>
          <h1>Zdravo {user.name}</h1>
          <div className="izbor">
            <p onClick={() => setMenu(true)}>Zakazi trening</p>
            <p onClick={() => setMenu(false)}>Moji treninzi</p>
          </div>

          {/* Dve strane */}
          {menu ? (
            //   Prva strana
            <>
              <h4>Treneri:</h4>

              <div>
                {trainers.map((trainer) => (
                  <Trainer
                    key={trainer.id}
                    trainer={trainer}
                    otvoriZakazivanje={otvoriZakazivanje}
                    zakazi={zakazi}
                  />
                ))}
              </div>
            </>
          ) : (
            //   Druga strana
            <>
              {trainings.length ? (
                <>
                  <h4>Treninzi:</h4>

                  <div>
                    {trainings.map((training) => (
                      <Training
                        key={training.id}
                        training={training}
                        getTrainersName={getTrainersName}
                        otkazi={otkazi}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <h4>Nemate zakazane treninge</h4>
              )}
            </>
          )}
        </>
      )}

      <div
        className="logout"
        onClick={() => {
          setUser(undefined);
          history.push("/");
        }}
      >
        Log out
      </div>
    </>
  );
};

export default Trainings;
