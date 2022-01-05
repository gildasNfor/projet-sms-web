export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  email: string;
  confirm_password: string;
}

export interface User {
  userId: string;
  username: string;
}

export interface Contact {
  name: string;
  phoneNo: string;
  created_by: string;
  _id: string;
}

export interface Message {
  content: string;
  sent_on: string;
}
