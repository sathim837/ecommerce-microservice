import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';

const router = Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.put('/:id/status', OrderController.updateOrderStatus);
router.delete('/:id', OrderController.deleteOrder);



export default router;