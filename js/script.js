const menuButton = document.getElementById("menuButton");
const sideNav = document.getElementById("sideNav");

menuButton.addEventListener("click", function () {
  const isOpen = sideNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

function closeMenu() {
  sideNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
}

sideNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

const navLinks = sideNav.querySelectorAll('li a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");

function markCurrent(id) {
  navLinks.forEach(function (link) {
    link.classList.toggle("current", link.getAttribute("href") === "#" + id);
  });
}

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        markCurrent(entry.target.id);
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

const copyButton = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");

copyButton.addEventListener("click", function () {
  const email = copyButton.dataset.email;

  if (!navigator.clipboard) {
    copyStatus.textContent = "Copy is not available here. Please select the email instead.";
    return;
  }

  navigator.clipboard.writeText(email).then(
    function () {
      copyStatus.textContent = "Email copied";
    },
    function () {
      copyStatus.textContent = "Could not copy. Please select the email instead.";
    }
  );
});

document.getElementById("year").textContent = new Date().getFullYear();
