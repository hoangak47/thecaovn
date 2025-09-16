import React from "react";
import EditorForm from "./EditorForm";

export default function page({ params }) {
  const { id } = params;

  return <EditorForm id={id} />;
}
