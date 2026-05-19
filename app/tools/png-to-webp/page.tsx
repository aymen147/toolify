import type { Metadata } from "next";
import ImageConversionPage from "@/components/tools/ImageConversionPage";
import { getToolBySlug } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getToolBySlug("png-to-webp")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

export default function Page() {
  return <ImageConversionPage slug="png-to-webp" from="png" to="webp" />;
}
