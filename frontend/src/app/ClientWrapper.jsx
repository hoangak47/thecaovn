// // "use client";

// import Layout from "@/constants/layout/layout";
// import Body from "@/constants/body";
// import { GlobalProvider } from "@/context/GlobalContext";
// import { cookies } from "next/headers";

// export default async function ClientWrapper({ children }) {
//   const cookieStore = await cookies();
//   const role = cookieStore.get("role")?.value;
//   const isAdmin = role === "admin";
//   if (isAdmin) return children;

//   return (
//     <GlobalProvider>
//       <Layout>
//         <Body>{children}</Body>
//       </Layout>
//     </GlobalProvider>
//   );
// }
