import Prismic from "@prismicio/client";

const prismicURL = process.env.PRISMIC_URL;

export async function getPrismicClient(req?: unknown) {
  const prismic = await Prismic.client(String(prismicURL), {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismic;
}
