handleToggleVerticalInfo();

window.addEventListener("click", (event) => {
  handleClickOutsideNav(event);
});

function openNav(id) {
  const overlayEle = document.querySelector(".overlay");

  document.getElementById(id).classList.add("show");
  document.getElementsByTagName("body")[0].style.overflowY = "hidden";
  overlayEle.classList.toggle("active");
  setTimeout(() => {
    overlayEle.dataset.status = "active";
  }, 200);
}

function closeNav() {
  const overlayEle = document.querySelector(".overlay");
  const leftNav = document.getElementById("leftNav");
  const rightNav = document.getElementById("rightNav");

  if (leftNav.classList.contains("show")) {
    leftNav.classList.remove("show");
  }

  if (rightNav.classList.contains("show")) {
    rightNav.classList.remove("show");
  }

  document.getElementsByTagName("body")[0].style.overflowY = "auto";
  overlayEle.classList.toggle("active");
  overlayEle.removeAttribute("data-status");
}

function handleClickOutsideNav(event) {
  const leftSideNav = document.querySelector(".sidenav.left.show");
  const rightSideNav = document.querySelector(".sidenav.right.show");
  const overlay = document.querySelector(".overlay");

  if (
    ((leftSideNav && !leftSideNav.contains(event.target)) ||
      (rightSideNav && !rightSideNav.contains(event.target))) &&
    overlay.classList.contains("active") &&
    overlay.dataset.status === "active"
  ) {
    closeNav();
  }
}

function handleToggleVerticalInfo() {
  const chartElements = document.querySelectorAll(".fc-horizon .main");

  if (chartElements.length > 0) {
    for (let i = 0; i < chartElements.length; i++) {
      chartElements[i].addEventListener("click", (event) => {
        const parentEle = chartElements[i].parentElement;
        parentEle.classList.toggle("show");

        for (let j = 0; j < chartElements.length; j++) {
          const parentEle = chartElements[j].parentElement;
          if (i !== j) {
            parentEle.classList.remove("show");
          }
        }
      });
    }
  }
}
