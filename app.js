const express = require("express")
const handlebars = require("express-handlebars")
const fs = require("fs")
const port = process.env.PORT || "3000"

const app = express()
app.use(express.static("public"))

app.engine(
  "hbs",
  handlebars({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
      },
    },
  })
)

app.set("view engine", "hbs")

app.get("/", (req, res) => {
  const contentRaw = fs.readFileSync("./public/dist/content/index.json")
  const content = JSON.parse(contentRaw)

  res.render("index", { content: content })
})

app.listen(port, () => console.log(`App listening to port ${port}`))
