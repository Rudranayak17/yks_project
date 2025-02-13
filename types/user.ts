export type UserRole = "admin" | "user";

export interface User {
  createdAt?: string;
  _id?: string; // User ID
  username: string; // User's full name
  email: string; // User's email
  token?: string; // Authentication token (JWT or similar)
  role?: "admin" | "user"; // User role
  phone?: string;
  address?: string;
}
export interface CONTENT {

  token?: string;
  username: string;
  userId: number | string;
  fullName: string;
  bannerUrl:string
  userRole: "ROLE_ADMIN"|"ROLE_USER"|"ROLE_SUPER_ADMIN";
  userProfilePic: string;
  enabled?:boolean
}
export interface contact {
  name: string;
  email: string;
  message: string;
}
export interface UserTableColumn {
  id: keyof User | "actions";
  label: string;
  sortable?: boolean;
}
export interface UserDetail {
  user?: User;
}
export const columns: UserTableColumn[] = [
  { id: "username", label: "Username", sortable: true },
  { id: "email", label: "Email", sortable: true },
  { id: "role", label: "Role", sortable: true },
  { id: "createdAt", label: "Created At", sortable: true }, // Changed from 'lastActive' to 'createdAt'
];

export type UserProfile = {
  societyId?:string;
  fullName?: string;
  email?: string;
  password?: string;
  phoneNo?: string;
  profile_pic?: string;
  designation?: string;
  address?: string;
  birthdate?: string;
  anniversary?: string;
  gender?: "MALE" | "FEMALE" | "OTHER"; // Enum for gender, based on provided data
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  snapChat?: string;
  whatsappNo?: string;
  voter?: boolean;
  member?: boolean;
};
