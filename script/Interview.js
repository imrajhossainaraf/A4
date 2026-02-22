let interview = document.querySelectorAll(".interview");
let reject = document.querySelectorAll(".rejected");

interview.forEach((button) => {
  button.addEventListener("click", () => {
    // Find the containing job card
    let card = button.closest(".job-card");

    // Hide the card-footer within this card
    button.parentElement.style.display = "none";

    // Find the status element within this card
    let status = card.querySelector(".status-add");
    if (status) {
      status.classList.add("not-applied");
      status.textContent = "Interview Scheduled";
    }
  });
});

reject.forEach((button) => {
  button.addEventListener("click", () => {
    // Find the containing job card
    let card = button.closest(".job-card");

    // Hide the card-footer within this card
    button.parentElement.style.display = "none";

    // Find the status element within this card
    let status2 = card.querySelector(".status-add2");
    if (status2) {
      status2.classList.add("not-applied");
      status2.textContent = "Rejected";
    }
  });
});
const jobCards = document.querySelectorAll(".job-card");
const total = jobCards.length;

console.log(total);
let filterAll = document.getElementById("filter-all");
let filterInterview = document.getElementById("filter-interviewing");
let filterRejected = document.getElementById("filter-rejected");

let cards = document.querySelectorAll(".job-card");

// Show ALL
filterAll.addEventListener("click", () => {
  cards.forEach((card) => {
    card.style.display = "block";
  });
});

// Show only INTERVIEW
filterInterview.addEventListener("click", () => {
  cards.forEach((card) => {
    if (card.dataset.status === "interview") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Show only REJECTED
filterRejected.addEventListener("click", () => {
  cards.forEach((card) => {
    if (card.dataset.status === "rejected") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
