import axios from "axios";
import "../App.css";
import React, { Component } from 'react'


export default class Homepage extends Component {
  imageList=[];
  constructor(){
    super();
    // console.log("Hello world");
    this.state={
      imageList:this.imageList,
      loading:false
    }
  }
  
  async componentDidMount(){

    let parsedData=await axios.get("http://localhost:8080/home/get").then((response)=>{
      return response.data;
    })
    
    // console.log(parsedData);
    this.setState({
      imageList:parsedData
    })

  }
  render() {
    return (
      
      <div className="container ">
        
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 3" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={4} aria-label="Slide 3" />
        </div>
        <div className="carousel-inner">
          {
            this.state.imageList.map((element)=>{
              return (element.id===1?<div className="carousel-item active" key={element.id}>
                        <img src={element.url} style={{height:"30rem",width:"30rem"}} className="d-block w-100" alt="..." />
                    </div>:<div className="carousel-item " key={element.id}>
                        <img src={element.url} style={{height:"30rem",width:"30rem"}} className="d-block w-100" alt="..." />
                    </div>);
            
            })
          }
          {/* <div className="carousel-item active">
            <img src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000" style={{height:"30rem",width:"30rem"}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000" style={{height:"30rem",width:"30rem"}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000" style={{height:"30rem",width:"30rem"}} className="d-block w-100" alt="..." />
          </div> */}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      
      </div>
    </div>
    )
  }
}


