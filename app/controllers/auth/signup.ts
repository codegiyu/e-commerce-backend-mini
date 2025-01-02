import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  setCookie,
  TOKENS_EXPIRY,
} from '../../lib/constants/auth';
import { RouteController } from '../../lib/types/general';
import { User } from '../../models';

export const signup: RouteController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'customer',
    });
    await user.save();

    // generate access and refresh tokens for the new user
    const accessToken = generateAccessToken(
      user._id as string,
      user.email,
      user.firstName,
      user.lastName
    );

    const refreshToken = generateRefreshToken(user._id as string);

    // Set the tokens in cookies
    setCookie(res, 'accessToken', accessToken, TOKENS_EXPIRY.ACCESS);
    setCookie(res, 'refreshToken', refreshToken, TOKENS_EXPIRY.REFRESH);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: accessToken,
      }, // user details without password
      message: 'User created successfully',
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Signup failed : ${err.message}`,
    });
  }
};
