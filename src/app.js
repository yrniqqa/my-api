import express    from "express";
import cors       from "cors";
import helmet     from "helmet";
import morgan     from "morgan";
import authRoutes    from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import blogRoutes    from "./routes/blogRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://my-portfolio-git-main-abraham-s-projects10.vercel.app",
    "YOUR-MY-ADMIN-URL-HERE.vercel.app",
  ],
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth",     authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs",    blogRoutes);
app.use("/api/messages", messageRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
