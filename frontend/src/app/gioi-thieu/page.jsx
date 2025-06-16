import React from "react";
import NoImage from "@/assets/images/noimage.png";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:5000/gioi-thieu", {
      cache: "no-store",
    });
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
  const data = await fetchData();
  return {
    title: data.SEO_title || data.title || "Giới thiệu",
    description: data.SEO_description || data.short_description || "",
    keywords: data.SEO_keywords || "",
    robots: "index, follow",
    openGraph: {
      title: data.SEO_title || data.title || "Giới thiệu",
      description: data.SEO_description || data.short_description || "",
      images: data.SEO_image || data.image || NoImage.src,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.SEO_title || data.title || "Giới thiệu",
      description: data.SEO_description || data.short_description || "",
      images: data.SEO_image || data.image || NoImage.src,
    },
  };
}

export default async function Page() {
  const data = await fetchData();

  return (
    <>
      {data.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.schema }}
        />
      )}
      <div className="container mx-auto p-4 mb-10">
        <img src={data.image} alt={data.title} />
      </div>
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: data.description || "" }}
      />
    </>
  );
}
