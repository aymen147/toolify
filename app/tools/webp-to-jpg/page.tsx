import type { Metadata } from "next";
import ImageConversionPage from "@/components/tools/ImageConversionPage";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("webp-to-jpg")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

export default function Page() {
  return <ImageConversionPage slug="webp-to-jpg" from="webp" to="jpg" />;
}
