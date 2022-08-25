/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import React from "react";
import { getPrismicClient } from "../../services/prismic";
import { getOneDay } from "../../utils/date";
import style from "./post.module.css";

type Post = {
  slug: string;
  title: string;
  subtitle: string;
  cover: {
    url: string;
    alt?: string;
  };
  content: string;
  published_at: string;
  category: string;
  author: string;
};

interface PostProps {
  post: Post;
}

function PostView({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <button type="button" onClick={() => router.back()}>
        Voltar
      </button>
      <div className={style["cover-container"]}>
        <img
          src={post.cover.url}
          alt={post.cover.alt || post.title}
          className={style.cover}
        />

        <div className={style["cover-text"]}>
          <h1>{post.title}</h1>
          <h3>{post.subtitle}</h3>
        </div>
      </div>
      <div className={style.body}>
        <span>{post.category}</span>
        <span>{post.author}</span>
        <span>{post.published_at}</span>
        <br />
        <hr />
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className={style["content-text"]}
        />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const prismic = await getPrismicClient();

  const response: any = await prismic.getByUID(
    "post",
    String(ctx?.params?.slug),
    {}
  );

  const post = {
    slug: ctx?.params?.slug,
    title: RichText.asText(response.data.title),
    subtitle: RichText.asText(response.data.resume),
    category: response.data.categories.slug,
    author: response.data.author.slug,
    cover: {
      url: response.data.cover.url,
      alt: response.data.cover.alt,
    },
    published_at: new Date(response.data.posted_at).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),

    content: RichText.asHtml(response.data.content),
  };

  return {
    props: { post },
    revalidate: getOneDay(),
  };
};

export default PostView;
