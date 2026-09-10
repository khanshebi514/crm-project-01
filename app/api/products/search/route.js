import { searchProducts } from "@/lib/products/search-products";

import { getSessionCookie } from "@/lib/auth/cookies";

import { requireBusinessUser } from "@/lib/auth/route-access";

export async function GET(request) {
  try {
    const token = await getSessionCookie();

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const user = await requireBusinessUser(token);

    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");

    if (!query) {
      return Response.json({
        success: true,

        products: [],
      });
    }

    const products = await searchProducts({
      tenantId: user.tenantId,

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
