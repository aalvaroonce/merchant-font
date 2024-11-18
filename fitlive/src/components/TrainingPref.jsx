import { useForm } from "react-hook-form";

export default function TrainingPref({ sendData }) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        sendData(data);
    };

    return (
        <>
            <h3>Preferencias del entrenamiento</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Tipo de Entrenamiento</label>
                    <select {...register('trainingType', { required: "El tipo de entrenamiento es requerido" })} defaultValue="">
                        <option value="" disabled>Seleccione uno</option>
                        <option value="musc">Muscular</option>
                        <option value="hip">Hipertrofia</option>
                        <option value="res">Resistencia</option>
                        <option value="def">Definición</option>
                        <option value="vol">Volumen</option>
                    </select>
                    {errors.trainingType && <p>{errors.trainingType.message}</p>}
                </div>

                <div>
                    <label>Objetivos</label>
                    <select {...register('objectives', { required: "Los objetivos son requeridos" })} defaultValue="">
                        <option value="" disabled>Seleccione uno</option>
                        <option value="g-fat">Ganar peso</option>
                        <option value="l-fat">Perder peso</option>
                        <option value="g-musc">Ganar musculo</option>
                    </select>
                    {errors.objectives && <p>{errors.objectives.message}</p>}
                </div>

                <div>
                    <label>Disponibilidad</label>
                    <select {...register('disponibility', { required: "La disponibilidad es requerida" })} defaultValue="">
                        <option value="" disabled>Seleccione uno</option>
                        <option value="morn">Mañanas</option>
                        <option value="aftn">Tardes</option>
                        <option value="night">Noches</option>
                    </select>
                    {errors.disponibility && <p>{errors.disponibility.message}</p>}
                </div>

                <input type="submit" />
            </form>
        </>
    );
}
