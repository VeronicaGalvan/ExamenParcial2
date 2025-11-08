import React, { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    twitter: "",
    ocupacion: "",
    avatar: "avatar1",
    aceptarTerminos: false,
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aceptarTerminos) {
      setMensaje({ texto: "Debes aceptar los términos y condiciones.", tipo: "danger" });
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (respuesta.ok) {
        setMensaje({ texto: "Participante registrado correctamente ✅", tipo: "success" });
        setFormData({
          nombre: "",
          apellidos: "",
          email: "",
          twitter: "",
          ocupacion: "",
          avatar: "avatar1",
          aceptarTerminos: false,
        });
      } else {
        setMensaje({ texto: "Error al registrar participante ❌", tipo: "danger" });
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setMensaje({ texto: "No se pudo conectar con el servidor.", tipo: "warning" });
    }

    // Quita el mensaje después de 4 segundos
    setTimeout(() => setMensaje({ texto: "", tipo: "" }), 4000);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
        padding: "30px",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "15px",
          background: "white",
        }}
      >
        <h3 className="text-center mb-3 fw-bold text-primary">
          Registro de Participante
        </h3>

        {/* Mensaje dinámico */}
        {mensaje.texto && (
          <div
            className={`alert alert-${mensaje.tipo} text-center p-2 fw-semibold`}
            role="alert"
          >
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Apellidos */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Apellidos:</label>
            <input
              type="text"
              className="form-control"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Twitter */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Twitter:</label>
            <input
              type="text"
              className="form-control"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
            />
          </div>

          {/* Ocupación */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Ocupación:</label>
            <input
              type="text"
              className="form-control"
              name="ocupacion"
              value={formData.ocupacion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Avatares */}
          <div className="mb-3 text-center">
            <label className="form-label fw-semibold mb-2">
              Selecciona tu avatar:
            </label>
            <div className="d-flex justify-content-center gap-3">
              {[
                { id: "hombre", img: "/hombre.png", label: "Avatar 1" },
                { id: "mujer", img: "/mujer.png", label: "Avatar 2" },
                { id: "otro", img: "/otro.png", label: "Avatar 3" },
              ].map((avatar) => (
                <label key={avatar.id} className="text-center">
                  <input
                    type="radio"
                    name="avatar"
                    value={avatar.id}
                    checked={formData.avatar === avatar.id}
                    onChange={handleChange}
                    className="me-1"
                  />
                  <img
                    src={avatar.img}
                    alt={avatar.label}
                    className={`rounded-circle border ${
                      formData.avatar === avatar.id
                        ? "border-primary border-3"
                        : "border-secondary"
                    }`}
                    width="60"
                    height="60"
                    style={{ cursor: "pointer" }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Términos */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="aceptarTerminos"
              checked={formData.aceptarTerminos}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2">
              Acepto los términos y condiciones
            </label>
          </div>

          {/* Botón Guardar */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{ fontSize: "1.1rem" }}
          >
            Guardar
          </button>
           {/* Botón volver */}
       <div className="text-center mt-4">
                <Link
                  to="/participantes"
                  className="btn btn-outline-primary px-4 py-2 fw-semibold"
                >
                  Volver a la lista de participantes
                </Link>
              </div>
        </form>
      </div>

     
    </div>
  );
};

export default Registro;
