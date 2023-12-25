
export const fetchUser = async (path, obj) => {
    try {
        const url = `http://localhost:3000/users/${path}`;
        const res = await fetch(url, obj);
        const user = await res.json();
        console.log(user);
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
}