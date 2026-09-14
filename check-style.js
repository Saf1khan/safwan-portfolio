const https = require("https");

https.get("https://azizkhaldi.com", (res) => {
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    const styleTags = data.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
    for (let tag of styleTags) {
      if (tag.includes("about_top_curve")) {
        console.log("MATCHING STYLE TAG:\n", tag.replace(/<\/?[^>]+(>|$)/g, ""));
      }
    }
  });
});
