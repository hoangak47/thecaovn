export async function createSchema(data) {
  const url = window.location.origin;
  console.log(url);
  const pageId = "gioi-thieu";

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      // "@id": "https://thecao.vercel.app/gioi-thieu",
      "@id": `${url}/${pageId}`,
    },
    headline: data.SEO_title || data.title || "Công ty TNHH MTV Thế Cao",
    image: [
      data.SEO_image ||
        data.image ||
        "https://res.cloudinary.com/dtt2iwxqg/image/upload/v1749911787/the-cao/Com.jpg",
    ],
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Person",
      name: "Công ty TNHH MTV Thế Cao",
    },
    publisher: {
      "@type": "Organization",
      name: "Công ty TNHH MTV Thế Cao",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dtt2iwxqg/image/upload/v1750009746/the-cao/logo.png",
      },
    },
    description:
      data.SEO_description ||
      data.short_description ||
      "Công ty TNHH THẾ CAO chuyên cung cấp dịch vụ uy tín, chất lượng tại Quận 12, TP. HCM. Liên hệ 0788 388 588 (Mr. Vũ) để được tư vấn!",
  };

  if (data.schema) {
    try {
      const customSchema =
        typeof data.schema === "string" ? JSON.parse(data.schema) : data.schema;
      return { ...defaultSchema, ...customSchema };
    } catch (error) {
      console.error("Error parsing schema from API:", error);
    }
  }

  return defaultSchema;
}
