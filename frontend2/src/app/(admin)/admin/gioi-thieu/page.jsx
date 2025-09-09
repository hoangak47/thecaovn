import axios from "axios";
import EditorForm from "./EditorForm";

async function getData() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await axios.get(`${url}gioi-thieu`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    const result = res.data;

    return {
      title: result.title || "",
      short_description: result.short_description || "",
      description: result.description || "",
      image: result.image || "/noimage.png",
      SEO_title: result.SEO_title || "",
      SEO_description: result.SEO_description || "",
      SEO_keywords: result.SEO_keywords || "",
      SEO_image: result.SEO_image || "/noimage.png",
      schema: result.schema || "",
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      title: "",
      short_description: "",
      description: "",
      image: "/noimage.png",
      SEO_title: "",
      SEO_description: "",
      SEO_keywords: "",
      SEO_image: "/noimage.png",
      schema: "",
    };
  }
}

export default async function Page() {
  const data = await getData();

  return <EditorForm initialData={data} />;
}
