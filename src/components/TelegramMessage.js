import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";
import {
  addtodoo,
  deletetodoo,
  gettodo,
  putiscompleted,
  puttodoo,
  sendTelegramMessage,
} from "../request/todorequest";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import { Button, Container, Grid } from "@mui/material";

function TelegramMessage() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
  });

  useEffect(() => {
    gettodo()
      .then((request) => {
        setTodos(request);
      })
      .catch(() => "");
  }, []);

  const addTodo = (todo) => {
    addtodoo(todo)
      .then((request) => {
        console.log(request);
        window.location.href = "/";
      })
      .catch(() => "");
  };

  const deleteTodo = (id) => {
    deletetodoo(id)
      .then((response) => {
        alert("Görev Silindi");
        window.location.href = "/";
      })
      .catch(() => "");
  };

  const toggleComplete = (id, value, task) => {
    const newvalue = !value;
    console.log(newvalue);
    putiscompleted(id, newvalue, task)
      .then((response) => {
        console.log(response);
      })
      .catch(() => "");
    window.location.href = "/";
  };

  const editTodo = () => {
    setEdit(true);
  };

  const editTask = (id, value) => {
    console.log(id, value);
    puttodoo(id, value)
      .then((response) => {
        window.location.href = "/";
      })
      .catch(() => "");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      clock: "",
      hours: 0,
      minutes: 0,
    },
    onSubmit: async (values) => {
      const { name, email, surname } = values;
      const botToken = "6854330105:AAEaBgamOQZGMeD0RBIKrpfPDPVdbPJI9EQ";
      const chatId = "700191775";
      const customMessage = `Yeni Mesaj:\nAd: ${name}\nE-surname: ${surname}\nMesaj: ${email}`;

      await sendTelegramMessage(botToken, chatId, customMessage);
    },
  });

  const scheduleMessage = () => {
    console.log("zamanlayıcı başladı.");
    const { hours, minutes } = formik.values;
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      formik.values.hours,
      formik.values.minutes,
      0
    ); // Set the time to 11:03
    console.log(scheduledTime);

    const timeUntilScheduled = scheduledTime - now;

    if (timeUntilScheduled > 0) {
      console.log("çalıştı");
      setTimeout(() => {
        formik.handleSubmit();
      }, timeUntilScheduled);
    } else {
      console.log("Scheduled time has already passed for today");
    }
  };

  return (
    <>
      <Grid container spacing={1} >
        <Grid item sx={12} md={6}  >
          <Container className="TodoWrapper">
            <h1>Get Things Done !</h1>
            <TodoForm addTodo={addTodo} />
            {/* display todos */}
            {todos.map((todo) =>
              edit ? (
                <EditTodoForm editTodo={editTask} task={todo} />
              ) : (
                <Todo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                />
              )
            )}
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box>
          </Container>
        </Grid>

        <Grid item sx={12} md={6}>
          <div className="TelegramWrapper">
            <h1 style={{ color: "black" }}>Get Things Done!</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-basic"
                  label="Outlined secondary"
                  name="name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  style={{ color: "white", borderColor: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  color="info"
                  id="filled-basic"
                  label="Soyisim"
                  name="surname"
                  variant="outlined"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="standard-basic"
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="standard-basic"
                  label="Saat"
                  name="clock"
                  variant="outlined"
                  value={formik.values.clock}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const [hours, minutes] = e.target.value.split(":");
                    formik.setFieldValue("hours", parseInt(hours)); // Convert to number, default to 0 if not a valid number
                    formik.setFieldValue("minutes", parseInt(minutes)); // Convert to number, default to 0 if not a valid number
                    console.log("Hours:", hours);
                    console.log("Minutes:", minutes);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Telegram'a Mesaj Gönder
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={scheduleMessage}
                >
                  Zamanlayıcıyı Başlat
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default TelegramMessage;
