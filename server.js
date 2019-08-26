const express = require('express');
const path = require('path')
const app = express();
const React = require("react")
const request = require("request")
const fs = require("fs")
const { renderToNodeStream, renderToString } = require("react-dom/server")
const Home = require("./dist-ssr/home").default

app.get('/home', (req, res) => {
  // renderStaticMarkup({
  //   component: Home,
  //   req,
  //   res,
  //   file: 'home'
  // })
  res.set("Content-type", "text/html")
  const url = "https://itunes.apple.com/in/rss/topalbums/limit=100/json"
  const options = {
    method: "get",
    json: true,
    url
  }
  request(options, (err, httpRes, body) => {
    const html = fs.readFileSync(path.resolve(__dirname, `./dist/home.html`), "utf-8")
    const [head, tail] = html.split("{content}")
    res.write(head)
    const newTail = tail.split("{script}")
      .join(`
      <script>
        window.PRODUCT_STATE = ${JSON.stringify(body.feed.entry)}
      </script>
      `)
    const reactElement = React.createElement(Home, { products: body.feed.entry })
    const stream = renderToNodeStream(reactElement)
    stream.pipe(res, { end: false })
    stream.on("end", () => {
      res.write(newTail)
      res.end()
    })
  })
})

function renderStaticMarkup({ component, req, res, file }) {
  res.set("Content-type", "text/html")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  const html = fs.readFileSync(path.resolve(__dirname, `./dist/${file}.html`), "utf-8")
  const [head, tail] = html.split("{content}")
  // const headWithNavbar = withMetaTags(withHeader(head), req.url, req.url)
  // res.write(headWithNavbar)
  const reactElement = React.createElement(component)
  const stream = renderToNodeStream(reactElement)
  stream.pipe(res, { end: false })
  stream.on("end", () => {
    res.write(tail)
    res.end()
  })
}

app.get('*.js', function (req, res, next) {
  const runtimeUrlRegex = /runtime.*.js/
  if (!runtimeUrlRegex.test(req.url)) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});