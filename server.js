import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/", (req, res) => {
  exec("node ./node_modules/@playwright/test/cli.js test --reporter=list", (error, stdout, stderr) => {
    if (error) {
      return res.send(`<pre>❌ Ошибка:\n${error.message}</pre>`);
    }
    if (stderr && !stdout) {
      return res.send(`<pre>⚠️ Ошибки:\n${stderr}</pre>`);
    }
    res.send(`<pre>✅ Результат теста:\n${stdout}</pre>`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
