import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container,Row,Col,Table} from 'reactstrap';

const state = React.createContext({
  "pending":["1"],
  "ongoing":[],
  "completed":[]
});
function List(props){
    if(state._currentValue[props.data].length === 0)
      return <tr><td>Empty List :(</td></tr>
    else{
        var wholelist =  state._currentValue[props.data].map(function(a){
            return <tr><td>{a}</td></tr>
        });
        return wholelist;
    }
}
function ListCards(props){
    // var list = GetList(props.listname);
    return (
      <Col sm="4">
        <Table id = {props.listname}>
          <thead>
            <tr>
              <th if={props.listname === "pending"}>PENDING TASKS</th>
            </tr>
          </thead>
          <tbody>
              <List data={props.listname}/>
            </tbody>
        </Table>
      </Col>
    )
}
function AddTo(form){
    var val = document.getElementById("workname").value;
    state._currentValue[form.moveto].push({"name":val});
    document.getElementById("pending").value = <ListCards listname={"pending"}/>
}
function Input(props){
    switch(props.type){
       case "text": return <input type="text" name={props.name} id={props.name}/>
       case "textarea": return <div><textarea name={props.name}/></div>
    }
}
function ButtonFun(form){
  return <Button color="success" name={form.name} onClick={()=>AddTo(form)}>Add</Button>
}
function App() {  
  return (
    <div className="App ">
      <Container>
        <Row>
          <Col>
            <h1>My ToDo List</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="2">
          </Col>
          <Col sm="8">
              <span><Input type={"text"} name={"workname"}/></span>
              <span> </span>
              <span><ButtonFun type={"button"} name={"submit"} moveto={"pending"} /></span>
          </Col>
          <Col sm="2">
          </Col>
        </Row><br/>
        <Row>
            <ListCards listname={"pending"}/>
            <ListCards listname={"ongoing"}/>
            <ListCards listname={"completed"}/>
        </Row>
      </Container>
    </div>
  );
}

export default App;
