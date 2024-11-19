// Bizum.jsx
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

export default function Bizum({ sendData }) {
    const { register, formState: { errors, isValid }, watch } = useForm();
    const phoneValue = watch("phone");
    const hasSentData = useRef(false);

    useEffect(() => {
        if (phoneValue && isValid && !hasSentData.current) {
            sendData({ phone: phoneValue });
            hasSentData.current = true;
        }
    }, [phoneValue, isValid, sendData]);

    return (
        <div>
            <label>Número de teléfono</label>
            <input 
                type="text" 
                {...register('phone', { 
                    required: "El número de teléfono es requerido",
                    pattern: { 
                        value: /^[0-9]{9}$/, 
                        message: "El número de teléfono debe ser un número de 9 caracteres"
                    } 
                })} 
            />
            {errors.phone && <p>{errors.phone.message}</p>}
        </div>
    );
}
