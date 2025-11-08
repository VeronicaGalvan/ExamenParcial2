import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="container text-center mt-5">
      {/* Logos */}
      <div className="d-flex justify-content-center align-items-center mb-4 flex-wrap gap-3">
        <img
          src="/utl.jpg"
          alt="Logo Universidad Tecnológica de León"
          className="rounded shadow-sm"
          width="150"
          height="auto"
        />
        <img
          src="/congresoTics.jpg"
          alt="Logo Congreso de TIC"
          className="rounded shadow-sm"
          width="120"
          height="auto"
        />
      </div>

      {/* Título principal */}
      <h1 className="fw-bold text-dark mb-3">
        Congreso de <span className="text-primary">Tecnologías de la Información</span>
      </h1>

      {/* Subtítulo descriptivo (nuevo texto) */}
      <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
        🌐 ¡Te damos la bienvenida al Congreso de TIC’s de la Universidad Tecnológica de León!  
        Conoce, aprende y comparte con profesionales de la innovación tecnológica.  
        Si aún no estás registrado, únete hoy mismo y forma parte de esta gran experiencia.
      </p>

      {/* Mensaje adicional */}
      <h5 className="text-success mt-3 fw-semibold">
        ¡Regístrate y no te pierdas este evento único!
      </h5>

      {/* Botón principal */}
      <Link to="/participantes" className="btn btn-success mt-4 px-4 py-2 fs-5 rounded-pill shadow-sm">
        <i className="bi bi-door-open-fill me-2"></i> Ingresar al Congreso
      </Link>

      {/* Fondo decorativo opcional */}
      <div className="mt-5 text-muted small">
        <p>Universidad Tecnológica de León © 2025</p>
      </div>
    </div>
  );
};

export default Inicio;
