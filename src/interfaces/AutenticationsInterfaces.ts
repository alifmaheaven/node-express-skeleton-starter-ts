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

interface ProfileAuthInterfaces {
  uuid: string;
  name: string;
  username: string;
  email: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

export { RegisterInterfaces, LoginInterfaces, ResponseAuthInterfaces, ProfileAuthInterfaces }; 