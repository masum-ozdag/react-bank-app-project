import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "reactstrap";
import { Label, Input } from "reactstrap";
import axios from "axios";

const Interests = ({ val, setBanks, setToken, token, bank }) => {
  const [selectedCreditType, setSelectedCreditType] = useState([]);

  const [textInterest, setTextInterest] = useState({
    interest: val.interest,
    type: val.credit_type,
    vade: val.time_option,
  });

  const [vade, setVade] = useState(
    selectedCreditType.type === 1
      ? [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ]
      : selectedCreditType.type === 2
      ? [
          { val: "24Ay", key: "4" },
          { val: "36Ay", key: "5" },
        ]
      : selectedCreditType.type === 3
      ? [
          { val: "3Ay", key: "1" },
          { val: "6Ay", key: "2" },
          { val: "12Ay", key: "3" },
        ]
      : []
  );

  const changeType = (event) => {
    setSelectedCreditType(event.target.value);
    setTextInterest((prev) => ({
      ...prev,
      type:
        event.target.value === "Konut"
          ? 1
          : event.target.value === "Tüketici"
          ? 2
          : event.target.value === "Mevduat"
          ? 3
          : 0,
    }));
    setVade(
      event.target.value === "Konut"
        ? [
            { val: "5Yıl", key: "6" },
            { val: "10Yıl", key: "7" },
          ]
        : event.target.value === "Tüketici"
        ? [
            { val: "12Ay", key: "3" },
            { val: "24Ay", key: "4" },
            { val: "36Ay", key: "5" },
          ]
        : event.target.value === "Mevduat"
        ? [
            { val: "3Ay", key: "1" },
            { val: "6Ay", key: "2" },
            { val: "12Ay", key: "3" },
          ]
        : []
    );
  };

  const getBanks = () => {
    axios
      .get("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBanks(response.data.data);
      })
      .catch((error) => {
        setToken("");
        // setStatus("");
        localStorage.removeItem("token");
      });
  };

  const interestsSave = () => {
    if (
      textInterest.interest === "" ||
      textInterest.type === "" ||
      textInterest.vade === ""
    ) {
      alert("Boşlukları doldurun!");
    } else {
      console.log({
        bank_id: bank.id,
        interest: parseFloat(textInterest.interest),
        credit_type: parseInt(textInterest.type),
        time_option: parseInt(textInterest.vade),
      });
      axios
        .post(
          "http://localhost:81/api/interests",
          {
            bank_id: bank.id,
            interest: parseFloat(textInterest.interest),
            credit_type: parseInt(textInterest.type),
            time_option: parseInt(textInterest.vade),
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          getBanks();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteInterest = (id) => {
    axios
      .delete("http://localhost:81/api/interests", {
        headers: {
          Authorization: token,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        getBanks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <tr>
      <th>
        <Label for="exampleSelect">Tür</Label>
        <Input
          type="select"
          name="select"
          id="credit_type"
          onChange={changeType}
        >
          <option id="1">Konut</option>
          <option id="2">Tüketici</option>
          <option id="3">Mevduat</option>
        </Input>
      </th>
      <th>
        <Label for="exampleSelect">Vade</Label>
        <Input
          type="select"
          name="select"
          onChange={(e) =>
            setTextInterest((prev) => ({ ...prev, vade: e.target.value }))
          }
        >
          {vade.map((value) => {
            return (
              <option value={value.key} key={uuidv4()}>
                {value.val}
              </option>
            );
          })}
        </Input>
      </th>
      <th>
        <p>Aylık Faiz Oranı</p>
        <input
          onChange={(e) =>
            setTextInterest((prev) => ({ ...prev, interest: e.target.value }))
          }
        ></input>
      </th>

      <th>
        <p> </p>
        <Button color="success" onClick={() => interestsSave()}>
          Save
        </Button>
      </th>

      <th>
        <p></p>
        <Button color="danger" onClick={() => deleteInterest()}>
          Delete
        </Button>
      </th>
    </tr>
  );
};

export default Interests;
