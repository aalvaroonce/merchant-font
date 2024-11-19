import { useState } from "react";
import UpdateUser from "./users/UpdateUser";
import DeleteUser from "./users/DeleteUser";
import WebList from "./webs/WebList";
import LogIn from "./users/LogIn";
import SignIn from "./users/SignIn";

export default function Formulario() {
    const [step, setStep] = useState(0);
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    const handleSteps = () => {
        setStep(step +1);
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="app-container">
                        {isLoggingIn ? (
                            <LogIn />
                        ) : (
                            <SignIn />
                        )}
                        <button 
                            className="switch-button" 
                            onClick={() => setIsLoggingIn(!isLoggingIn)}
                        >
                            {isLoggingIn ? "No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                        </button>
                        <button className="switch-button" onClick={handleSteps}>Siguiente</button>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <UpdateUser />
                        <button className="switch-button" onClick={handleSteps}>Siguiente</button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <DeleteUser />
                        <button className="switch-button" onClick={handleSteps}>Siguiente</button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <WebList />
                        <button className="switch-button" onClick={handleSteps}>Siguiente</button>
                    </div>
                );
            case 4:
                return <p>Gracias por completar el ejercicio</p>;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderStep()}
        </div>
    );
}
