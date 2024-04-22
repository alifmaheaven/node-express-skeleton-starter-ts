export default interface Rooms {
  uud: string;
  name: string;
  description: string;
  media: string;
  room_code: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  user_id: string;
}