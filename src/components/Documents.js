import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardGroup from 'react-bootstrap/CardGroup';
import Navbar from './Navbar'
import './Documents.css'
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Documents = () => {

      var documents={

        'resume' : '',
        'marksheets' : '',
        'username': localStorage.getItem('username')

      }
      
      const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);

      const [docurl,setDocUrl]=useState(documents);


      const saveDocuemnts=()=>{

          console.log(docurl);

          axios({
            method:'POST',
            url:`http://localhost:8017/saveDocuments`,
            headers:{
              'Authorization':'Bearer '  + localStorage.getItem('USER_KEY'),
              'Content-Type': 'application/json'
          },
           data:docurl
          }).then((res)=>{
            console.log(res);
            toast.success("documents are  saved successfully");
          }).catch(res=>{
            console.log(res);
            toast.error("try again");
          })



      }

   const[employee,setEmployee]=useState();









  const postDetails=(e)=>{
    //console.log(pics.type);  
    
    document.getElementById('docsave').disabled=true;
   


        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "project-pdf");
        data.append("cloud_name", "charan464");
        console.log(data);
        fetch("https://api.cloudinary.com/v1_1/charan464/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            docurl[e.target.name]=data.url;
            console.log(docurl);

            document.getElementById('docsave').disabled=false;
                
          })
          .catch((err) => {
            console.log(err);
            document.getElementById('docsave').disabled=false;
                
          
          });

          

   
}    

const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer');
};



    var urlresume;
    var urlmarksheets;
    const viewDocuments=async()=>{
      console.log(employee)
    await axios.get(`http://localhost:8017/userdetails/${employee}`).then(res=>{
             
             urlresume=res.data.resume;
             urlmarksheets=res.data.marksheets;

             document.getElementById("urll").style.display='block';

             document.getElementById("resumeurl").value=urlresume;

             document.getElementById("markurl").value=urlmarksheets;

            console.log( document.getElementById("markurl").value);

         }).catch(res=>{
          console.log(res.data.resume);
         })
   }
   const mystyle = {
    color: "white",
    padding: "10px",
    fontFamily: "Arial",
    display: "flex",
    justifyContent: "center"
  };

  return (
    
    authid==3?
    <div>
      <Navbar/>
      <p style={{textAlign:"center",color:"Black",fontSize:"23px"}}>Enter the candidate's name whose files need to be fetched</p>
    <div >
       <div style={mystyle}>
       <input type="email" size="30" className="btn btn-outline-secondary" onChange={(e)=>{setEmployee (e.target.value);

        document.getElementById("urll").style.display='none';
        
      }}></input>
       <button type="submit" onClick={viewDocuments} className="btn btn-primary" style={{marginLeft:10}}>submit</button>
       </div>
       
       
    </div>

     <center><div id="urll" style={{  display:'none'  }} >
        <Button onClick={ e=> openInNewTab(e.target.value)  }  value="" id="resumeurl" className="btn btn-success" style={{marginRight:"10px" ,marginTop:"30px"}}>Resume</Button> 
        <Button onClick={ e=> openInNewTab(e.target.value)  }  value="" id="markurl" className="btn btn-success" style={{marginLeft:"10px" ,marginTop:"30px"}}> marksheets</Button>

      </div></center>

    </div>
    :(
    <div>
    <Navbar/>
    <div style={{display:"flex",height:440,alignItems:"center",justifyContent:"center"}}>
     
    
    <Card
      bg="secondary"
      text="white"
      style={{ width: '18rem',padding:10,margin:10 ,height:'15rem'}}
      className="mb-2">
      <Card.Header>Resume</Card.Header>
      <Card.Body>
        <Card.Title> Upload Resume </Card.Title>
        <Card.Text>
          Kindly Upload Resume as soon as possible , for further onboarding process
        </Card.Text>

        <label class="uploadLabel" style={{backgroundColor:'rgba(241, 187, 10, 0.97)',color:'black'}} >
      <i class="fas fa-file-upload"></i> 

    <input  name='resume' type="file" class="uploadButton"    onChange={(e) => postDetails(e)}/>
    Upload
    </label>


      </Card.Body>
    </Card>
    <Card
      bg="success"
      text="white"
      style={{ width: '18rem',padding:10,margin:10 ,height:'15rem'}}
      className="mb-2">
      <Card.Header>Documents</Card.Header>
      <Card.Body>
        <Card.Title> Upload Documents </Card.Title>
        <Card.Text>
          Kindly upload all the necessary certificates on or before 25 june for background verification.
        </Card.Text>
        <label class="uploadLabel" style={{backgroundColor:'rgba(241, 187, 10, 0.97)',color:'black'}} >
      <i class="fas fa-file-upload"></i> 

    <input    name='marksheets'   type="file" class="uploadButton"      onChange={(e) => postDetails(e)}  />
    Upload
    </label>
   
      </Card.Body>
    </Card>
  </div>
    <center>
    <Button class="btn btn-primary" id='docsave' onClick={saveDocuemnts} > Save Documents </Button>
    </center>

      

    <ToastContainer/>
  </div>
  )
  )
}

export default Documents