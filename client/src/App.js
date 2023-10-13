import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import arrayChunk from 'lodash.chunk';
import io from 'socket.io-client';
const socket = io('http://localhost:4001');
socket.on('connect', () => {
  console.log('connected');
})
function App() {
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState("");
  const [obj, setObj] = useState([]);
  const [chunk, setChunk] = useState([]);
  const getObjects = () => {
    axios.get("https://rps101.pythonanywhere.com/api/v1/objects/all").then(response => {
      setObj(response.data)
      setChunk(arrayChunk(obj, 5));
 
    }).catch(error => {
      console.log(error);
    });
  }
  const handleMessage = (data)=>{
    setReceived(data);
  }
  const handleClick = data =>{
    socket.emit('send', data);
    handleMessage(data);
  }
  const isPlay = () => {
    socket.emit('play', true);
  }
  useEffect(() => {
    socket.on('received', (data) => {
      handleMessage(data);
    })
  }, [socket]);
  useEffect(() => {
    getObjects();
  }, [getObjects])
  return (
    <Container>
      {chunk.map((row, rowIndex) => {
        return (
          <div className='row' key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <div className='col-sm' key={colIndex}>
                  <button className="btn btn-primary my-2" onClick={()=>{handleClick(col)}}>{col}</button>
                </div>
              )
            })}
          </div>
          )
      })}
      
      <h1>Move: </h1>
      <p>{received}</p>
      <button onClick={isPlay}>Play</button>
    </Container>
  );
}

export default App;
