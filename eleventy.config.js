export default function (eleventyConfig) {
  // Static assets (CSS, JS, images, favicon) are copied as-is to /assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets/");

  // Procedures live in src/procedury/*.md and are sorted by `order` front matter
  eleventyConfig.addCollection("procedures", (api) =>
    api
      .getFilteredByTag("procedure")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // Procedures shown in the home-page grid (those without showOnHome: false)
  eleventyConfig.addCollection("homeProcedures", (api) =>
    api
      .getFilteredByTag("procedure")
      .filter((p) => p.data.showOnHome !== false)
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // 1750 -> "1 750 Kč" (non-breaking spaces so the price never wraps)
  eleventyConfig.addFilter("czk", (n) =>
    `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")}\u00A0Kč`
  );

  // "+420 775 130 725" -> "+420775130725" for tel: links
  eleventyConfig.addFilter("telHref", (s) => String(s).replace(/\s+/g, ""));

  eleventyConfig.addFilter("isoDate", (d) =>
    new Date(d).toISOString().split("T")[0]
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
