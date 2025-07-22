import axios from "axios";
import EditorForm from "./EditorForm";

async function getData() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await axios.get(`${url}footer`);
    return res.data;
  } catch (error) {
    return {};
  }
}

export default async function Page() {
  const data = await getData();

  return <EditorForm initialData={data} />;
}
