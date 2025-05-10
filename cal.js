const express= require('express');
const app= express();
const axios=require('axios');
app.use(express.json());
const port=3000;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2ODczOTg1LCJpYXQiOjE3NDY4NzM2ODUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFkNjQ2MjlmLTA4YzAtNGQ5Yy1hNTljLWE3YjE4MDYwMGQ5ZCIsInN1YiI6IjIyYTQ2LmdpcmlzaEBzamVjLmFjLmluIn0sImVtYWlsIjoiMjJhNDYuZ2lyaXNoQHNqZWMuYWMuaW4iLCJuYW1lIjoiZ2lyaXNoIHUiLCJyb2xsTm8iOiI0c28yMmNzMDQ2IiwiYWNjZXNzQ29kZSI6IktqSkF4UCIsImNsaWVudElEIjoiMWQ2NDYyOWYtMDhjMC00ZDljLWE1OWMtYTdiMTgwNjAwZDlkIiwiY2xpZW50U2VjcmV0IjoiRm1oWXR4UUpSUkhXVEpBVyJ9.U0Z7R_LrHyq-CBLGF-S3a8YaLLMevZ1hJ91VJ_XZ9JI";
let winsize=10;
let win=[]

app.get('/numbers/e', async(req,res)=>{
    let prev = [...win];
    const link="http://20.244.56.144/evaluation-service/even"

    const response=await axios.get(link,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        timeout:500,
    });

  console.log(response.data)
  let newnums = response.data.numbers;

  for (let i = 0; i < newnums.length; i++) {
    if (win.length < winsize) {
        win.push(newnums[i]);
    } else {
        win.shift(); 
        win.push(newnums[i]);
    }
}
let avg = 0;
if (win.length === winsize) {
    let sum = 0;
    for (let i = 0; i < win.length; i++) {
        sum += win[i];
    }
    avg = sum / winsize;
}

 res.json({
            previousState: prev,
            currentState: win,
            average: avg
        });
  

});

app.listen(port,()=>{
  
console.log(`Server Runnning on port 3000 ${port}`);

});