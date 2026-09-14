const https = require("https");

https.get("https://azizkhaldi.com", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    const idx = data.indexOf("about_top_curve");
    if (idx !== -1) {
      console.log("=== SECTION AROUND about_top_curve ===");
      console.log(data.substring(idx - 300, idx + 500));
    } else {
      console.log("Not found 'about_top_curve', searching rounded-[50%]:");
      const matches = data.match(/<section[\s\S]*?<\/section>/g) || [];
      console.log("Sections count:", matches.length);
      for (let s of matches.slice(0, 3)) {
        console.log("Section start:", s.substring(0, 200));
      }
    }
  });
}).on("error", console.error);
