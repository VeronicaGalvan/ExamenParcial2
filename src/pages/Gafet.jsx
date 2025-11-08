import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_URL from "../config/api";

const Gafet = () => {
  const { id } = useParams();
  const [participante, setParticipante] = useState(null);

  useEffect(() => {
    const obtenerParticipante = async () => {
      try {
        const resp = await fetch(`${API_URL}/gafete/${id}`);
        const data = await resp.json();
        setParticipante(data);
      } catch (error) {
        console.error("Error al obtener participante:", error);
      }
    };
    obtenerParticipante();
  }, [id]);

  if (!participante) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="fw-semibold">Cargando gafete...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          <img
            src="/registro1.png"
            alt="Congreso TIC"
            className="logo-tic me-2"
            width="50"
            height="auto"
          />
          Gafete del Participante
        </h3>
        <Link to="/participantes" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i> Volver al listado
        </Link>
      </div>

      {/* Contenedor de gafetes */}
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {/* CARD FRONTAL */}
        <div className="card text-center p-3 shadow-sm border-0" style={{ width: "300px" }}>
          <img
            src="/registro1.png"
            alt="Logo Congreso"
            className="mx-auto my-2"
            style={{ width: "110px" }}
          />

          <img
            src={`/${participante.avatar ? `${participante.avatar}.png` : "otro.png"}`}
            alt="Avatar"
            className="rounded-circle border border-3 border-primary mx-auto my-3"
            width="160"
            height="160"
          />

          <h5 className="fw-bold text-dark mb-0">
            {participante.nombre} {participante.apellidos}
          </h5>
          <p className="text-muted mb-1">{participante.ocupacion}</p>
        </div>

        {/* CARD REVERSO */}
        <div className="card text-center p-3 shadow-sm border-0" style={{ width: "300px" }}>
          <img
            src="/registro1.png"
            alt="Logo Congreso"
            className="mx-auto my-2"
            style={{ width: "110px" }}
          />

          <img
            src="/qr.png"
            alt="Código QR"
            className="mx-auto my-3"
            width="160"
          />

          <div className="mt-3">
            <p className="mb-1 text-primary fw-semibold">
              {participante.email || "Sin Email"}
            </p>
            <p className="mb-1 text-primary fw-semibold">
              @{participante.twitter || "Sin Twitter"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gafet;
