import { hash } from 'bcrypt';
import { User } from './user.model';
import { UserType } from './user.types';

export const createUser = async (user: UserType) => {
  const plainPassword = user.password;
  user.password = await hash(plainPassword, 10);

  const newUser = new User(user);
  const createdUser = await newUser.save();

  return createdUser.toObject()._id;
}

