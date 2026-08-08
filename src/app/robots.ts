import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://helpisontheway.ph";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/appointments", "/book", "/profile", "/instructions", "/notifications", "/admin", "/auth/", "/login", "/signup"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
