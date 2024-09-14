import { RouteController } from '../../lib/types/general';

export const sayHello: RouteController = async (req, res) => {
  try {
    // TODO: Create a service to handle sending responses from controllers
    // You would just pass it status, data/error and message
    res.status(200).send({
      success: true,
      data: {},
      message: 'Hi there. Yup, the route works',
    })
  } catch (err: any) {
    console.error('Error saying hello: ', err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: 'Saying hello failed'
    })
  }
};