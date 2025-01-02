import { RouteController } from '../../lib/types/general';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  setCookie,
  TOKENS_EXPIRY,
} from '../../lib/constants/auth';
import { User } from '../../models';

export const login: RouteController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('password role');
    if (!user)
      return res
        .status(404)
        .json({ message: 'No user found with the provided email.' });

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(
      user._id as string,
      user.email,
      user.firstName,
      user.lastName
    );
    const refreshToken = generateRefreshToken(user._id as string);

    // Set the tokens in cookies
    setCookie(res, 'accessToken', accessToken, TOKENS_EXPIRY.ACCESS); // 15-minute expiry
    setCookie(res, 'refreshToken', refreshToken, TOKENS_EXPIRY.REFRESH); // 30-day expiry

    res.status(200).json({
      success: true,
      data: [user, accessToken],
      message: 'User logged in successfully',
    });
  } catch (err: any) {
    console.error('Error logging in: ', err);
    res.status(500).json({
      success: false,
      message: `Log in failed: ${err.message}`,
    });
  }
};
