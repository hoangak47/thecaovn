export async function getData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${url}tieu-chi`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return [];
  }
}
