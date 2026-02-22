let interviewButtons = document.querySelectorAll(".interview");
let rejectedButtons = document.querySelectorAll(".rejected");
let actionButtons = document.querySelectorAll(".interview, .rejected");

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let card = button.closest(".job-card");

    if (button.classList.contains("interview")) {
      card.dataset.status = "interview";
    } else {
      card.dataset.status = "rejected";
    }

    updateStats(); // 🔥 update counter
  });
});
function updateStats() {
  let allCards = document.querySelectorAll(".job-card");

  let interviewCount = 0;
  let rejectedCount = 0;

  allCards.forEach((card) => {
    if (card.dataset.status === "interview") {
      interviewCount++;
    }

    if (card.dataset.status === "rejected") {
      rejectedCount++;
    }
  });

  // Update numbers in UI
  document.querySelector("#stat-interview .stat-number").textContent =
    interviewCount;

  document.querySelector("#stat-rejected .stat-number").textContent =
    rejectedCount;
}
