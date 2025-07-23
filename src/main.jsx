import React from 'react';
import ReactDOM from 'react-dom/client';
import PleasantonDowntownCatalog from './App';
import './index.css'; // optional
import 'leaflet/dist/leaflet.css'; // critical for map tiles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PleasantonDowntownCatalog />
  </React.StrictMode>
);
