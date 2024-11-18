export default function DeleteUser(){

    const token = localStorage.getItem('token');
    const id= localStorage.getItem('id')
    
    const handleClick= async () => {

        try{
            const response = await fetch(`http://localhost:3000/api/users/${id}`, 
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            const data = await response.json()
            console.log(data)
        }
        catch (err){
            console.log('Error al eliminar la data'+err)
        }
    }
    return(
        <>
            <button onClick={handleClick}>Pulsa para borrar</button>
        </>
    )
}