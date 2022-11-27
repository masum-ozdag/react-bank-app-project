import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Table,
} from "reactstrap";
import Interests from "./Interests";

export default function Accordions({ deleteAccordion,bank,setBanks,setToken,token }) {
  const [faiz, setFaiz] = useState(bank.interests);
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const addInerests = () => {
    setFaiz((prew) => [
      ...prew,
      {
        id: null,
        bank_id: bank.bank_id,
        interest: "",
        time_option: 0,
        credit_type: 0,
      },
    ]);
  };
  return (
    <Accordion flush open={open} toggle={toggle}>
      <AccordionItem>
        <hr />
        <AccordionHeader targetId="1">
          {bank.bank_name} &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={() => deleteAccordion(bank.id)} color="danger">
            Delete
          </Button>{" "}
        </AccordionHeader>

        <AccordionBody accordionId="1">
          <Table hover>
            <thead>
              <tr>
                <th>Tür</th>
                <th>Vade</th>
                <th>Aylık Faiz</th>
                <th>işlemler</th>
                <th>
                  <Button color="secondary" onClick={() => addInerests()}>
                    ekle
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {faiz.map((val, ind) => {
                return <Interests token={token} bank={bank} setToken={setToken} setBanks={setBanks} val={val} key={ind} />;
              })}
            </tbody>
          </Table>
        </AccordionBody>
        <hr />
      </AccordionItem>
    </Accordion>
  );
}
