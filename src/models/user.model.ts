interface UserModel  {
    name: string;
    email: string;
    password: string;
    image: string | undefined;
    address: string;
    phone: string;
    country: string;
}

export default UserModel;