import { useForm } from "react-hook-form";
import { useState } from "react";
import Card from "./paymentType/Card";
import Bizum from "./paymentType/Bizum";
import Paypal from "./paymentType/Paypal";

export default function Payment({ sendData }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentDetails, setPaymentDetails] = useState(null);

    const onSubmit = (data) => {
        const fullData = { ...data, paymentDetails };
        console.log(fullData)
        sendData(fullData);
    };

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handlePaymentData = (data) => {
        setPaymentDetails(data);
    };

    const renderPaymentLabel = () => {
        switch (paymentMethod) {
            case "card":
                return <label>Información de la tarjeta</label>;
            case "bizum":
                return <label>Información de Bizum</label>;
            case "paypal":
                return <label>Información de Paypal</label>;
            default:
                return null;
        }
    };

    return (
        <>
            <h3>Datos del Pago</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Método de pago</label>
                    <select 
                        {...register('method', { required: "El tipo de entrenamiento es requerido" })}
                        onChange={handlePaymentChange}
                    >
                        <option value="" disabled selected>Seleccione uno</option>
                        <option value="card">Tarjeta</option>
                        <option value="bizum">Bizum</option>
                        <option value="paypal">Paypal</option>
                    </select>
                    {errors.method && <p>{errors.method.message}</p>}
                </div>

                <div>
                    {renderPaymentLabel()}
                    <div>
                        {paymentMethod === "card" && <Card sendData={handlePaymentData} />}
                        {paymentMethod === "bizum" && <Bizum sendData={handlePaymentData} />}
                        {paymentMethod === "paypal" && <Paypal sendData={handlePaymentData} />}
                    </div>
                </div>

                <input type="submit" />
            </form>
        </>
    );
}
