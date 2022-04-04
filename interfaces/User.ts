export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  profile: Profile;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
}

export interface Profile {
  address?: string;
  customImage?: string;
  id?: string;
  name?: string;
  phone?: string;
  position?: string;
  userId?: string;
}
