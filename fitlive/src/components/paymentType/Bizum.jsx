// Bizum.jsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Bizum({ sendData }) {
    const { register, formState: { errors }, watch } = useForm();
    const phoneValue = watch("phone");

    useEffect(() => {
        if (phoneValue) {
            sendData({ phone: phoneValue });
        }
    }, [phoneValue, sendData]);

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
