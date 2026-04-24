import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createRestaurant } from "../api/restaurant.api";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormState {
  name: string;
  address: string;
  contact: string;
}

const RestaurantModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    address: "",
    contact: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.contact) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("address", form.address);
    formData.append("contact", form.contact);
    if (file) formData.append("image", file);

    const toastId = toast.loading("Adding restaurant...");

    try {
      setLoading(true);

      await createRestaurant(formData);

      toast.success("Restaurant added successfully ✅", { id: toastId });

      onSuccess();
      onClose();

      setForm({ name: "", address: "", contact: "" });
      setFile(null);
      setPreview(null);
    } catch {
      toast.error("Failed to create restaurant", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Add Restaurant</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="contact" placeholder="Contact" onChange={handleChange} />

          <input type="file" onChange={handleFileChange} />

          {preview && <img src={preview} width="100" />}

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
};

export default RestaurantModal;
