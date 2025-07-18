"use client"

import { useRouter } from "next/navigation"

function Home() {
  const router = useRouter();
  return router.replace("/dashboard")
}

export default Home

