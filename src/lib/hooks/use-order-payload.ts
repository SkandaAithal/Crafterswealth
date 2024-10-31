import { useApp } from "../provider/app-provider";
import { useAuth } from "../provider/auth-provider";
import { OrderStatus } from "../types/checkout";
import { decodeNumericId } from "../utils";

const useProcessOrder = () => {
  const { payment } = useApp();
  const { user } = useAuth();
  const payload = {
    customerId: decodeNumericId(user.id),
    billing: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber,
      address1: user.address,
      city: user.city,
      postcode: user.postcode,
      country: user.country,
      state: user.state,
    },
    paymentMethod: "phonepe",
    transactionId: payment.transactionId,

    orderId: payment.orderId,
  };

  const getSuccessOrderPayload = () => ({
    ...payload,
    status: OrderStatus.COMPLETED,
    isPaid: true,
  });

  const getFailureOrderPayload = () => ({
    ...payload,
    status: OrderStatus.FAILED,
    isPaid: false,
  });

  return { getSuccessOrderPayload, getFailureOrderPayload };
};

export default useProcessOrder;
