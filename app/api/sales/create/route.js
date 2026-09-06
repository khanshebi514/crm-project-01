import { createSale } from "@/lib/sales/create-sale";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      tenantId,
      userId,
      customerId,
      items,
      discount,
      paidAmount,
      paymentMethod,
    } = body;

    if (!items || !items.length) {
      throw new Error("Sale items are required");
    }

    const sale = await createSale({
      tenantId,

      userId,

      customerId,

      items,

      discount,

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
