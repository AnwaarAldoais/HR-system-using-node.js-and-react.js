var express = require("express");
var app = express();
var cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const msql = require("mysql");
const jwt = require("jsonwebtoken");
var random = "random" + Math.random().toString() + "jsonwebtoken";
const { json } = require("body-parser");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: random,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/createUser", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (req.body.password == confirmPassword) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
      }
      // console.log(hash);
      db.query(
        "INSERT INTO users (username , password ) VALUES (?,?)",
        [username, hash],
        (err, result) => {
          if (result) {
            res.send({
              msg: "User Registed Successfully !! Now Login with your user ",
            });
          } else {
            res.send({ msg: "User is already exsited !!" });
          }
        }
      );
    });
  } else {
    res.send({ msg: "The passwords should be  !! " });
  }
});

app.get("/getusers", (req, res) => {
  db.query("SELECT * FROM users WHERE isdeleted = 0", (err, result) => {
    res.send(result);
  });
});

const db = msql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "hr",
  port: "3306",
  multipleStatements: true,
});

const verifyJWT = (req, res, next) => {
  const token = req.headers.token;
  const user = req.cookies["auth_id"];
  const userToken = [];
  db.query(
    `SELECT * FROM tokens WHERE accounts_id = ${user}`,
    (err, result) => {
      if (result) userToken = result[0].token;
      console.log(result);
    }
  );
  if (!token) {
    res.send("you are not authenticate");
  } else {
    jwt.verify(token, userToken, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticate !!" });
      } else {
        req.userId = decoded.id;
        res.send(token);
        next();
      }
    });
  }
};
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(Math.random().toString());

  db.query(
    "SELECT * FROM users WHERE username = ? ",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const accesstoken = jwt.sign(
              { id: result[0].id },
              "random" + random + "jsonwebtoken",

            );

            // let options = {
            //   path: "/",
            //   sameSite: true,
            //   maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
            //   httpOnly: true, // The cookie only accessible by the web server
            // };

            // res.cookie("x-access-token", accesstoken, options);
            // res.cookie("auth_id", result[0].id, options);
            // // req.session.user = result;
            // console.log({ username: result[0].username, accesstoken });

            db.query(
              `INSERT INTO tokens (token , accounts_id) VALUES (?,?)`,
              [accesstoken, result[0].id],
              (err, result) => {
                if (err) throw err;
              }
            );

            res.json({
              auth: true,
              token: accesstoken,
              id: result[0].id,
              user: result[0].username,
              result: result,
            });

          } else {
            res.json({ auth: false, msg: "Wrong username Or password !!" });
          }
        });
      } else {
        res.json({ auth: false, msg: "User dosenot exist !! " });
      }
    }
  );
});


app.post("/attend/:user", (req, res) => {
  const user = req.params.user;
  const times = req.body.ctime;
  db.query(
    `INSERT INTO attendance (attend_time , employees_id) VALUES (?,?)`,
    [times, user],
    (err, result) => {
      if (err) throw err;
      res.json({ result: result });
    }
  );

  console.log(times);
});

app.get("/isAttend/:userId", (req, res) => {
  const user = req.params.userId;
  const date = req.body.curdate;
  console.log(date);

  db.query(
    `SELECT * FROM attendance WHERE employees_id ="${user}" AND DATE_FORMAT(created_at,'%M  %d, %Y') = "${date}"`,
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.send(result);
        console.log(result);
      } else {
        res.json({ enable: false });
        console.log("hkhkhk");
      }
    }
  );
});

function roles() {
  var roleArr = [];
  // const data = {};
  roleArr = db.query(`SELECT * FROM roles`, (err, result) => {
    // Object.keys(result).forEach(function (key) {
    //   var row = result[key];
    //   data.role = row.name;
    //   data.url = row.url;
    //   roleArr.push(data);
    // });
    console.log(result);
  });
  console.log(roleArr);
}

// app.get("/roles/:roleId", (req, res) => {
//   const roleId = req.params.roleId;
//   db.query(`SELECT * FROM roles WHERE users_id = ${roleId}`, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//     // console.log(roleId);
//   });
// });

app.get("/isAuth", verifyJWT, (req, res) => {
  res.json({ auth: true });
});
/*** End Login Function */
// Departement Functions

app.post("/addDepartement/:userId", (req, res) => {
  const dept = req.body.departement;
  const user = req.params.userId;

  db.query(
    "INSERT INTO departements (name ,users_id) VALUES (?,?)",
    [dept, user],
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "User is already exsited !!" });
      }
    }
  );
});

app.get("/getdepts", (req, res) => {
  db.query("SELECT * FROM departements WHERE isdeleted = 0", (err, result) => {
    res.send(result);
  });
  // roles();
});

// Shifts Functions

app.post("/addShift", (req, res) => {
  const shift = req.body.shift;

  db.query("INSERT INTO shifts (shift) VALUES (?)", [shift], (err, result) => {
    if (result) {
      res.send({
        msg: "Added Successfully !!",
      });
    } else {
      res.send({ msg: "Error !!" });
    }
  });
});

app.get("/getshifts", (req, res) => {
  db.query("SELECT * FROM shifts WHERE isdeleted = 0", (err, result) => {
    res.send(result);
  });
});
app.post("/getshifttimes/:shid", (req, res) => {
  const shiftid = req.params.shid;
  db.query(
    `SELECT * FROM  shifttimes WHERE  shifts_id =${shiftid}  and isdeleted = 0`,
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/", (req, res) => { });

// Activities Functions

app.post("/addNewActivity", (req, res) => {
  const activity = req.body.activity;
  const user = req.body.user;

  db.query(
    "INSERT INTO activities (activity , users_id) VALUES (?,?)",
    [activity, user],
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "Error !!" });
      }
    }
  );
});

app.get("/getAllActivities", (req, res) => {
  db.query("SELECT * FROM activities WHERE isdeleted = 0 ", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  const token = req.body.token;
  console.log(token);
});

/** Shift and Times Functions */
function getTimes(id) {
  console.log(id);
  var array = [];
  db.query(
    `SELECT * FROM shifttimes WHERE shifts_id = ${id}`,
    (err, result) => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          array.push(result[i]);
        }
      }
    }
  );
  return array;
}

app.get("/getshifts", (req, res) => {
  db.query("SELECT * FROM shifts WHERE isdeleted = 0", (err, result) => {
    res.send(result);
  });
});
app.get("/getshift/:id", (req, res) => {
  const id = req.params.id;
  const timesArray = getTimes(id);
  db.query(`SELECT * FROM shifts WHERE id = ${id}`, (err, result) => {
    res.json({ shifts: result, times: timesArray });
  });
});
app.get("/deleteShift/:id", (req, res) => {
  db.query(
    `UPDATE shifts SET isdeleted = 1  WHERE id = ${req.params.id}`,
    (err, result) => {
      res.send(result);
    }
  );
});
app.get("/getTimes/:id", (req, res) => {
  const shiftid = req.params.id;
  db.query(
    `SELECT * FROM  shifttimes WHERE shifts_id =${shiftid}  and isdeleted = 0`,
    (err, result) => {
      res.send(result);
    }
  );
});
app.post("/editShift", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  console.log(name);
  db.query(
    `UPDATE shifts SET shift = ? WHERE id = ?`,
    [name, id],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/addtimes/:shid", (req, res) => {
  const shiftId = req.params.shid;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const lateTime = req.body.lateTime;
  db.query(
    "INSERT INTO shifttimes (shifts_id ,start_time,end_time,late_time) VALUES (?,?,?,?)",
    [shiftId, startTime, endTime, lateTime],
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

/** End Shifts and Times Functions */
/**Start Official hoildays functions  */
app.post("/addOfficialHolidays", (req, res) => {
  const name = req.body.holiday;
  const date = req.body.holidayDate;
  const year = req.body.holidayYear;
  const static = req.body.isStatic;
  const userId = req.body.userId;

  db.query(
    "INSERT INTO official_holidays (name ,date,year,users_id,is_static) VALUES (?,?,?,?,?)",
    [name, date, year, userId, static],
    (err, resulte) => {
      if (err) throw err;
      res.send(resulte);
    }
  );
});
app.post("/updateOfficialHoliday/:userId", (req, res) => {
  const Ename = req.body.editHoliday;
  const Edate = req.body.editHolidayDate;
  const Eyear = req.body.editHolidayYear;
  const statics = req.body.isStatic;
  const userId = req.params.userId;
  const id = req.body.id;

  console.log(userId);
  db.query(
    "UPDATE official_holidays SET name = ? , date = ? , year = ? , users_id = ?, is_static = ? WHERE id = ?",
    [Ename, Edate, Eyear, userId, statics, id],
    (err, resulte) => {
      if (err) throw err;
      res.send(resulte);
    }
  );
});

app.get("/getOfficialHolidays", (req, res) => {
  db.query(
    "SELECT * FROM official_holidays WHERE isdeleted = 0 ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.get("/getOfficialHoliday/:id", (req, res) => {
  const holId = req.params.id;
  db.query(
    `SELECT * FROM official_holidays WHERE isdeleted = 0 AND id =${holId} `,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/deleteOfficialHoliday/:id", (req, res) => {
  db.query(
    `UPDATE official_holidays SET isdeleted = 1 , users_id = ${req.body.user}  WHERE id = ${req.params.id}`,
    (err, result) => {
      res.send(result);
    }
  );
});
/**End Official hoildays functions  */

/**Start General hoildays functions  */
app.post("/addGeneralHolidays", (req, res) => {
  const name = req.body.holiday;
  const stock = req.body.stock;

  const userId = 80;

  db.query(
    "INSERT INTO holidays_types (name ,period,users_id) VALUES (?,?,?)",
    [name, stock, userId],
    (err, resulte) => {
      if (err) throw err;
      res.send(resulte);
    }
  );
});

app.get("/getGeneralHoliday/:id", (req, res) => {
  const holId = req.params.id;
  db.query(
    `SELECT * FROM holidays_types  WHERE isdeleted = 0 AND id =${holId} `,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.post("/updateGeneralHoliday/:id", (req, res) => {
  const name = req.body.name;
  const stock = req.body.stock;
  const userId = req.body.user;
  const id = req.params.id;

  db.query(
    "UPDATE holidays_types SET name = ? , period = ?  , users_id = ?  WHERE id = ?",
    [name, stock, userId, id],
    (err, resulte) => {
      if (err) throw err;
      res.send(resulte);
    }
  );
});

app.get("/deleteGeneralHoliday/:id", (req, res) => {
  db.query(
    `UPDATE  holidays_types SET isdeleted = 1 , users_id = ${req.body.user} WHERE id = ${req.params.id}`,
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/getGeneralHolidays", (req, res) => {
  db.query(
    "SELECT * FROM holidays_types WHERE isdeleted = 0 ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

/**End General hoildays functions  */

/**Start jops functions  */
app.post("/addJob", (req, res) => {
  const job = req.body.job;
  const group = req.body.groupId;
  const userId = 80;

  db.query(
    "INSERT INTO jobs (name,employee_groups_id,users_id) VALUES (?,?,?)",
    [job, group, userId],
    (err, resulte) => {
      if (err) throw err;
      res.send(resulte);
    }
  );
});
app.get("/getJobs", (req, res) => {
  db.query("SELECT * FROM jobs  WHERE isdeleted = 0 ", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/**End jobs functions  */
/**Start groups functions  */
app.post("/addGroup", (req, res) => {
  const group = req.body.group;
  const userId = req.body.user;

  db.query(
    "INSERT INTO employee_groups (name,users_id) VALUES (?,?)",
    [group, userId],
    (err, resulte) => {
      if (err) throw err;
      res.send(resulte);
    }
  );
});

app.get("/getGroups", (req, res) => {
  db.query(
    "SELECT * FROM employee_groups  WHERE isdeleted = 0 ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/getGroup/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM employee_groups WHERE id = ${id}`, (err, result) => {
    res.send(result);
  });
});

app.post("/editGroup", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const user = req.body.user;
  db.query(
    `UPDATE employee_groups SET name = ? , users_id = ? WHERE id = ?`,
    [name, user, id],
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/deleteGroup/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body.user;
  console.log(user);
  db.query(
    `UPDATE employee_groups SET isdeleted = 1 , users_id = ? WHERE id = ? `,
    [user, id],
    (err, result) => {
      res.send(result);
      console.log(result);
    }
  );
});

// Official Holidays functions
app.get("/getOfficialHoliday/:id", (req, res) => {
  const holId = req.params.id;
  db.query(
    `SELECT * FROM official_holidays WHERE isdeleted = 0 AND id =${holId} `,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
/**End jobs functions  */

app.post("/addTodoItem/:userId", (req, res) => {
  const todo = req.body.todo;
  const user = req.params.userId;

  db.query(
    "INSERT INTO todolists (todo , users_id) VALUES (?,?)",
    [todo, user],
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "Error" });
      }
    }
  );
});

app.get("/getTodoList/:userId", (req, res) => {
  const user = req.params.userId;
  db.query(
    `SELECT * FROM todolists WHERE users_id = ${user} AND isdeleted = 0`,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/doneItem/:id", (req, res) => {
  const id = req.params.id;
  db.query(`UPDATE todolists SET status = `);
});
app.post("/deleteItem/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    `UPDATE todolists SET isdeleted = 1 WHERE id= ${id} `,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});
/**toDoList functions */

/** Attendance reports functions  */
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(
      date.getFullYear() +
      "-" +
      (date.getMonth() < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate())
    );
    date.setDate(date.getDate() + 1);
  }
  return days;
}
app.post("/attendanceReport", (req, res) => {
  const emp = req.body.emp;
  const month = req.body.month;
  const year = req.body.year;
  const cMonth = month - 1;

  const arr = getDaysInMonth(cMonth, year);

  db.query(
    `SELECT * FROM attendance WHERE DATE_FORMAT(created_at,'%Y-%m-%d') BETWEEN  "${arr[0]
    }" AND "${arr[arr.length - 1]}" AND employees_id = "${emp}"`,
    (err, result) => {
      if (result) {
        result.forEach((e) => {
          e.attend = true;
        });
        console.log(result);
        res.json({ result: result, monthArray: arr });
      } else {
        throw err;
      }
    }
  );

  //console.log(attendArray);
});
/** Attendance reports functions  */
db.getConnection((err, conn) => {
  if (err) throw err;
  console.log("DB Connectin thread id is : " + conn.threadId);
});

app.listen(3001, () => {
  console.log("Running form port 3001 !! ");
});
/*Anwaar Side */
//attendance 
//get employees who dont marked attend attendance.leave_time,
app.get("/getAttendance", (req, res) => {
  db.query("SELECT employees.id,employees.name,attendance.attend_time,departements.name AS dname FROM employees join departements on departements.id=employees.departements_id left join attendance on employees.id=attendance.employees_id where employees.id NOT IN( SELECT DISTINCT employees_id FROM attendance where created_at!=CURRENT_DATE)", (err, result) => {
    res.send(result);
  });
});
//add employees who  marked attend
app.post("/addAttend", (req, res) => {
  const user = req.body._users;
  for (var i = 0; i < user.length; i++) {
   
    db.query(
      "INSERT INTO attendance ( attend_time, leave_time, users_id, employees_id) VALUES (?, ?, ?,?)",
      [user[i]['attend_time'], '00:00', 1, user[i]['id']],
      (err, result) => {
        if (result) {
          res.send({
            msg: "Added Successfully !!",
          });
        } else {
          res.send({ msg: "employee is already marked attend !!" });
        }
      }
    );
  }
});
//get monthly employees reports
app.get("/getHrMonthReport", (req, res) => {
  db.query("", (err, result) => {
    res.send(result);
  });
});
//sections

app.get("/getSections", (req, res) => {
  db.query("SELECT dept.id AS d_id,sect.id AS id,sect.name AS sname,dept.name AS dname FROM sections sect join departements dept on sect.dept_id=dept.id WHERE sect.isDeleted = 0", (err, result) => {
    res.send(result);
  });
});

app.post("/addSection", (req, res) => {
  const dept = req.body.department;
  const section = req.body.section;
  db.query(
    "INSERT INTO  sections (dept_id,name,users_id) VALUES (?,?,?)",
    [dept, section, 1],
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "Section is already exsited !!" });
      }
    }
  );
});
app.post("/updateSection", (req, res) => {
  const id = req.body.id;
  const dept = req.body.department;
  const section = req.body.section;
  const userid = 1;

  db.query(
    "UPDATE sections set dept_id=?,name=?,user_id=? where id=?",
    [dept, section, id, userid],
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "Section is already exsited !!" });
      }
    }
  );
});

app.post("/getSectionsByid", (req, res) => {
  const deptid = req.body.dept;
  db.query("SELECT * FROM sections WHERE isdeleted = 0 AND dept_id=" + deptid + "", (err, result) => {
    res.send(result);
  });
});
app.post("/deleteSection", (req, res) => {
  const id = req.body.sId;
  db.query("DELETE FROM sections WHERE isDeleted=0 AND Id=" + id + "", (err, result) => {
    res.send(err);
  });
});


//Holiday Request                 
app.post("/addholreq", (req, res) => {
  const deptid = req.body.dept;
  const userid = req.body.user;
  const holid = req.body.holtype;
  const fdate = req.body.from;
  const tdate = req.body.to;
  db.query(
    "INSERT INTO holidays (useres_id,employees_id, fromdate, todate, useraccept_id,holidays_types_id, depratements_id) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
    [userid,userid,fdate,tdate,1,holid,deptid],
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "Request is already exsited !!" });
      }
    }
  );
});
app.post("/reqstate", (req, res) => {
  const id = req.body.holid;
  const empid = req.body.empid;
  const holtotal=req.body.total;
  const totalres=req.body.totalrest;
  db.query(
    "UPDATE holidays set state=1 where id="+ id+ "",
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "Request is already exsited !!" });
      }
    }
  );
  postHol(id,empid,holtotal,totalres);
});
const postHol=(id,empid,holtotal,totalres) => {
  db.query(
    "INSERT INTO holidays_stocks ( holidays_id, emp_id, holidays_total, total_rest) VALUES (?, ?, ?, ?)",
    [id,empid,holtotal,totalres],
    (err, result) => {
      if (err) throw err;
    }
  );

};
app.get("/getHolReqs", (req, res) => {
  db.query("SELECT hol.id as id,emp.id AS eid,emp.name AS ename ,dept.name AS dname,DATE_FORMAT(hol.fromdate,'%Y-%m-%d') AS fdate,DATE_FORMAT(hol.todate,'%Y-%m-%d') AS tdate,holtypes.name AS holtype ,holtypes.period AS total FROM holidays hol join employees emp on hol.employees_id=emp.id join departements dept on hol.depratements_id=dept.id join holidays_types holtypes on hol.holidays_types_id=holtypes.id WHERE hol.state=0", (err, result) => {
    res.send(result);
  });
});
app.get("/getHolStock", (req, res) => {
  db.query("SELECT hol.id as id,emp.id AS eid,emp.name AS ename ,stock.id AS stockid,DATE_FORMAT(hol.fromdate,'%Y-%m-%d') AS fdate, DATE_FORMAT(hol.todate,'%Y-%m-%d') AS tdate,holtype.name AS holtype,stock.holidays_total AS total,stock.total_rest AS holrest FROM holidays hol join employees emp on hol.employees_id=emp.id join holidays_stocks stock on hol.id=stock.holidays_id join holidays_types holtype on hol.holidays_types_id=holtype.id WHERE hol.state=0", (err, result) => {
    res.send(result);
  });
});
app.get("/getholtype", (req, res) => {
  db.query("select * from holidays_types", (err, result) => {
    res.send(result);
  });
});

//
//employees
app.get("/getEmps", (req, res) => {
  db.query("SELECT emp.id AS id,emp.name AS ename,dept.name As dname,gr.name AS gname,job.name AS jname,emptype.name AS tname,wh.fromtime AS fWH,wh.totime AS tWH FROM employees emp join departements dept on emp.departements_id =dept.id join employee_groups gr on emp.employee_groups_id=gr.id join jobs job on emp.jobs_id=job.Id join employment_types emptype on emp.employee_type_id=emptype.id join working_hours wh on emp.working_hours_id=wh.id", (err, result) => {
    res.send(result);
  });
});
app.get("/getEmpsList", (req, res) => {
  db.query("SELECT emp.id AS id,emp.name AS ename FROM employees emp", (err, result) => {
    res.send(result);
  });
});
app.get("/getJobs", (req, res) => {
  db.query("SELECT * from jobs", (err, result) => {
    res.send(result);
  });
});
app.get("/getGroups", (req, res) => {
  db.query("SELECT * from employee_groups", (err, result) => {
    res.send(result);
  });
});
app.get("/getEmpTypes", (req, res) => {
  db.query("SELECT * from employment_types", (err, result) => {
    res.send(result);
  });
});
app.post("/addEmp", (req, res) => {
  const name = req.body.name;
  const deptid = req.body.dept;
  const jobid = req.body.job;
  const grpid = req.body.grp;
  const typid = req.body.typ;
  const hiredate=req.body.hdate;
  db.query(
    "INSERT INTO employees (name, departements_id, employee_groups_id, working_hours_id, jobs_id, hiredate, employee_type_id, users_id) VALUES (?,?, ?, ?, ?,?,?, ?)",
    [name,deptid,grpid,1,jobid,hiredate,typid,1],
    (err, result) => {
      if (result) {
        res.send({
          msg: "Added Successfully !!",
        });
      } else {
        res.send({ msg: "Request is already exsited !!" });
    }
    }
  );
});

/** Attendance reports functions  */
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(
      date.getFullYear() +
        "-" +
        (date.getMonth() < 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        "-" +
        (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate())
    );
    date.setDate(date.getDate() + 1);
  }
  return days;
}
app.post("/attendanceReport", (req, res) => {
  const emp = req.body.emp;
  const month = req.body.month;
  const year = req.body.year;
  const cMonth = month - 1;
  const attendArray = [];
  var rv = {};
  const arr = getDaysInMonth(cMonth, year);
//AND employees_id = "${emp}"
  db.query(
    `SELECT * FROM attendance  join employees on attendance.employees_id=employees.id WHERE DATE_FORMAT(attendance.created_at,'%Y-%m-%d') BETWEEN  "${
      arr[0]
    }" AND "${arr[arr.length - 1]}" AND employees_id = "${emp}" `,
    (err, result) => {
      if (result) {
        result.forEach((e) => {
          e.attend = true;
        });
        res.json({ result: result, monthArray: arr });
      } else {
        throw err;
      }
    }
  );

});
/** Attendance reports functions  */
/* */