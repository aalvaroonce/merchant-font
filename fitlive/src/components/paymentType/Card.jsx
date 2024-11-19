import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

export default function Card({ sendData }) {
    const { register, formState: { errors, isValid }, watch } = useForm({
        mode: 'onChange' 
    });


    const cardNumber = watch('cardNumber');
    const expirationDate = watch('expirationDate');
    const cvv = watch('cvv');

    const hasSentData = useRef(false);

    useEffect(() => {
        if (cardNumber && expirationDate && cvv && isValid && !hasSentData.current) {
            sendData({ cardNumber, expirationDate, cvv });
            hasSentData.current = true;
        }
    }, [cardNumber, expirationDate, cvv, isValid, sendData]);

    return (
        <div>
            <label>Número de tarjeta</label>
            <input
                type="text"
                {...register('cardNumber', { 
                    required: "El número de tarjeta es requerido",
                    pattern: { 
                        value: /^[0-9]{16,19}$/, 
                        message: "El número de tarjeta debe ser entre 16 y 19 dígitos"
                    }
                })}
            />
            {errors.cardNumber && <p>{errors.cardNumber.message}</p>}

            <label>Fecha de expiración</label>
            <input
                type="date"
                {...register('expirationDate', { required: "La fecha de expiración es requerida" })}
            />
            {errors.expirationDate && <p>{errors.expirationDate.message}</p>}

            <label>CVV</label>
            <input
                type="text"
                {...register('cvv', { 
                    required: "El CVV es requerido",
                    pattern: { 
                        value: /^[0-9]{3,4}$/, 
                        message: "El CVV debe ser un número de 3 o 4 dígitos"
                    }
                })}
            />
            {errors.cvv && <p>{errors.cvv.message}</p>}
        </div>
    );
}
