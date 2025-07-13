export default async function getSlideData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${url}slide`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Slide fetch error:", error);
    return [];
  }
}
