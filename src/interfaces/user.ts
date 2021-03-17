export interface User {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  avatar?: string;
  role: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
  delete_at?: string;
}