import { RouteController } from '../../lib/types/general';

export const getSession: RouteController = async (req, res) => {
  try {
    // TODO: Write the rest of the logic here
    // This endpoint will be called once someone opens the app
    // It's purpose is to check if they have auth tokens and if they are valid
    // If they are, return the user's details
    // Else you can return a 401 Unauthenticated error


    res.status(200).send({
      success: true,
      data: {
        user: {} // User object here
      },
      message: 'User tokens valid',
    })
  } catch (err: any) {
    console.error('Error getting session: ', err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: 'Getting session failed'
    })
  }
};