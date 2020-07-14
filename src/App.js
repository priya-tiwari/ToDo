import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container,Row,Col,Table} from 'reactstrap';

  function Tile(props){
      console.log(props)
      return (<tr key={'key'+props.a}>
        <td>{props.index}</td>
      </tr>)
  }
  function List(props){
    if(props.data[props.listname].length === 0)
        return <tr><td>Empty List :(</td></tr>
    // else return <tr><td> List :(</td></tr>
      else{
          var name = props.data[props.listname];
          console.log(name);
          return name.map((index,a) => (
              <Tile index={index} a={a}/>
          ));
      }
  }
  function ListCards(props){
      // console.log(props);
      return (
        <Col sm="4">
          <Table>
            <thead>
              <tr>
                {props.listname === "pending".toString() && <th>PENDING TASKS</th>}
                {props.listname === "ongoing".toString() && <th>ONGOING TASKS</th>}
                {props.listname === "completed".toString() && <th>COMPLETED TASKS</th>}
              </tr>
            </thead>
            <tbody id={props.listname}>
                <List data={props.data} listname={props.listname}/>
            </tbody>
          </Table>
        </Col>
      )
  }
  
  function Input(props){
      switch(props.type){
        case "text": return <input type="text" name={props.name} id={props.name}/>
        case "textarea": return <div><textarea name={props.name}/></div>
      }
  }

class App extends Component{
    constructor(props){
      super();
      this.state = {
        "pending":[],
        "ongoing":[],
        "completed":[]
      };
      // this.state = this.state.bind(this);
    }
    
    AddTo = ()=>{
        var val = document.getElementById("workname").value;
        document.getElementById("workname").value = "";
        var x = this.state;
        x["pending"].push(val);
        this.setState(x);
        console.log(this.state);
    }

    render(){
      return(
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
                <span><Button color="success" name="add" onClick={this.AddTo}>Add</Button></span>
            </Col>
            <Col sm="2">
            </Col>
          </Row><br/>
          <Row>
              <ListCards listname="pending" data={this.state}/>
              <ListCards listname="ongoing" data={this.state}/>
              <ListCards listname="completed" data={this.state}/>
          </Row>
        </Container>
      </div>
      )
  }
}

export default App;
