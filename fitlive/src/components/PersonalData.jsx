import { useForm } from "react-hook-form";

export default function PersonalData({sendData}) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        sendData(data)
    };

    return (
        <>
            <h3>Datos personales</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombre</label>
                    <input 
                        {...register('name', { 
                            required: "El nombre es requerido", 
                            maxLength: { value: 20, message: "El nombre debe tener menos de 20 caracteres" }, 
                            minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" }
                        })} 
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                
                <div>
                    <label>Correo Electrónico</label>
                    <input 
                        {...register('email', { 
                            required: "El correo electrónico es requerido",
                            pattern: { 
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Debe ingresar un correo electrónico válido"
                            }
                        })} 
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Teléfono</label>
                    <input 
                        type="tel" 
                        {...register('phone', { 
                            required: "El teléfono es requerido",
                            pattern: { 
                                value: /^[0-9]{9}$/, 
                                message: "El teléfono debe ser un número de 9 dígitos"
                            }
                        })} 
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                <input type="submit" />
            </form>
        </>
    );
}
