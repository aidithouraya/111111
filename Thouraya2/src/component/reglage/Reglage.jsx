import React, { useState } from 'react';
import "./reglage.scss";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import GoogleMapReact from 'google-map-react';

const zoneDetails = {
  "Hopital Rabta": {
    governorate: "Tunis",
    city: "Tunis",
    numDevices: {
      cabinet: 10,
      transformer: 5,
      generator: 3
    }
  },
  "Hopital Mhamdiya": {
    governorate: "Tunis",
    city: "La Marsa",
    numDevices: {
      cabinet: 8,
      transformer: 3,
      generator: 2
    }
  },
  "Hopital Hbib Thamer": {
    governorate: "Ben Arous",
    city: "Ariana",
    numDevices: {
      cabinet: 12,
      transformer: 6,
      generator: 4
    }
  }
};

const Reglage = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [numDevices, setNumDevices] = useState(0);

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    setSelectedDeviceType("");
    setNumDevices(0);
  };

  const handleCreateDevice = () => {
    // Logique pour créer l'appareil dans la zone sélectionnée
    // Vous pouvez implémenter cette logique selon vos besoins
    console.log("Device created in the zone:", selectedZone);
  };

  return (
    <div className='reglage'>
      <Sidebar />
      <div className="reglageContainer">
        <Navbar />
      </div>
      {selectedZone && (
        <div className="zoneDetails" style={{ width: '20%', float: 'right', backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }}>
          <h2>Zone Details</h2>
          <p>City: {selectedZone.city}</p>
          <p>Location: {selectedZone.governorate}</p>
          <h3>Total Devices:</h3>
          <ul>
            <li>Armoire: {selectedZone.numDevices.cabinet}</li>
            <li>Transformateur: {selectedZone.numDevices.transformer}</li>
            <li>Groupe électr: {selectedZone.numDevices.generator}</li>
          </ul>
          <form>
            <label htmlFor="selectDeviceType">Select Device Type:</label>
            <select id="selectDeviceType" onChange={(e) => setSelectedDeviceType(e.target.value)}>
              <option value="">Select</option>
              <option value="Armoire">Armoire</option>
              <option value="transformateur">transformateur</option>
              <option value="groupe électrogéne">groupe électrogéne</option>
            </select>
            <button type="button" onClick={handleCreateDevice}>Create Device</button>
          </form>
        </div>
      )}
      <div style={{ height: '90vh', width: '800%', position: 'center', float: 'left' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{ lat: 36.8065, lng: 1.1815 }}
          defaultZoom={10}
        >
          {Object.keys(zoneDetails).map((zoneName, index) => (
            <div
              key={index}
              lat={36.8065 + (0.03 * index)}
              lng={10.1815 + (0.03 * index)}
              onClick={() => handleZoneClick(zoneDetails[zoneName])}
              className={selectedZone === zoneDetails[zoneName] ? 'selectedZone' : ''}
            >
              {zoneName === "Hopital Rabta" && (
                <div style={{ color: 'red', fontSize: 90, fontWeight: 'bold' }}>•</div>
              )}
            </div>
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Reglage;
