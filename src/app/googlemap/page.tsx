"use client"
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewLatLng} from "@/app/redux/feat/get_current_location";
import {RootState} from "@/app/redux/store";
import Main_Layout from "@/app/component/main_layout";
import {Loader} from "@googlemaps/js-api-loader";
import Image from "next/image";

export default function GoogleMap() {
    const [autocomplete, setAutocomplete] = useState<any>(null); // State สำหรับเก็บ Autocomplete
    const currentLocation = useSelector((state: RootState) => state.currentLocation.location);
    const dispatch = useDispatch();
    const loader = new Loader({
        apiKey: "AIzaSyD7bcnJOu3oZfh0wVMaGg5rBr3e9EYyt-Q", // เปลี่ยน YOUR_API_KEY เป็น API Key ของคุณ
        version: "weekly",
        libraries: ["maps", "places"],
    });

    const initMap = async () => {

        await loader.load();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(addNewLatLng({lat: position.coords.latitude, lng: position.coords.longitude}));
            });
        }

        // Map
        // @ts-ignore
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: currentLocation,
            zoom: 15,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
        });

        /**
         * Event map
         */
        map.addListener("dragend", () => {
            const center = map.getCenter();
            const lat = center.lat();
            const lng = center.lng();
            // Keep value
            console.log("Dragend : " + lat + ", " + lng);
        })

        // Autocomplete
        // @ts-ignore
        const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete") as HTMLElement);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
                //Not thing
            } else {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const location = place.geometry.location;
                map.setCenter(location);
                // Keep value
                console.log("place_changed : " + lat + ", " + lng);
            }
        });

    };

    useEffect(() => {
        initMap();
    }, [currentLocation]);

    function handleCurrentBtn() {
        initMap();
    }

    return (
        <Main_Layout>
            <div>
                <div className="flex justify-between items-center mb-2">
                    {/* แก้ไข input เพื่อให้รองรับ Place Autocomplete */}
                    <input
                        id="autocomplete"
                        className="text-gray-800 p-2 w-[80%] md:w-[75%] border-2 border-zinc-700 focus:outline-0"
                        type="text"
                        placeholder="ค้นหาสถานที่"
                    />
                    <div
                        className="w-[15%] md:w-[20%] p-2 border-2 border-zinc-700 bg-zinc-700 text-center hover:bg-zinc-600 cursor-pointer transition duration-300"
                        onClick={handleCurrentBtn}
                    >
                        <span className="hidden md:inline-block">ตำแหน่งปัจจุบัน</span>
                        <span className="flex md:hidden items-center justify-center">
              <Image
                  width="25"
                  height="25"
                  src="https://img.icons8.com/fluency/48/location--v1.png"
                  alt="location--v1"
              />
            </span>
                    </div>
                </div>
                <div
                    className="relative flex justify-center items-center h-[300px] md:h-[600px] border-2 border-zinc-700">
                    <Image
                        className="absolute z-10"
                        width="35"
                        height="35"
                        src="https://img.icons8.com/arcade/64/marker.png"
                        alt="marker--v1"
                    />
                    <div className="absolute top-[0] w-[100%] h-[300px] md:h-[600px]" id="map"></div>
                </div>
            </div>
        </Main_Layout>
    );
}
