import { createSale } from "@/lib/sales/create-sale";
import { validateSaleInput } from "@/lib/sales/sale-validation";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      tenantId,
      userId,
      customerId,
      items,
      discount,
      tax,
      paidAmount,
      paymentMethod,
    } = body;

    validateSaleInput({
      items,

      discount,

      tax,

      paidAmount,
    });

    const sale = await createSale({
      tenantId,

      userId,

      customerId,

      items,

      discount,

      tax,

      paidAmount,

      paymentMethod,
    });

    return Response.json({
      success: true,

      sale,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },

      {
        status: 400,
      },
    );
  }
}
