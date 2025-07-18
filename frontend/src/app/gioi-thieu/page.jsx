import React from "react";
import NoImage from "@/assets/images/noimage.png";

async function getData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${url}gioi-thieu`);
    const result = await response.json();
    return {
      title: result.title || "",
      short_description: result.short_description || "",
      description: result.description || "",
      image: result.image || NoImage.src,
      SEO_title: result.SEO_title || "",
      SEO_description: result.SEO_description || "",
      SEO_keywords: result.SEO_keywords || "",
      SEO_image: result.SEO_image || NoImage.src,
      schema: result.schema ? result.schema : "",
    };
  } catch (error) {
    return {
      title: "",
      short_description: "",
      description: "",
      image: NoImage.src,
      SEO_title: "",
      SEO_description: "",
      SEO_keywords: "",
      SEO_image: NoImage.src,
      schema: "",
    };
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <head>
        <title>{data.SEO_title || data.title || "Giới thiệu"}</title>
        <meta
          name="description"
          content={data.SEO_description || data.short_description || ""}
        />
        <meta name="keywords" content={data.SEO_keywords || ""} />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={data.SEO_title || data.title || "Giới thiệu"}
        />
        <meta
          property="og:description"
          content={data.SEO_description || data.short_description || ""}
        />
        <meta
          property="og:image"
          content={data.SEO_image || data.image || NoImage.src}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={data.SEO_title || data.title || "Giới thiệu"}
        />
        <meta
          name="twitter:description"
          content={data.SEO_description || data.short_description || ""}
        />
        <meta
          name="twitter:image"
          content={data.SEO_image || data.image || NoImage.src}
        />
      </head>
      {data.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.schema }}
        />
      )}
      <div className="container mx-auto p-4 mb-10">
        <img src={data.image} alt={data.title} className="w-full h-[80vh]" />
      </div>
      <div
        className="ck-content xl:px-28 px-4 mt-10"
        dangerouslySetInnerHTML={{ __html: data.description || "" }}
      />
    </>
  );
}
