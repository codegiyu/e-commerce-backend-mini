import { RouteController } from '../../lib/types/general';

export const signup: RouteController = async (req, res) => {
  try {
    // TODO: Write the rest of the logic here
    // This endpoint will be called when the signup form is submitted
    // It's purpose is to use the submitted name, email and password to create a new user


    res.status(201).send({
      success: true,
      data: {}, // Make some research if user obj should be sent back and why
      message: 'User created successfully',
    })
  } catch (err: any) {
    console.error('Error signing up: ', err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: 'Signup failed'
    })
  }
};