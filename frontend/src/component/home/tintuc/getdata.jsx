import axios from "axios";

export default async function getDataTinTuc() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    // const res = await fetch(`${url}tin-tuc`, {
    //   cache: "no-store",
    // });

    const res = await axios.get(`${url}tin-tuc`);

    return (await res.data) || [];
  } catch (error) {
    return null;
  }
}
