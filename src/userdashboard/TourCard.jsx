import React from "react";
import { MapPin } from "lucide-react";

export default function TourCard({ tour, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border bg-white shadow-sm transition hover:shadow-lg overflow-hidden"
    >
      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{tour.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{tour.location}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {tour.description}
        </p>
        <div className="mt-2 text-green-600 font-semibold">
          ${tour.price}
        </div>
      </div>
    </div>
  );
}
