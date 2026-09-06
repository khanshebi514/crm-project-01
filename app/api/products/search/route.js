import { searchProducts } from "@/lib/products/search-products";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");

    if (!query) {
      return Response.json([]);
    }

    // temporary tenant
    // we will connect auth tenant here
    const tenantId = "demo";

    const products = await searchProducts({
      tenantId,
      query,
    });

    return Response.json({
      success: true,
      products,
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
