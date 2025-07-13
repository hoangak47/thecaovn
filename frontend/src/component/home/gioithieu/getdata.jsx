import axios from "axios";

export default async function getGioiThieuData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${url}gioi-thieu`);
    return (await res.data) || [];
  } catch (error) {
    console.error("GioiThieu fetch error:", error);
    return null;
  }
}
