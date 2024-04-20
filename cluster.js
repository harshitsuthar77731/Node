import express from "express";
import os from "os";
import cluster from "cluster";

const app = express();
// getting all the cpus of system
let totalcpu = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < totalcpu; i++) {
    cluster.fork();
  }
} else {
  console.log(process.pid);
  app.get("/", (req, res) => {
    res.send("hello world "+ process.pid);
  });
  app.listen(8000, () => {
    console.log("listening on port 8000");
  });
}
