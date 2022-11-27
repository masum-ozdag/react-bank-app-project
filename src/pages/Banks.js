import React, { useEffect } from "react";
import Bilgiler from "../components/Bilgiler";
import Accordions from "../components/Accordions";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Alert,
} from "reactstrap";

export default function Banks() {
  const [banks, setBanks] = React.useState([]);
  const [formValue, setFormValue] = React.useState({
    bank_name: "",
  });
  const [token, setToken] = React.useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk1NzM0MTQsImxldmVsIjoyLCJ1c2VySWQiOjYsInVzZXJuYW1lIjoibWFzdW0ub3pkYWdnIn0.fuIF--iUmmIagdDZd4nDk14BfHDYgXSI1T5PrBhE3jo"
  );

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  const save = () => {
    postBanks();
    togglee("");
  };

  const getBanks = () => {
    axios
      .get("http://localhost:81/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBanks(response.data.data);
      })
      .catch((error) => {});
  };

  const postBanks = () => {
    axios
      .post(
        "http://localhost:81/api/banks",
        {
          bank_name: formValue,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        getBanks();
      })
      .catch((error) => {});
  };

  const deleteAccordion = (id) => {
    axios
      .delete("http://localhost:81/api/banks", {
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

  useEffect(() => {
    getBanks();
  }, []);

  const [modal, setModal] = React.useState(false);

  const togglee = () => setModal(!modal);

  return (
    <div>
      <Bilgiler />
      <h3>Banks Page</h3>

      <Button color="primary" style={{ width: "10rem" }} onClick={togglee}>
        Add Bank
      </Button>
      <Modal isOpen={modal}>
        <ModalHeader>Add Bank</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                onChange={(e) => setFormValue(e.target.value)}
                name="bankName"
                placeholder="Add Bank..."
                type="text"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={save}>
            Add
          </Button>
          {""}
          <Button color="danger " onClick={togglee}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {banks.map((bank) => {
        return (
          <Accordions
            token={token}
            setToken={setToken}
            setBanks={setBanks}
            deleteAccordion={deleteAccordion}
            key={bank.id + bank.bank_name}
            bank={bank}
          />
        );
      })}

      {banks.length < 0 ? (
        <Alert color="danger">Herhangi bir banka bulunmamaktadır !</Alert>
      ) : (
        ""
      )}
    </div>
  );
}
