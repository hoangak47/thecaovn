import axios from "axios";
import EditorForm from "./EditorForm";

import NoImage from "@/assets/images/noimage.png";

const defaultData = {
  title: "",
  description: "",
  image: NoImage.src,
};

async function getData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${url}lien-he`);
    const result = res.data;
    return result || defaultData;
  } catch (error) {
    return defaultData;
  }
}

export default async function Page() {
  const data = await getData();

  return <EditorForm initialData={data} />;
}
