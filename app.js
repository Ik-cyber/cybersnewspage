const express = require("express");
const app = express();
const _ = require("lodash");
const url = require("url");
const https = require("https");
const { log } = require("console");
const { type } = require("os");
const Url =
  "https://newsdata.io/api/1/news?apikey=pub_29629cf2a60753bbb5d8e8c8b93add00aae01&category=technology&language=en";
// https://newsdata.io/api/1/news?q=english&apikey=pub_29629cf2a60753bbb5d8e8c8b93add00aae01  results[0].description results[2].link
app.set("view engine", "ejs");
app.use(express.static("public"));
const contt = [];
const Titles = [];
const links = [];
let ppot = {};

// let entries = Object.entries(ppot)
app.get("/", (req,res) => {
  res.render("welcome");
})
app.get("/home", (req, res) => {
  https.get(Url, function (response) {
    const data = [];

    response
      .on("data", (d) => {
        data.push(d);
      })
      .on("end", function () {
        //at this point data is an array of Buffers
        //so Buffer.concat() can make us a new Buffer
        //of all of them together
        const buffer = Buffer.concat(data);
        var obj = JSON.parse(buffer.toString());
        objj = obj;
        for (var i = 0; i < Infinity; i++) {
          try {
            const content = obj.results[i].content;
            const title = obj.results[i].title;
            const link = obj.results[i].link;
            content1 = content;
            title1 = title;
            contt.push(content);
            Titles.push(title);
            ppot[title] = content;
          } catch (err) {
            break;
          }
          // console.log(ppot);
        }
        for (key in ppot) {
          var val = ppot[key];
        }
        res.render("index", { ppot: ppot });
        
      });
  });
});
app.get("/post/:unknown", (req, res) => {
  unnk = req.params.unknown;
  unknown = _.lowerCase(req.params.unknown);

  // var resut = JSON.parse(ppot)
  // console.log(ppot);
  v = Object.keys(ppot).indexOf(unnk);
  console.log(v);
  for (key in ppot) {
    i = 8;
   
    if (key === unnk) {
      var link = objj.results[v].link;
      var image = objj.results[v].image_url;
      vatlink = link;
      Image = image
      console.log(typeof unnk);
      console.log(
        "---------------------------------------------------------------------------------------------------"
      );
      break;
    } else {
      i++;
    }
  }
  // for (let index = 0; index < Infinity; index++) {
  //   arras = Object.keys(ppot)
  //   for (i in arras) {
  //     if (i === unnk){
  //       var link = objj.results[index].link;
  //       vatlink = link;
  //       console.log(index);
  //       console.log(
  //         "---------------------------------------------------------------------------------------------------"
  //       );
  //       break;
  //     }
  //   }
  // }
  res.render("post", {
    Title: unnk,
    content: ppot[unnk],
    link: vatlink,
    linkword: vatlink,
    image:Image
  });
  // ppot = ppot
  // var result = Object.keys(ppot).map((key) => [key, ppot[key]]);

  // }
});

app.listen(process.env.PORT || 4000, console.log("server started at port:4000"));
