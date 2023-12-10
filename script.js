const theme_btn = document.querySelector("header img"),
  root_element = document.querySelector("body"),
  todo_Input = document.getElementById("todo"),
  todo_box = document.querySelector(".tasks_box"),
  todo_length = document.querySelector(".todo_numbers"),
  todo_states_btns = document.querySelectorAll(".todo_states small"),
  clear_complete = document.getElementById("clear");

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 500) {
    if (root_element.classList.contains("White_theme")) {
      root_element.style.backgroundImage = "url(images/bg-mobile-light.jpg)";
    } else {
      root_element.style.backgroundImage = "url(images/bg-mobile-dark.jpg)";
    }
  }
});

// Load_todos

let Load_todos = () => {
  if (localStorage.getItem("data")) {
    todo_box.innerHTML = localStorage.getItem("data");
  }
};

Load_todos();

// Store_todos

let Store_todos = () => {
  localStorage.setItem("data", todo_box.innerHTML);
};

// Change Theme
theme_btn.onclick = (e) => {
  root_element.classList.toggle("White_theme");
  if (root_element.classList.contains("White_theme")) {
    e.target.src = "images/icon-sun.svg";
    root_element.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
  } else {
    root_element.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
    e.target.src = "images/icon-moon.svg";
  }
};

// update_todo_length

let update_todo_length = () => {
  todo_length.textContent = todo_box.children.length;
};

update_todo_length();

// AddTodo function

let AddTodo = () => {
  let li = document.createElement("li");
  li.classList.add("task");

  //   img tag

  let img = document.createElement("img");
  img.src = "images/icon-cross.svg";

  // p Tag

  let p = document.createElement("p");
  p.classList.add("task_txt");
  p.textContent = todo_Input.value;

  // circle

  let span = document.createElement("span");
  span.classList.add("circle");

  li.appendChild(span);
  li.appendChild(p);
  li.appendChild(img);
  todo_box.appendChild(li);

  update_todo_length();
  Store_todos();
};

// Keyboard functions

todo_Input.onkeydown = (e) => {
  if (todo_Input.value === "") return;
  else {
    if (e.key === "Enter") {
      AddTodo();
    }
  }
};

// Mouse Events

todo_box.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("task")) {
    e.target.lastElementChild.style.visibility = "visible";
  }
});

todo_box.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("task")) {
    setTimeout(() => {
      e.target.lastElementChild.style.visibility = "hidden";
    }, 3000);
  }
});

//   remove todo

todo_box.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    update_todo_length();
    Store_todos();
  }
  if (e.target.tagName === "SPAN") {
    e.target.classList.toggle("checked");
    Store_todos();
  }
});

window.addEventListener("load", () => {
  Load_todos();
});

todo_states_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let active of todo_states_btns) {
      active.classList.remove("active");
      clear_complete.classList.remove("active");
    }
    btn.classList.add("active");
    let filter_type = btn.dataset.filter;
    todo_box.querySelectorAll(".task").forEach((filter) => {
      let iscomplete = filter
        .querySelector("span")
        .classList.contains("checked");

      if (
        filter_type === "All" ||
        (filter_type === "Active" && !iscomplete) ||
        (filter_type === "Completed" && iscomplete)
      ) {
        filter.style.display = "flex";
      } else {
        filter.style.display = "none";
      }
    });
  });
});

clear_complete.addEventListener("click", () => {
  todo_box.querySelectorAll(".task").forEach((clear) => {
    let Completed = clear.querySelector("span").classList.contains("checked");

    // Remove "active" class from all buttons
    todo_states_btns.forEach((active) => {
      active.classList.remove("active");
    });

    // Add "active" class to the clicked button
    clear_complete.classList.add("active");

    if (Completed) {
      clear.remove();
      update_todo_length();
      Store_todos();
    }
  });
});
