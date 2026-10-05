// ---------- DATA (arrays of objects) ----------
const skills = ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Python", "Java", "Git & GitHub", "SQL"];

const projects = [
  { title: "Portfolio Website", type: "web",    desc: "This responsive personal portfolio." },
  { title: "To-Do App",         type: "web",    desc: "Add and delete daily tasks in the browser." },
  { title: "Student Manager",   type: "python", desc: "Console app to store student records." },
  { title: "Library System",    type: "java",   desc: "Book issue and return system." }
];

// ---------- SKILLS: build badges with a loop ----------
const skillList = document.getElementById("skillList");
skills.forEach(skill => {
  const span = document.createElement("span");
  span.className = "skill-badge";
  span.textContent = skill;
  skillList.appendChild(span);
});

// ---------- PROJECTS: show cards, with filtering ----------
const grid = document.getElementById("projectGrid");

const showProjects = (filter) => {
  grid.innerHTML = "";
  const list = filter === "all" ? projects : projects.filter(p => p.type === filter);

  list.forEach(p => {
    grid.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title h5">${p.title}</h3>
            <p class="card-text">${p.desc}</p>
            <span class="badge bg-secondary">${p.type}</span>
          </div>
        </div>
      </div>`;
  });
};

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // highlight only the clicked button
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.remove("btn-primary");
      b.classList.add("btn-outline-primary");
    });
    btn.classList.remove("btn-outline-primary");
    btn.classList.add("btn-primary");
    showProjects(btn.dataset.filter);
  });
});
showProjects("all");

// ---------- THEME SWITCH (light / dark) ----------
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

const setTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  localStorage.setItem("theme", theme);   // remember the choice
};
setTheme(localStorage.getItem("theme") || "light");
themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ---------- FORM VALIDATION ----------
const form = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");

const showError = (id, msg) => {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "Error");
  input.classList.add("is-invalid");
  error.textContent = msg;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();               // stop the page from reloading
  formAlert.innerHTML = "";
  form.querySelectorAll(".form-control").forEach(i => i.classList.remove("is-invalid"));

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (name.length < 3) { showError("name", "Please enter at least 3 characters."); valid = false; }
  if (!emailPattern.test(email)) { showError("email", "Please enter a valid email, like you@example.com."); valid = false; }
  if (message.length < 10) { showError("message", "Message must be at least 10 characters."); valid = false; }

  if (valid) {
    formAlert.innerHTML = `<div class="alert alert-success">Thank you, ${name}! Your message was sent.</div>`;
    form.reset();
  } else {
    formAlert.innerHTML = `<div class="alert alert-danger">Please fix the errors below.</div>`;
  }
});
