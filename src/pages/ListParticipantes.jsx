import React, { useEffect, useState } from "react";
import API_URL from "../config/api";
import { Link } from "react-router-dom";

const ListParticipantes = () => {
  const [participantes, setParticipantes] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/listado`);
        const data = await respuesta.json();

        if (data.$values && Array.isArray(data.$values)) {
          setParticipantes(data.$values);
        } else if (Array.isArray(data)) {
          setParticipantes(data);
        } else {
          setParticipantes([]);
          setMensaje({ texto: "Formato de datos no esperado.", tipo: "warning" });
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
        setParticipantes([]);
        setMensaje({
          texto: "No se pudo conectar con el servidor. Intenta más tarde.",
          tipo: "danger",
        });
      }
    };
    cargarDatos();
  }, []);

  const participantesFiltrados = participantes.filter((p) => {
    const nombreCompleto = `${p.nombre} ${p.apellidos}`.toLowerCase();
    return nombreCompleto.includes(buscar.toLowerCase());
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
        padding: "40px 20px",
      }}
    >
      <div
        className="container p-4 rounded-4 shadow-lg"
        style={{ background: "white", maxWidth: "800px" }}
      >
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary d-flex align-items-center">
            <img
              src="/registro1.png"
              alt="Congreso TIC"
              width="50"
              height="50"
              className="rounded-circle border border-2 border-primary me-2"
            />
            Asistentes Registrados
          </h3>
          <Link to="/registro" className="btn btn-success fw-semibold shadow-sm">
            + Nuevo Registro
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="🔍 Buscar participante..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            style={{ borderRadius: "10px" }}
          />
        </div>

        {/* Mensajes o Alertas */}
        {mensaje.texto && (
          <div
            className={`alert alert-${mensaje.tipo} text-center p-2 fw-semibold`}
            role="alert"
          >
            {mensaje.texto}
          </div>
        )}

        {/* Lista de participantes */}
        {participantesFiltrados.length === 0 ? (
          <div className="alert alert-info text-center fw-semibold">
            No hay participantes registrados aún.
          </div>
        ) : (
          <div className="list-group">
            {participantesFiltrados.map((p, index) => (
              <div
                key={p.idParticipante || index}
                className="card mb-3 shadow-sm border-0"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body d-flex align-items-center">
                  <Link
                    to={`/gafete/${p.id}`}
                    className="me-3 text-decoration-none text-dark"
                  >
                    <img
                      src={`/${p.avatar ? `${p.avatar}.png` : "otro.png"}`}
                      alt="Avatar participante"
                      className="rounded-circle border border-2 border-primary"
                      width="70"
                      height="70"
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      {p.nombre} {p.apellidos}
                    </h5>
                    <p className="mb-0 text-primary small">
                      {p.email || "Sin Email"}
                    </p>
                    <p className="mb-0 text-primary small">
                      @{p.twitter || "Sin Twitter"}
                    </p>
                    <p className="text-muted mb-0 small">
                      {p.ocupacion || "Sin ocupación"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón para volver */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="btn btn-outline-primary px-4 py-2 fw-semibold"
          >
            Volver a la pagina principal 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListParticipantes;
