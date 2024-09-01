import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getPrediction } from './api/modelService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceHistoryGraph = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Price History',
        data: [10, 20, 15, 25, 20, 30],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Price: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Price History</h2>
      <Line data={data} options={options} />
    </div>
  );
};

const ForecastPrice = () => {
  const data = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Forecast Price',
        data: [12, 18, 14, 22, 19, 28],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Forecast Price: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Forecast Price</h2>
      <Line data={data} options={options} />
    </div>
  );
};

const App = () => {
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [commodity, setCommodity] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState(''); // Clear state selection when country changes
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCommodityChange = (e) => {
    setCommodity(e.target.value);
  };

  const handlePredict = async () => {
    try {
      // Replace 'features' with actual features extracted from your state and commodity
      const features = [/* your feature data here */];
      const result = await getPrediction(features);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed', error);
    }
  };

  // Define states and cities in India
  const states = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Tirupati'],
    // Add other states here
  };

  // Example store information
  const stores = [
    {
      position: [20.5937, 78.9629],
      name: 'Store A',
      address: '123 Main St, City, State',
      contact: '+91 123 456 7890'
    },
    // Add other stores here
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Navbar</h1>
      </nav>
      <main className="flex-1 container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Country, State, and Commodity</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <select
                onChange={handleCountryChange}
                value={country}
                className="border p-3 rounded-md w-full md:w-auto"
                disabled
              >
                <option value="India">India</option>
              </select>
              <select
                onChange={handleStateChange}
                value={state}
                className="border p-3 rounded-md w-full md:w-auto"
              >
                <option value="">Select State</option>
                {Object.keys(states).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <select
                onChange={handleCommodityChange}
                value={commodity}
                className="border p-3 rounded-md w-full md:w-auto"
              >
                <option value="">Select Commodity</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Onion">Onion</option>
                <option value="Pulses">Pulses</option>
              </select>
              <button
                onClick={handlePredict}
                className="border p-3 rounded-md bg-blue-500 text-white"
              >
                Get Prediction
              </button>
            </div>
            <div className="mb-6">
              <PriceHistoryGraph />
              <ForecastPrice />
            </div>
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recommendation System</h2>
              {prediction && (
                <div>
                  <h3 className="text-lg font-semibold">Prediction Result:</h3>
                  <p>{prediction}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Store Locations</h2>
          <div className="mb-6">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-80 rounded-lg">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {stores.map((store, index) => (
                <Marker key={index} position={store.position}>
                  <Popup>
                    <strong>{store.name}</strong><br />
                    {store.address}<br />
                    Contact: {store.contact}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Store Information</h2>
            <ul className="list-disc pl-5">
              {stores.map((store, index) => (
                <li key={index} className="mb-2">
                  <strong>{store.name}</strong><br />
                  {store.address}<br />
                  Contact: {store.contact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-blue-500 p-4 text-white text-center">
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default App;
