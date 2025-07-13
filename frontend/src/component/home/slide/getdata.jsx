import axios from "axios";

export default async function getSlideData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const res = await axios.get(`${url}slide`);

    return (await res.data) || [];
  } catch (error) {
    console.error("Slide fetch error:", error);
    return [];
  }
}
