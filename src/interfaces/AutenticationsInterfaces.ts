interface RegisterInterfaces {
  company_id: string; // UUID in SQL
  role_id: string; // UUID in SQL
  contract_id: string; // UUID in SQL
  location_id: string; // UUID in SQL
  sites_id: string; // UUID in SQL
  code: string; // CHAR(50) in SQL
  name: string; // CHAR(100) in SQL
  email: string; // CHAR(100) in SQL
  password: string; // CHAR(100) in SQL
  phone: number | null; // INT in SQL, nullable
  star_user: Date | null; // TIMESTAMP in SQL, nullable
  end_user: Date | null; // TIMESTAMP in SQL, nullable
}

interface LoginInterfaces {
  email?: string;
  password?: string;
}

interface ResponseAuthInterfaces {
  token: string;
}

interface ProfileAuthInterfaces {
  id: string;
  company_id: string; // UUID in SQL
  role_id: string; // UUID in SQL
  contract_id: string; // UUID in SQL
  location_id: string; // UUID in SQL
  sites_id: string; // UUID in SQL
  code: string; // CHAR(50) in SQL
  name: string; // CHAR(100) in SQL
  email: string; // CHAR(100) in SQL
  phone: number | null; // INT in SQL, nullable
  star_user: Date | null; // TIMESTAMP in SQL, nullable
  end_user: Date | null; // TIMESTAMP in SQL, nullable
}

export { RegisterInterfaces, LoginInterfaces, ResponseAuthInterfaces, ProfileAuthInterfaces }; 