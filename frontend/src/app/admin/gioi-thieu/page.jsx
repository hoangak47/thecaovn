import EditorForm from "./EditorForm";

async function getData() {
  const res = await fetch("http://localhost:5000/gioi-thieu", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
  const result = await res.json();

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
}

export default async function Page() {
  const data = await getData();

  return <EditorForm initialData={data} />;
}
