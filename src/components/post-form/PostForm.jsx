import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [localPreview, setLocalPreview] = useState(null);
  const previewRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }
    };
  }, []);

  const submit = async (data) => {
    // Check if user is logged in
    if (!userData || !userData.$id) {
      alert("You must be logged in to create a post");
      return;
    }

    try {
      if (post) {
        // Updating existing post
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // Creating new post
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          
          // Make sure slug is included
          const dbPost = await appwriteService.createPost({
            title: data.title,
            slug: data.slug,
            content: data.content,
            featuredImage: fileId,
            status: data.status,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post: " + error.message);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-6">
      <div className="w-full lg:w-2/3 lg:pr-6">
        <Input
          label="Title"
          placeholder="Your post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="auto-generated-slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full lg:w-1/3">
        <div className="bg-surface border border-slate rounded-xl p-5 space-y-5">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setLocalPreview(url);
                // keep latest object URL to revoke it later
                if (previewRef.current && previewRef.current !== url) {
                  URL.revokeObjectURL(previewRef.current);
                }
                previewRef.current = url;
              } else {
                if (previewRef.current) {
                  URL.revokeObjectURL(previewRef.current);
                  previewRef.current = null;
                }
                setLocalPreview(null);
              }
            }}
          />

          {/* Show local preview if a file is selected, otherwise show the existing post image (if any) */}
          {(localPreview || post) && (
            <div className="w-full rounded-lg overflow-hidden border border-slate">
              <img
                src={localPreview || appwriteService.getFileView(post?.featuredImage)}
                alt={post?.title || "preview"}
                className="w-full object-cover"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            variant={post ? "success" : "primary"}
            className="w-full"
          >
            {post ? "Update post" : "Publish post"}
          </Button>
        </div>
      </div>
    </form>
  );
}