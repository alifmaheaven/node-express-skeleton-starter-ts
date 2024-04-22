export default interface Users {
  uuid: string;
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}