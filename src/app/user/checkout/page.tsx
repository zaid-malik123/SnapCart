"use client";

import { RootState } from "@/redux/store";
import L, { LatLngExpression } from "leaflet";
import { MapPin } from "lucide-react";
import { User } from "lucide-react";
import { Phone } from "lucide-react";
import { Building } from "lucide-react";
import { Search } from "lucide-react";
import { Navigation } from "lucide-react";
import { Home } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { LocateFixed } from "lucide-react";
import { Loader2 } from "lucide-react";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const CheckOut = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  });

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("lat is :- ", latitude, "long is :- ", longitude);
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.log("Location Error:", err.message);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (user) {
      setAddress((prev) => ({ ...prev, fullName: user.name || "" }));
      setAddress((prev) => ({ ...prev, mobile: user.mobile || "" }));
    }
  }, [user]);

  const DraggableMarker: React.FC = () => {
    const map = useMap()

    useEffect(() => {
      map.setView(position as LatLngExpression, 15, {animate: true})
    }, [position, map])
    return (
      <Marker
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker;
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
          },
        }}
        draggable={true}
        icon={markerIcon}
        position={position as LatLngExpression}
      />
    );
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if(!position) return
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=jsonv2`)
        console.log(res.data)

        setAddress(prev => ({...prev, city: res.data.address.city, state: res.data.address.state, pincode: res.data.address.postcode, fullAddress: res.data.display_name}))
      } catch (error) {
        
      }
    }
    fetchAddress()
  } ,[position])

  const handleSearchQuery = async () => {
    setSearchLoading(true)
    const provider = new OpenStreetMapProvider()

    const results = await provider.search({query: searchQuery})

    if(results) {
      setPosition([results[0].y, results[0].x])
      setSearchLoading(false)
    }
  }

  const handleGetCurrentLocation =  () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("lat is :- ", latitude, "long is :- ", longitude);
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.log("Location Error:", err.message);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
  }
  return (
    <div className="w-[92%] md:w-[80%] mx-auto py-10 relative">
      <motion.button
        onClick={() => router.push("/user/cart")}
        whileTap={{ scale: 0.97 }}
        className="absolute left-0 top-2 flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold"
      >
        <ArrowLeft size={16} />
        <span className="hidden md:block">Back to Cart</span>
      </motion.button>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-10"
      >
        CheckOut
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-green-700" /> Delivery Address
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-3 text-green-600"
              />
              <input
                className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0"
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-3 text-green-600"
              />
              <input
                className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0"
                type="text"
                placeholder="Mobile"
                value={address.mobile}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, mobile: e.target.value }))
                }
              />
            </div>
            <div className="relative">
              <Home
                size={18}
                className="absolute left-3 top-3 text-green-600"
              />
              <input
                className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0"
                type="text"
                placeholder="Full Address"
                value={address.fullAddress}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullAddress: e.target.value,
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <Building
                  size={18}
                  className="absolute left-3 top-3 text-green-600"
                />
                <input
                  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0"
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </div>
              <div className="relative">
                <Navigation
                  size={18}
                  className="absolute left-3 top-3 text-green-600"
                />
                <input
                  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0"
                  type="text"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, state: e.target.value }))
                  }
                />
              </div>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-green-600"
                />
                <input
                  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50 outline-0"
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      pincode: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                className="flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Search City or area..."
                type="text"
              />
              <button onClick={handleSearchQuery} className="bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 transition-all font-medium">
                {searchLoading ? <Loader2 className="animate-spin" size={16}/> : "Search"}
              </button>
            </div>

            <div className="relative mt-6 h-[330px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              {position ? (
                <MapContainer
                  className="h-full w-full"
                  center={position as LatLngExpression}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker />
                </MapContainer>
              ) : null}

              <motion.button
              onClick={handleGetCurrentLocation}
              whileTap={{scale: 0.97}}
              className="absolute bottom-4 right-4 bg-green-600 text-white shadow-lg rounded-full p-3 hover:bg-green-700 transition-all flex items-center justify-center z-999"
              >
                <LocateFixed size={22}/>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckOut;
