interface RegisterInterfaces {
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
}

interface LoginInterfaces {
  email?: string;
  username?: string;
  password?: string;
}

interface ResponseAuthInterfaces {
  token: string;
}

export { RegisterInterfaces, LoginInterfaces, ResponseAuthInterfaces }; 