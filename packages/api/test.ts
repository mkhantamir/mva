// import fs from "fs";
// import https from "https";
// import { v4 as uuidv4 } from "uuid";
// import { Player, Team, connectDatabase } from "@mva/backend";

import { Player, Vote, connectDatabase } from "@mva/backend";

// const files = fs.readdirSync("./avatars");

// const ACCESS_KEY = "60e46042-23ae-4b8d-98ca48e93fdc-52db-49f1";

// const uploadFile = async (filename, name) => {
//   const readStream = fs.createReadStream(`./avatars/${filename}`);

//   const options = {
//     method: "PUT",
//     host: "storage.bunnycdn.com",
//     path: `/mesa/volleyball/2023/avatars/${name}`,
//     headers: {
//       AccessKey: ACCESS_KEY,
//       "Content-Type": "application/octet-stream",
//     },
//   };

//   const req = https.request(options, (res) => {
//     res.on("data", (chunk) => {});
//   });

//   req.on("error", (error) => {
//     console.error(error);
//   });

//   readStream.pipe(req);
// };

// const main = async () => {
//   await connectDatabase();
//   files.map(async (file) => {
//     const team_name = file.split("-")[0];
//     const number = file.split("-")[1].split(".")[0];

//     const team = await Team.findOne({ shortname: team_name });
//     const player = await Player.findOne({ team_id: team._id, number });
//     if (!player) {
//       console.log(team_name, number);
//       // const uuid = uuidv4();
//       // const filename = `${uuid}-${player._id}.jpeg`;
//       // await uploadFile(file, filename);
//       // await Player.findByIdAndUpdate(
//       //   player._id,
//       //   { avatar: filename },
//       //   { new: true }
//       // );
//       // console.log("done", team.shortname, player.number);
//     }
//   });
// };

// main();

(async () => {
  await connectDatabase();
})();
