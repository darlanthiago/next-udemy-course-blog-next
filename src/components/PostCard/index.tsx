/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./PostCard.module.css";

type Post = {
  slug: string;
  title: string;
  subtitle: string;
  cover: {
    url: string;
    alt?: string;
  };
  published_at: string;
  updated_at: string;
};

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  return (
    <Link href={`/post/${post.slug}`} passHref>
      <a className={style.container}>
        <img
          src={post.cover.url}
          alt={post.cover.alt || "IMAGE"}
          className={style.cover}
        />
        <h3>{post.title}</h3>
        <span>{post.subtitle}</span>
        <span>
          <small>Publicado em {post.published_at}</small>
        </span>
      </a>
    </Link>
  );
}
