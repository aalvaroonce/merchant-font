import './styles/estilos.css';
import LogIn from './components/users/LogIn';
import SignIn from './components/users/SignIn';
// import UpdateUser from './components/users/UpdateUser'
import { useState } from 'react';

function App() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  return (
    <div className="app-container">
      {isLoggingIn ? (
        <LogIn />
      ) : (
        <SignIn />
      )}
      <button className="switch-button" onClick={() => setIsLoggingIn(!isLoggingIn)}>
        {isLoggingIn ? "No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
    // <UpdateUser></UpdateUser>
  );
}

export default App;
