import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/", (req, res) => {
  exec("npx playwright test", (error, stdout, stderr) => {
    if (error) {
      return res.send(`<pre>❌ Ошибка:\n${error.message}</pre>`);
    }
    if (stderr) {
      return res.send(`<pre>⚠️ Ошибки:\n${stderr}</pre>`);
    }
    res.send(`<pre>✅ Результат теста:\n${stdout}</pre>`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
