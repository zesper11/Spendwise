export const fetchData = (key) => {
    return localStorage.getItem("username") !== null? localStorage.getItem("username") : "User";
}

const DeleteUserData = ({key}) => {
   return localStorage.removeItem(key)
}

export default DeleteUserData