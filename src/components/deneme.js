import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Table,
  Label,
} from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";

const Ekle = ({
  setToken,
  token,
  setAllBanks,
  allBanks,
  direction,
  ...args
}) => {
  const [data, setData] = useState({
    bank_name: "",
  });
  const [bank, setBank] = useState([]);

  const [selectedCreditType, setSelectedCreditType] = useState([]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const Add = () => {
    axios
      .post(
        "http://localhost/api/banks",
        {
          bank_name: data.bank_name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getBanks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBanks = () => {
    axios
      .get("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setAllBanks(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Delete = (id) => {
    axios
      .delete("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
        data: { id: id },
      })
      .then((res) => {
        console.log(res);
        const bbak = bank.filter((b) => b.id !== id);
        setBank(bbak);
        getBanks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [open, setOpen] = useState("");
  const openHandler = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [vade, setVade] = useState(
    selectedCreditType.type === 1
      ? [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ]
      : selectedCreditType.type === 2
      ? [
          { val: "12Ay", key: "3" },
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
    // console.log(event.target.value);
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

  return (
    <div>
      <center>
        <Button color="danger" onClick={toggle}>
          Banka Ekle
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Banka Ekle</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Banka İsmini Yazınız"
              name="bank_name"
              onChange={(e) => handleChange(e)}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={Add}>
              Ekle
            </Button>
            <Button color="secondary" onClick={toggle}>
              Kapat
            </Button>
          </ModalFooter>
        </Modal>
      </center>
      <Accordion flush open={open} toggle={openHandler}>
        {allBanks.map((allBanks) => {
          return (
            <AccordionItem>
              <AccordionHeader targetId={allBanks.id}>
                {allBanks.bank_name}
              </AccordionHeader>
              <AccordionBody accordionId={allBanks.id}>
                {allBanks.bank_name}
                <Button color="danger" onClick={() => Delete(allBanks.id)}>
                  Sil
                </Button>
                <Table>
                  <thead>
                    <tr>
                      <th>
                        <Label for="exampleSelect">Tür</Label>
                        <Input
                          type="select"
                          name="select"
                          id="credit_type"
                          onChange={(event) => changeType(event)}
                        >
                          <option id="1">Konut</option>
                          <option id="2">Tüketici</option>
                          <option id="3">Mevduat</option>
                        </Input>
                      </th>
                      <th>
                        <Label for="exampleSelect">Vade</Label>
                        <Input type="select" name="select">
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
                        <input></input>
                      </th>
                    </tr>
                  </thead>
                </Table>
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
Ekle.propTypes = {
  direction: PropTypes.string,
};

export default Ekle;