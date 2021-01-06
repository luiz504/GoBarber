import express, { response } from 'express';

const app = express();

app.get(`/`,(request,response) => {
  return response.json({message:`hello word 3`})
})

app.listen(3333, ()=>{
  console.log('Server On port 3333')
})