import {Input,Form,Label,Button,FormGroup} from 'reactstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

export default function ExampleForm(){

const [text,setText] =useState({
    username:"proxolab",
    password:"jas34Qsd56Q03fj3yH@",
})
const Navigate = useNavigate()

const login = () =>{
    axios
    .post("http://localhost:81/api/login", {
      "username": text.username,
      "password": text.password,
    })
    .then((response) => {
      if (response.data.status !== "error") {
        localStorage.setItem("jwt",response.data.data)
        Navigate("/bilgiler")
      }
    })
    .catch((error) => {
      console.log(error);
      Navigate("/")
    });
};
       

    return(
        <div>
            <Form style={{width:"20rem",margin:"auto"}}>
            <FormGroup>
              <Label>username:</Label>
              <Input value={text.username} onChange={(e)=>setText((prev)=>({...prev, username:e.target.value}))} type="text" name="userName"  />
            </FormGroup>
            <FormGroup>
              <Label>password:</Label>
              <Input 
              value={text.password}
              onChange={(e)=>setText((prev)=>({...prev, password:e.target.value}))}          
                type="password"
                name="password"
              />
            </FormGroup>
           <Button  style={{width:"20rem",margin:"auto"}} color="primary  " onClick={()=>login()} >
            Login
          </Button>
          </Form>
        </div>
    )
}