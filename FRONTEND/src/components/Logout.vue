<script>
const logout = async () =>{
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Usuario deslogeado:', data);
        goToLogin();
    } catch (error) {
        console.error('Error al cerrar sesion:', error);
    }
}

</script>

<template>
    <button @click="logout" class="text-red-500">Cerrar Sesion</button>
</template>