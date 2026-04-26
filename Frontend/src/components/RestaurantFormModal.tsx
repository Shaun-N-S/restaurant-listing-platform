import { useState, useEffect, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import { createRestaurant, updateRestaurant } from "../api/restaurant.api";
import toast from "react-hot-toast";
import type { Restaurant } from "../types/restaurant.types";

const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .regex(/\S/, "Name cannot be blank"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),
  contact: z
    .string()
    .min(7, "Contact must be at least 7 characters")
    .max(20, "Contact number is too long")
    .regex(
      /^[+]?[\d\s\-().]{7,20}$/,
      "Enter a valid phone number (e.g. +1 555 000 0000)",
    ),
});

type FormSchema = z.infer<typeof restaurantSchema>;
type FieldErrors = Partial<Record<keyof FormSchema, string>>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "create" | "edit";
  initialData?: Restaurant | null;
}

// ─── Field config ─────────────────────────────────────────────────────────────

const FIELDS: {
  name: keyof FormSchema;
  label: string;
  placeholder: string;
  icon: string;
  type?: string;
}[] = [
  {
    name: "name",
    label: "Restaurant Name",
    placeholder: "e.g. The Golden Fork",
    icon: "🍴",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "42 Oak Street, City",
    icon: "📍",
  },
  {
    name: "contact",
    label: "Contact Number",
    placeholder: "+1 (555) 000-0000",
    icon: "📞",
    type: "tel",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const RestaurantModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode,
  initialData,
}: Props) => {
  const [form, setForm] = useState<FormSchema>(() => {
    if (mode === "edit" && initialData) {
      return {
        name: initialData.name,
        address: initialData.address,
        contact: initialData.contact,
      };
    }
    return {
      name: "",
      address: "",
      contact: "",
    };
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormSchema, boolean>>
  >({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(() =>
    mode === "edit" && initialData ? initialData.imageUrl || null : null,
  );
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // ── Validate a single field on blur ──
  const validateField = useCallback((name: keyof FormSchema, value: string) => {
    const result = restaurantSchema.shape[name].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  }, []);

  // ── Validate all fields ──
  const validateAll = (): boolean => {
    const result = restaurantSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FieldErrors = {};
    result.error.issues.forEach((e) => {
      const key = e.path[0] as keyof FormSchema;
      if (!fieldErrors[key]) fieldErrors[key] = e.message;
    });
    setErrors(fieldErrors);
    // Mark all as touched so errors show
    setTouched({ name: true, address: true, contact: true });
    return false;
  };

  // ── handleClose ──
  const handleClose = useCallback(() => {
    if (loading) return;
    setVisible(false);
    setTimeout(() => {
      onClose();
      setForm({ name: "", address: "", contact: "" });
      setErrors({});
      setTouched({});
      setFile(null);
      setPreview(null);
    }, 220);
  }, [onClose, loading]);

  // ── Entry animation ──
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(id);
  }, [isOpen]);

  // ── ESC key ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  // ── Handlers ──
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormSchema]) {
      validateField(name as keyof FormSchema, value);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormSchema, value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("address", form.address.trim());
    formData.append("contact", form.contact.trim());
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      if (mode === "create") {
        await createRestaurant(formData);
        toast.success("Restaurant added successfully");
      } else if (mode === "edit" && initialData) {
        await updateRestaurant(initialData.id, formData);
        toast.success("Restaurant updated successfully");
      }
      onSuccess();
      handleClose();
    } catch {
      toast.error(
        mode === "create"
          ? "Failed to add restaurant"
          : "Failed to update restaurant",
      );
    } finally {
      setLoading(false);
    }
  };

  const isEdit = mode === "edit";
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-220 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-220 ${
          visible ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.97]"
        }`}
        style={{
          background:
            "linear-gradient(160deg, rgba(15,20,35,0.99) 0%, rgba(10,14,26,0.99) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.1)",
          maxHeight: "95dvh",
          overflowY: "auto",
        }}
      >
        {/* Top accent */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.4), transparent)",
          }}
        />

        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 sm:px-6 pt-3 sm:pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: isEdit
                  ? "rgba(99,102,241,0.12)"
                  : "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              {isEdit ? (
                <svg
                  className="w-3.5 h-3.5"
                  style={{ color: "#818cf8" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5"
                  style={{ color: "#818cf8" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </div>
            <div>
              <h2
                className="font-semibold text-[15px] leading-none"
                style={{
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "-0.2px",
                }}
              >
                {isEdit ? "Edit Restaurant" : "Add Restaurant"}
              </h2>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(148,163,184,0.45)" }}
              >
                {isEdit
                  ? "Update the listing details"
                  : "Fill in the details below"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{
              color: "rgba(148,163,184,0.4)",
              background: "rgba(255,255,255,0.03)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.color = "rgba(148,163,184,0.4)";
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-5 sm:px-6 py-5 space-y-4"
          noValidate
        >
          {/* Image Upload */}
          <div>
            <label
              className="block text-[10px] font-semibold mb-2 uppercase tracking-[0.1em]"
              style={{ color: "rgba(148,163,184,0.5)" }}
            >
              Restaurant Photo{" "}
              <span style={{ color: "rgba(148,163,184,0.3)" }}>(optional)</span>
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("file-input")?.click()}
              className="relative w-full h-36 sm:h-40 rounded-2xl cursor-pointer overflow-hidden transition-all group"
              style={{
                border: "2px dashed rgba(99,102,241,0.15)",
                background: "rgba(99,102,241,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
                e.currentTarget.style.background = "rgba(99,102,241,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
                e.currentTarget.style.background = "rgba(99,102,241,0.03)";
              }}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,0.6)" }}
                  >
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Change photo
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(99,102,241,0.08)",
                      border: "1px solid rgba(99,102,241,0.15)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "rgba(129,140,248,0.6)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-xs font-medium"
                      style={{ color: "rgba(129,140,248,0.7)" }}
                    >
                      Drop image or click to upload
                    </p>
                    <p
                      className="text-[10px] mt-0.5"
                      style={{ color: "rgba(148,163,184,0.3)" }}
                    >
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Text fields */}
          {FIELDS.map((field) => {
            const err = touched[field.name] && errors[field.name];
            return (
              <div key={field.name}>
                <label className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: "rgba(148,163,184,0.5)" }}
                  >
                    {field.label}
                  </span>
                  {err && (
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: "#fca5a5" }}
                    >
                      {errors[field.name]}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none">
                    {field.icon}
                  </span>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name]}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl outline-none transition-all"
                    style={{
                      background: err
                        ? "rgba(239,68,68,0.05)"
                        : "rgba(255,255,255,0.03)",
                      border: err
                        ? "1px solid rgba(239,68,68,0.35)"
                        : "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={(e) => {
                      if (!err) {
                        e.currentTarget.style.borderColor =
                          "rgba(99,102,241,0.45)";
                        e.currentTarget.style.background =
                          "rgba(99,102,241,0.05)";
                      }
                    }}
                    onBlurCapture={(e) => {
                      if (!errors[field.name]) {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.07)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.03)";
                      }
                    }}
                  />
                  {/* Valid checkmark */}
                  {touched[field.name] &&
                    !errors[field.name] &&
                    form[field.name] && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-3.5 h-3.5"
                          style={{ color: "#34d399" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                </div>
              </div>
            );
          })}

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] disabled:opacity-40"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                color: "rgba(148,163,184,0.6)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.color = "rgba(148,163,184,0.6)";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                loading || (Object.keys(touched).length > 0 && hasErrors)
              }
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                boxShadow: loading ? "none" : "0 0 20px rgba(99,102,241,0.3)",
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {isEdit ? "Updating..." : "Adding..."}
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Restaurant"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantModal;
