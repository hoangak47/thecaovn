export default async function getDataTinTuc() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${url}tin-tuc`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("GioiThieu fetch error:", error);
    return null;
  }
}
