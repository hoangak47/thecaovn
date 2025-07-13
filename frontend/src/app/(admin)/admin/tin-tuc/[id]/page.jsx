"use client";
import React from "react";
import { useParams } from "next/navigation";
import EditorForm from "../EditorForm";

export default function Page() {
  const { id } = useParams();
  return <EditorForm id={id} />;
}
