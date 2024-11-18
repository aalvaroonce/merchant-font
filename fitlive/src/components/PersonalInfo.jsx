import { useForm } from "react-hook-form";

export default function PersonalInfo({sendData}) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        sendData(data)
    };

    return (
        <>
            <h3>Información de contacto</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Dirección</label>
                    <input 
                        {...register('adress', { 
                            required: "La dirección es requerida", 
                            maxLength: { value: 25, message: "La dirección debe tener menos de 25 caracteres" }, 
                            minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" }
                        })} 
                    />
                    {errors.adress && <p>{errors.adress.message}</p>}
                </div>
                
                <div>
                    <label>Ciudad</label>
                    <input 
                        {...register('city', { 
                            required: "La ciudad es requerido",
                            maxLength: { value: 15, message: "La ciudad debe tener menos de 15 caracteres" }, 
                            minLength: { value: 3, message: "La ciudad debe tener al menos 3 caracteres" }
                        })} 
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                </div>

                <div>
                    <label>Código Postal</label>
                    <input 
                        {...register('postcode', { 
                            required: "El código postal es requerido",
                            pattern: { 
                                value: /^[0-9]{5}$/, 
                                message: "El código postal debe ser un número de 5 dígitos"
                            }
                        })} 
                    />
                    {errors.postcode && <p>{errors.postcode.message}</p>}
                </div>

                <input type="submit" />
            </form>
        </>
    );
}
