"use client";

import React, { useState, useEffect } from "react";
import HandleAction from "@/component/admin/handleActionContent";
import FormSchema from "@/component/admin/formSchema";
import FormSEO from "@/component/admin/formSEO";
import RenderMainContentFields from "@/component/admin/renderMainContentFields";

import axios from "axios";
import NoImage from "@/assets/images/noimage.png";
import usePath from "@/component/usePath";

const defaultData = {
  title: "",
  short_description: "",
  description: "",
  image: NoImage.src,
  SEO_title: "",
  SEO_description: "",
  SEO_keywords: "",
  SEO_image: NoImage.src,
  schema: "",
  url: "",
};

const url = process.env.NEXT_PUBLIC_API_URL;
const url_request = `${url}tin-tuc`;

const getData = async ({ id }) => {
  try {
    if (!id) {
      return defaultData;
    }
    const res = await axios.get(`${url_request}/${id}`);

    const result = res.data;

    return result || defaultData;
  } catch (error) {
    return defaultData;
  }
};

export default function EditorForm({ id }) {
  const [data, setData] = useState(defaultData);

  React.useEffect(() => {
    // if (id[id.length - 1] === "add") {
    //   setData(defaultData);
    // } else {
    //   getData({ id: id[id.length - 1] }).then((result) => {
    //     setData(result);
    //   });
    // }

    !id
      ? setData(defaultData)
      : getData({ id }).then((result) => setData(result));
  }, []);

  const handleChange = (field) => (value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-[#f8f9fc] text-[#3a3a3a] font-sans text-sm leading-relaxed overflow-y-auto">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <HandleAction
            initialData={data}
            setData={setData}
            url={url_request}
            data={data}
            id={id}
          />

          <RenderMainContentFields
            data={data}
            setData={setData}
            handleChange={handleChange}
            url={true}
            id={id}
          />

          <FormSEO data={data} setData={setData} handleChange={handleChange} />
          <FormSchema
            data={data}
            setData={setData}
            handleChange={handleChange}
          />
          <HandleAction
            initialData={data}
            setData={setData}
            url={url_request}
            data={data}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}
