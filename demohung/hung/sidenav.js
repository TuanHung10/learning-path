window.addEventListener("click", (event) => {
  handleClickOutsideNav(event);
});

function openLeftNav() {
  const overlayEle = document.querySelector(".overlay");

  document.getElementById("leftSidenav").style.width = "400px";
  overlayEle.classList.toggle("active");
  setTimeout(() => {
    overlayEle.dataset.status = "active";
  }, 200);
}

function openRightNav() {
  const overlayEle = document.querySelector(".overlay");

  document.getElementById("rightSidenav").style.width = "400px";
  overlayEle.classList.toggle("active");
  setTimeout(() => {
    overlayEle.dataset.status = "active";
  }, 200);
}

function closeNav() {
  const overlayEle = document.querySelector(".overlay");

  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("rightSidenav").style.width = "0";
  overlayEle.classList.toggle("active");
  overlayEle.removeAttribute("data-status");
}

function handleClickOutsideNav(event) {
  const sideNav = document.querySelector("#mySidenav");
  const sideNav2 = document.querySelector("#rightSidenav");
  const overlay = document.querySelector(".overlay");

  if (
    !sideNav.contains(event.target) &&
    overlay.classList.contains("active") &&
    overlay.dataset.status === "active"
  ) {
    closeNav();
  }
  if (
    !sideNav2.contains(event.target) &&
    overlay.classList.contains("active") &&
    overlay.dataset.status === "active"
  ) {
    closeNav();
  }
}
