import {
    Nav,
    NavItem,
    NavLink} from "reactstrap";
import {useNavigate} from 'react-router-dom'

export default function Bilgiler(){


    const navigate =useNavigate()

    return(
        <div>
       
            <Nav tabs>
     
      <NavItem>
        <NavLink onClick={()=>navigate("/calculate")}>Calculate</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={()=>navigate("/banks")}>Add Bank</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={()=>navigate("/")}>Log out</NavLink>
      </NavItem>
    </Nav>
   
        </div>
    )
}