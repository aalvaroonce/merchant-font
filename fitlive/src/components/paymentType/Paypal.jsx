import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

export default function Paypal({sendData}) {
    const { register, formState: { errors, isValid }, watch } = useForm();
    const emailValue = watch("paypalEmail");
    const hasSentData = useRef(false);

    useEffect(() => {
        if (emailValue && isValid && !hasSentData.current) {
            sendData({ email: emailValue });
            hasSentData.current = true;
        }
    }, [emailValue, isValid, sendData]);

    return (
        <div>
            <label>Correo de PayPal</label>
            <input type="email" {...register('paypalEmail', {
                required: "El correo de PayPal es requerido", 
                pattern: { 
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Debe ingresar un correo electrónico válido"
                }
                })} />
            {errors.paypalEmail && <p>{errors.paypalEmail.message}</p>}
        </div>
    );
}
