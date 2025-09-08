export async function createSchema(data) {
  const url = window.location.origin;

  const pageId = window.location.pathname.split("/");

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/${
        pageId[pageId.length - 1] === "add"
          ? !data.url
            ? pageId[pageId.length - 2]
            : data.url
          : data.url || pageId[pageId.length - 1]
      }`,
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

  return defaultSchema;
}
