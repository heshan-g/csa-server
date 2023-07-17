import { hash } from 'bcrypt';
import { User } from './user.model';
import { UserType } from './user.types';
import AppError from '../../utils/AppError';

export const createUser = async (user: UserType) => {
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) {
    throw new AppError(409, 'Email already registered.');
  }

  const plainPassword = user.password;
  user.password = await hash(plainPassword, 10);

  const newUser = new User(user);
  const createdUser = await newUser.save();

  return createdUser.toObject()._id;
}

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user?.toObject();
}

