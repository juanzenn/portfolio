const express = require("express")
const handlebars = require("express-handlebars")
const port = process.env.PORT || '3000'

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
  res.render("index", {
    value: [
      {
        icon: `M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z`,
        title: "Fully reviewed",
        content:
          "I review intensively in every stage of the process to have the websites in top-notch conditions.",
      },
      {
        icon: `M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z`,
        title: "Beautiful design",
        content:
          "I design clear designs that speaks for itself and let customers focus on the important.",
      },
      {
        icon: `M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z`,
        title: "Thoroughly testing",
        content: "I test the website to ensure all functions work perfectly.",
      },
      {
        icon: `M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9`,
        title: "Continuous support",
        content:
          "I help you with new features or improvements as your website grows.",
      },
    ],
  })
})

app.listen(port, () => console.log(`App listening to port ${port}`))
