import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "@pages/LandingPage";
import Layout from "@components/Layout";
import Login from "@pages/Login";
import Projects from "@pages/Projects";
import AddProject from "@pages/Projects/AddProject";
import YourProjects from "@pages/Projects/YourProjects";
import ProjectDetail from "@pages/Projects/ProjectDetail";
import LinkAddress from "@pages/LinkAddress";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="all-projects" element={<Projects />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="your-projects" element={<YourProjects />} />
          <Route path="project-detail/:name" element={<ProjectDetail />} />
          <Route path="link" element={<LinkAddress />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
