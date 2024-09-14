import { RouteController } from '../../lib/types/general';

export const login: RouteController = async (req, res) => {
  try {
    // TODO: Write the rest of the logic here
    // This endpoint will be called when the login form is submitted
    // It's purpose is to check if the submitted email and password are valid
    // If they are, grab the user's details from the db and send along
    // Also generate an access and refresh jwt token. You can store the user's id, email and maybe names in the access token
    // Then set those tokens as cookies
    // Else you can return a 400 Bad Request


    res.status(200).send({
      success: true,
      data: {
        user: {} // User object here
      },
      message: 'User logged in successfully',
    })
  } catch (err: any) {
    console.error('Error logging in: ', err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: 'Log in failed'
    })
  }
};