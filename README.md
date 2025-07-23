import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const shopData = [
  {
    id: 1,
    name: "Prim Boutique",
    description: "Trendy women's clothing",
    category: "Clothing",
    openHours: [9, 18],
    lat: 37.6624,
    lng: -121.8747
  },
  {
    id: 2,
    name: "Inklings Coffee",
    description: "Cozy coffee shop and event space",
    category: "Restaurant",
    openHours: [7, 20],
    lat: 37.6628,
    lng: -121.8752
  },
  {
    id: 3,
    name: "Towne Center Books",
    description: "Independent bookstore with events",
    category: "Bookstore",
    openHours: [10, 17],
    lat: 37.6626,
    lng: -121.8755
  }
];

const getCurrentHour = () => new Date().getHours();

export default function PleasantonDowntownCatalog() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [showOpenNow, setShowOpenNow] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = shopData.filter((shop) => {
    const isOpen = !showOpenNow || (getCurrentHour() >= shop.openHours[0] && getCurrentHour() <= shop.openHours[1]);
    const matchesCategory = categoryFilter === "All" || shop.category === categoryFilter;
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase());
    return isOpen && matchesCategory && matchesSearch;
  });

  const categories = ["All", ...new Set(shopData.map((shop) => shop.category))];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Pleasanton Downtown Catalog
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          onClick={() => setShowOpenNow(!showOpenNow)}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          {showOpenNow ? "Show All" : "Open Now"}
        </button>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded shadow"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded shadow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="border p-3 rounded shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedShop(shop)}
            >
              <h2 className="text-xl font-semibold">{shop.name}</h2>
              <p className="text-sm text-gray-600">{shop.description}</p>
              <p className="text-sm text-gray-500 italic">{shop.category}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          <MapContainer
            center={[37.6624, -121.8747]}
            zoom={17}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredShops.map((shop) => (
              <Marker
                key={shop.id}
                position={[shop.lat, shop.lng]}
                eventHandlers={{
                  click: () => setSelectedShop(shop)
                }}
              >
                <Popup>
                  <strong>{shop.name}</strong>
                  <br />
                  {shop.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {selectedShop && (
            <div className="mt-4 p-4 border rounded shadow bg-white">
              <h2 className="text-2xl font-bold mb-2">{selectedShop.name}</h2>
              <p>{selectedShop.description}</p>
              <p className="text-sm text-gray-500 italic">Category: {selectedShop.category}</p>
              <p className="text-sm text-gray-500">Hours: {selectedShop.openHours[0]}:00–{selectedShop.openHours[1]}:00</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
