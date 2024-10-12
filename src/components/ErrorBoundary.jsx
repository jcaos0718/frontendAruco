import React from 'react';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de reporte de errores aquí
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload(); // Recarga la página
  };

  handleRedirect = () => {
    this.props.history.push('/'); // Redirige a la página principal
  };

  render() {
    if (this.state.hasError) {
      // Renderiza cualquier UI alternativa para mostrar cuando ocurre un error
      return (
        <div>
          <h1>Algo salió mal.</h1>
          <button onClick={this.handleReload}>Recargar la página</button>
          <button onClick={this.handleRedirect}>Ir a la página principal</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
