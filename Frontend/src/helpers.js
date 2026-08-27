export const fetchData = (key) => {
    return localStorage.getItem("username") !== undefined ? localStorage.getItem("username") : "User";
}