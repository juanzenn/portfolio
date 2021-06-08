const express = require("express")
const handlebars = require("express-handlebars")
const fs = require("fs")
const matter = require("gray-matter")
const marked = require('marked')
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

app.get("/project/:id", (req, res) => {
  try {
    // Images
    const imagesRaw = fs.readFileSync(
      `./public/dist/content/${req.params.id}/images.json`
    )
    const imagesContent = JSON.parse(imagesRaw)

    // Content
    const mdFile = fs.readFileSync(
      `./public/dist/content/${req.params.id}/content.md`,
      "utf8"
    )
    const matterObject = matter(mdFile)
    const html = marked(matterObject.content)

    res.render("project", {
      layout: "project_layout",
      project_title: req.params.id,
      images: imagesContent,
      title: matterObject.data.title,
      content: html
    })
  } catch (e) {
    console.log(e)
    res.status(404)
    res.render("404", { layout: "404" })
  }
})

app.listen(port, () => console.log(`App listening to port ${port}`))
