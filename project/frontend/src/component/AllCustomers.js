import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AllCustomer.css';
import crop1 from "./images/crop.jpeg";
import fertilizer from "./images/fertilizer.jpeg";
import machine from "./images/machine.jpg";
import pesticides from "./images/pesticides.jpg";
import selling from "./images/selling.jpg";
import ticket from "./images/ticket.jpg";

export default function AllCustomers() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1>JOIN WITH US TO GET PROSPEROUS PADDY<br />FARMING EXPERIENCE</h1>

      {/* Create a photo grid */}
      <div className="photo-grid">
        <div className="photo">
          <img src={crop1} alt="Image_1" className="crop" />
          <button className="image-button">CROP 1</button>
        </div>
        <div className="photo">
          <img src={machine} alt="Image_2" className="crop" />
          <button className="image-button">CROP 2</button>
        </div>
        <div className="photo">
          <img src={fertilizer} alt="Image_3" className="crop" />
          <button className="image-button">CROP 3</button>
        </div>
        <div className="photo">
          <img src={pesticides} alt="Image_4" className="crop" />
          <button className="image-button">CROP 4</button>
        </div>
        <div className="photo">
          <img src={selling} alt="Image_5" className="crop" />
          <button className="image-button">CROP 5</button>
        </div>
        <div className="photo">
          <img src={ticket} alt="Image_6" className="crop" />
          <button className="image-button">CROP 6</button>
        </div>
      </div>
    </div>
  );
}