import React from "react";
import NoImage from "@/assets/images/noimage.png";

async function getData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${url}gioi-thieu`, {
      cache: "no-store", // Thêm để tránh cache
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

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
    console.error("Error fetching data:", error);
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

export async function generateMetadata() {
  const data = await getData();
  return {
    title: data.SEO_title || data.title || "Giới thiệu",
    description: data.SEO_description || data.short_description || "",
    keywords: data.SEO_keywords || "",
    openGraph: {
      title: data.SEO_title || data.title || "Giới thiệu",
      description: data.SEO_description || data.short_description || "",
      images: [data.SEO_image || data.image || NoImage.src],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.SEO_title || data.title || "Giới thiệu",
      description: data.SEO_description || data.short_description || "",
      images: [data.SEO_image || data.image || NoImage.src],
    },
    robots: "index, follow",
  };
}

export default async function Page() {
  const data = await getData();
  return (
    <>
      {data.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.schema }}
        />
      )}
      <div className="container mx-auto p-4 mb-10">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-[80vh] object-cover"
        />
      </div>
      <div
        className="ck-content xl:px-28 px-4 mt-10"
        dangerouslySetInnerHTML={{ __html: data.description || "" }}
      />
    </>
  );
}
