import { useForm } from "react-hook-form";

export default function Card({sendData}) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        sendData(data)
    };

    return (
        <div onSubmit={handleSubmit(onSubmit)}>
            <label>Número de tarjeta</label>
            <input type="text" {...register('cardNumber', { 
                required: "El número de tarjeta es requerido" ,
                pattern: { 
                    value: /^[0-9]{16,19}$/, 
                    message: "El código postal debe ser un número entre 16 y 19 dígitos"
                }
                })} />
            {errors.cardNumber && <p>{errors.cardNumber.message}</p>}

            <label>Fecha de expiración</label>
            <input type="date" {...register('expirationDate', { required: "La fecha de expiración es requerida" })} />
            {errors.expirationDate && <p>{errors.expirationDate.message}</p>}

            <label>CVV</label>
            <input type="text" {...register('cvv', { 
                required: "El CVV es requerido",
                pattern: { 
                    value: /^[0-9]{4}$/, 
                    message: "El código postal debe ser un número de 4 dígitos"
                }
                })} />
            {errors.cvv && <p>{errors.cvv.message}</p>}
        </div>
    );
}
