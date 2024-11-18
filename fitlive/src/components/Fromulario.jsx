import { useState } from "react";
import PersonalData from "./PersonalData";
import PersonalInfo from "./PersonalInfo";
import TrainingPref from "./TrainingPref";
import Payment from "./Payment";

export default function Formulario() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        personalData: {},
        personalInfo: {},
        trainingPref: {},
        payment: {},
    });

    const handleNext = (data) => {
        const updatedData = { ...formData };

        if (step === 0) updatedData.personalData = data;
        if (step === 1) updatedData.personalInfo = data;
        if (step === 2) updatedData.trainingPref = data;
        if (step === 3) updatedData.payment = data;

        setFormData(updatedData);

        if (step < 3) {
            setStep(step + 1);
        } else {
            // setStep(step + 1);
            console.log("Todos los datos:", updatedData);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <PersonalData sendData={handleNext} />;
            case 1:
                return <PersonalInfo sendData={handleNext} />;
            case 2:
                return <TrainingPref sendData={handleNext} />;
            case 3:
                return <Payment sendData={handleNext} />;
            case 4:
                return <p>Gracias por completar el cuestionario</p>;
            default:
                return null
        }
    };

    return (
        <div>
            <h2>Formulario FitLive</h2>
            {renderStep()}
        </div>
    );
}
