import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

const API_URL = "https://ecowheel-backend-5p47.onrender.com/tours/api/tours/";
const token = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: "https://ecowheel-backend-5p47.onrender.com",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

const categories = [
  "Wildlife Safari",
  "Mountain Trek",
  "Beach & Culture",
  "Bird Watching",
  "Photography",
];

const initialFormState = {
  title: "",
  location: "",
  price: "",
  description: "",
  image: null,
  category: "",
};

const ToursTab = () => {
  const [tours, setTours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axiosInstance.get("/tours/api/tours/");
        setTours(response.data);
        console.log("Fetched tours:", response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);

  const openModal = (tour = null) => {
    if (tour) {
      setFormData({
        title: tour.title,
        description: tour.description,
        location: tour.location,
        price: tour.price,
        image: tour.image || null,
        category: tour.category || "",
      });
      setEditingTour(tour);
    } else {
      setFormData(initialFormState);
      setEditingTour(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setEditingTour(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (key === "image" && typeof value === "string") return;
        formPayload.append(key, value);
      }
    });

    try {
      let response;
      if (editingTour) {
        response = await axiosInstance.patch(
          `/tours/api/tours/${editingTour.id}/`,
          formPayload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setTours((prev) =>
          prev.map((tour) => (tour.id === editingTour.id ? response.data : tour))
        );
      } else {
        response = await axiosInstance.post("/tours/api/tours/", formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setTours((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting tour:", error.response?.data || error);
      alert("Failed to submit tour. Check console for details.");
    }
  };

  const deleteTour = async (id) => {
    try {
      await axiosInstance.delete(`/tours/api/tours/${id}/`);
      setTours((prev) => prev.filter((tour) => tour.id !== id));
    } catch (error) {
      console.error("Failed to delete tour", error);
    }
  };

  return (
    <>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-5">Tours</h2>
        <button
          onClick={() => openModal()}
          className="mb-5 flex items-center gap-2 rounded-lg py-3 px-6 bg-gradient-to-r from-green-700 to-yellow-500 text-white font-semibold cursor-pointer"
        >
          <Plus size={20} /> Add Tour
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.length > 0 ? (
            tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-3xl shadow-lg group hover:shadow-xl flex flex-col"
              >
                <div className="relative overflow-hidden rounded-t-3xl h-48">
                  {tour.image ? (
                    <img
                      src={
                        tour.image.startsWith("http")
                          ? tour.image
                          : `http://127.0.0.1:8000${tour.image}`
                      }
                      alt={tour.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{tour.title}</h3>
                  <p className="text-gray-700 mb-1">{tour.location}</p>
                  <p className="text-green-600 font-semibold mb-1">
                    Price: ${tour.price}
                  </p>
                  <p className="text-sm text-gray-500">Category: {tour.category}</p>

                  <p className="text-gray-600 flex-1">{tour.description}</p>

                  <button
                    onClick={() => deleteTour(tour.id)}
                    className="mt-4 self-start text-red-600 hover:text-red-700 flex items-center gap-2 font-semibold"
                  >
                    <Trash2 size={16} /> Delete
                  </button>

                  <button
                    onClick={() => openModal(tour)}
                    className="mt-2 self-start text-blue-600 hover:text-blue-700 flex items-center gap-2 font-semibold"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No tours available. Click "Add Tour" to create one!
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-lg max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-bold mb-6">
              {editingTour ? "Edit Tour" : "Add a New Tour"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["title", "location", "price", "description"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block mb-1 font-semibold capitalize">
                    {field}
                  </label>
                  {field !== "description" ? (
                    <input
                      type={field === "price" ? "number" : "text"}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg p-2 focus:outline-green-500"
                    />
                  ) : (
                    <textarea
                      id={field}
                      name={field}
                      rows={3}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 focus:outline-green-500"
                    />
                  )}
                </div>
              ))}

              {/* Category Dropdown */}
              <div>
                <label htmlFor="category" className="block mb-1 font-semibold">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:outline-green-500"
                >
                  <option value="">-- Select a category --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-1 font-semibold" htmlFor="image">
                  Upload Image
                </label>
                <div
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) setFormData((prev) => ({ ...prev, image: file }));
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="w-full relative border-2 border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-center text-gray-500 hover:border-green-600 transition"
                >
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {formData.image ? (
                    typeof formData.image === "string" ? (
                      <img
                        src={formData.image}
                        alt="Current"
                        className="max-h-40 rounded-lg object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="max-h-40 rounded-lg object-cover"
                        onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                      />
                    )
                  ) : (
                    <span>Drag & drop or click to select an image</span>
                  )}
                </div>
              </div>

              {/* Submit/Cancel Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-6 py-2 border border-gray-300 hover:border-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg px-6 py-2 bg-green-600 text-white font-semibold hover:bg-green-700"
                >
                  {editingTour ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ToursTab;
