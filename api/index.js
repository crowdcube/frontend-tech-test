const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 9001;
const HOST = "localhost";

app.use("", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.get("/api/opportunities", async (request, response) => {
  var path = "./api/data/opportunities.json";
  var file = fs.readFileSync(path, "utf8");
  const opportunities = JSON.parse(file);

  const sort = request.query.sort;
  if (sort) {
    if (sort === "most-recent") {
      response.send(
        opportunities.sort((a, b) =>
          new Date(a.most_recent_investment) >
          new Date(b.most_recent_investment)
            ? -1
            : 1
        )
      );
    } else if (sort === "percentage") {
      response.send(
        opportunities.sort((a, b) =>
          a.investment.percentage > b.investment.percentage ? -1 : 1
        )
      );
    } else if (sort === "name-desc") {
      response.send(
        opportunities.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        )
      );
    } else if (sort === "name-asc") {
      response.send(
        opportunities.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        )
      );
    }
  } else {
    response.send(opportunities);
  }
});

app.get("/api/opportunity/:id", async (request, response) => {
  var path = "./api/data/opportunities.json";
  var file = fs.readFileSync(path, "utf8");
  const opportunities = JSON.parse(file);
  const id = request.params.id;
  const opportunity = opportunities.find((opp) => opp.id === id);
  opportunity.blocks = [
    {
      title: "The team",
      content: `This is a longer description block for the team of "${opportunity.name}".`,
    },
    {
      title: "The idea",
      content: `This is a longer description of why  "${opportunity.name}" are funding on Crowdcube.`,
    },
  ];

  response.send(opportunity);
});

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
