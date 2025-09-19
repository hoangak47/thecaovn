"use client";

import FormSchema from "@/component/admin/formSchema";
import FormSEO from "@/component/admin/formSEO";
import RenderMainContentFields from "@/component/admin/renderMainContentFields";
import React, { use } from "react";

import NoImage from "@/assets/images/noimage.png";
import HandleAction from "@/component/admin/handleActionContent";
import axios from "axios";

export default function page({ params }) {
  const [data, setData] = React.useState({
    title: "",
    description: "",
    image: NoImage.src,
    url: "",
    type: "san-pham",
    parent_category: "",
    active: true,
    SEO_title: "",
    SEO_description: "",
    SEO_keywords: "",
    SEO_image: NoImage.src,
    schema: "",
  });

  const { id } = use(params);
  const url = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
    axios
      .get(`${url}san-pham/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setData(data);
      });
  }, []);

  const handleChange = (key) => (value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    axios.get(`${url}danh-muc?search=san-pham`).then((response) => {
      const mapped = response.data.map((item) => ({
        value: item.url, // hoặc item.id nếu bạn muốn
        label: item.title,
      }));
      setOptions(mapped);
    });
  }, []);

  return (
    <div className="bg-[#f8f9fc] text-[#3a3a3a] font-sans text-sm leading-relaxed overflow-y-auto">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <HandleAction
            initialData={data}
            setData={setData}
            url={`${url}san-pham`}
            data={data}
            id={id}
            redirectTo={"/admin/san-pham"}
          />

          <RenderMainContentFields
            data={data}
            setData={setData}
            handleChange={handleChange}
            short_description_input="textarea"
            id={id}
          >
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
              <div className="px-5 py-3 border-b border-gray-300">
                <h2 className="text-gray-700 font-semibold text-base">
                  Danh mục sản phẩm
                </h2>
              </div>
              <form className="p-5">
                <label
                  htmlFor="category"
                  className="block text-gray-700 mb-2 text-sm font-normal"
                >
                  Danh mục cấp 1:
                </label>
                <select
                  id="category"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  value={data.parent_category}
                  onChange={(e) =>
                    handleChange("parent_category")(e.target.value)
                  }
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </RenderMainContentFields>

          <FormSEO data={data} setData={setData} handleChange={handleChange} />
          <FormSchema
            data={data}
            setData={setData}
            handleChange={handleChange}
          />
          <HandleAction
            initialData={data}
            setData={setData}
            url={`${url}san-pham`}
            data={data}
            id={id}
            redirectTo={"/admin/san-pham"}
          />
        </div>
      </div>
    </div>
  );
}
