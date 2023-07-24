require('dotenv').config();
const path = require("path");
const CronJob = require("cron").CronJob;

const express = require("express");
const app = express();
const sequelize = require("./connect");
const bodyParser = require("body-parser");
const cors = require('cors');


const User = require('./models/user');
const GroupChat = require('./models/groupChat');
const Groups = require('./models/groups');
const ArchivedChat = require('./models/archievedChat');

const userRoutes = require('./routes/user');
const groupChat = require('./routes/groupChat');
const adminRoutes = require('./routes/adminRoutes');

const http = require("http").createServer(app);
const io = require("socket.io")(http);



// app.use(cors());
app.use(cors({
	origin: "*" // using "*" to give access to all
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "Frontend")));
io.on("connection", (socket) => {
  try {
    socket.on("message", (msg, username,id) => {
      socket.broadcast.emit("message", msg, username,id);
    });
    socket.on("file", (msg, username,id) => {
      console.log("file")
      socket.broadcast.emit("file", msg, username,id);
    });
  } catch (err) {
    console.log(err);
  }
});


app.use(userRoutes);
app.use(groupChat);
app.use(adminRoutes);

User.hasMany(GroupChat);
GroupChat.belongsTo(User);

User.hasMany(Groups);
Groups.belongsTo(User);
 
app.use((req, res) => {
	res.sendFile(path.join(__dirname + "/Frontend/" + req.url));
  });
  const job = new CronJob(
	"0 36 3 * * *",
	async function () {
	  const t = await sequelize.transaction();
  
	  try {
		const data = await GroupChat.findAll();
		data.forEach(async (element) => {
		  await ArchivedChat.create(
			{
			  groupid: element.groupid,
			  massage: element.massage,
			  name: element.name,
			  userId: element.userId,
			  type:element.type
			},
			{ transaction: t }
		  );
		});
		await GroupChat.destroy({ where: {} }, { transaction: t });
		await t.commit();
	  } catch (err) {
		await t.rollback();
  
		console.log(err);
	  }
	},
	null,
	true
  );


sequelize.sync().then(() => {
	http.listen(process.env.DB_PORT);
}
).catch((err) => {
	console.log(err);
});