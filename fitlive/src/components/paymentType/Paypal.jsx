import { useForm } from "react-hook-form";

export default function Paypal({sendData}) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        sendData(data)
    };
    return (
        <div onSubmit={handleSubmit(onSubmit)}>
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
