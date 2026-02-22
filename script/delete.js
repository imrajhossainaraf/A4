function updateCounts() {
  const jobCards = document.querySelectorAll(".job-card");
  const total = jobCards.length;

  // update main total number
  document.querySelector("#total-jobs").textContent = total;

  // update "8 of 8 applications"
  document.getElementById("job-count-display").textContent =
    `${total} of ${total} applications`;
}

let deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.remove();
    updateCounts();
  });
});
