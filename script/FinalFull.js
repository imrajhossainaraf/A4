function updateAllStats() {
  const jobCards = document.querySelectorAll(".job-card");
  const total = jobCards.length;

  let interviewCount = 0;
  let rejectedCount = 0;

  jobCards.forEach((card) => {
    if (card.dataset.status === "interview") {
      interviewCount++;
    } else if (card.dataset.status === "rejected") {
      rejectedCount++;
    }
  });

  document.querySelector("#stat-interview .stat-number").textContent =
    interviewCount;
  document.querySelector("#stat-rejected .stat-number").textContent =
    rejectedCount;
  document.querySelector("#total-jobs").textContent = total;

  const visibleCards = document.querySelectorAll(".job-card").length;
  document.getElementById("job-count-display").textContent =
    `${visibleCards} of ${total} applications`;

  showEmptyStateIfNeeded();
}

let currentFilter = "all";

function createEmptyStateElement() {
  let emptyState = document.getElementById("empty-state");
  if (!emptyState) {
    const emptyDiv = document.createElement("div");
    emptyDiv.id = "empty-state";
    emptyDiv.className = "empty-state";
    emptyDiv.style.textAlign = "center";
    emptyDiv.style.padding = "3rem 1rem";
    emptyDiv.style.display = "none";

    const img = document.createElement("img");
    img.src = "jobs.png";
    img.alt = "No jobs available";
    img.style.width = "200px";
    img.style.height = "auto";
    img.style.marginBottom = "1.5rem";
    img.style.opacity = "0.7";

    const text = document.createElement("p");
    text.textContent = "No available jobs";
    text.style.color = "#64748b";
    text.style.fontSize = "1.1rem";
    text.style.fontWeight = "500";

    emptyDiv.appendChild(img);
    emptyDiv.appendChild(text);

    const filterRow = document.querySelector(".filter-row");
    filterRow.insertAdjacentElement("afterend", emptyDiv);
  }
  return document.getElementById("empty-state");
}

function showEmptyStateIfNeeded() {
  const emptyState = createEmptyStateElement();
  const jobCards = document.querySelectorAll(".job-card");
  let visibleCount = 0;

  jobCards.forEach((card) => {
    if (card.style.display !== "none") {
      visibleCount++;
    }
  });

  if (visibleCount === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  const total = jobCards.length;
  document.getElementById("job-count-display").textContent =
    `${visibleCount} of ${total} applications`;
}

function applyCurrentFilter() {
  const cards = document.querySelectorAll(".job-card");
  let visibleCount = 0;

  if (currentFilter === "all") {
    cards.forEach((card) => {
      card.style.display = "block";
      visibleCount++;
    });
  } else if (currentFilter === "interview") {
    cards.forEach((card) => {
      if (card.dataset.status === "interview") {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });
  } else if (currentFilter === "rejected") {
    cards.forEach((card) => {
      if (card.dataset.status === "rejected") {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });
  }

  showEmptyStateIfNeeded();
}

const actionButtons = document.querySelectorAll(".interview, .rejected");

actionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const card = button.closest(".job-card");
    const footer = card.querySelector(".card-footer");
    const notAppliedBadge = card.querySelector(".not-applied");

    if (button.classList.contains("interview")) {
      card.dataset.status = "interview";
      notAppliedBadge.textContent = "INTERVIEW SCHEDULED";
      notAppliedBadge.style.background = "#e6f7ec";
      notAppliedBadge.style.borderColor = "#c2f0d1";
      notAppliedBadge.style.color = "#0e6245";
    } else {
      card.dataset.status = "rejected";
      notAppliedBadge.textContent = "REJECTED";
      notAppliedBadge.style.background = "#ffeae9";
      notAppliedBadge.style.borderColor = "#ffd1d0";
      notAppliedBadge.style.color = "#a12b2b";
    }

    footer.style.display = "none";

    updateAllStats();
    applyCurrentFilter();
  });
});

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const card = button.closest(".job-card");
    card.remove();

    updateAllStats();
    applyCurrentFilter();
  });
});

const filterAll = document.getElementById("filter-all");
const filterInterview = document.getElementById("filter-interviewing");
const filterRejected = document.getElementById("filter-rejected");

function setActiveFilter(activeElement) {
  [filterAll, filterInterview, filterRejected].forEach((filter) => {
    filter.classList.remove("active");
  });
  activeElement.classList.add("active");
}

filterAll.addEventListener("click", () => {
  currentFilter = "all";
  setActiveFilter(filterAll);
  applyCurrentFilter();
  updateAllStats();
});

filterInterview.addEventListener("click", () => {
  currentFilter = "interview";
  setActiveFilter(filterInterview);
  applyCurrentFilter();
  updateAllStats();
});

filterRejected.addEventListener("click", () => {
  currentFilter = "rejected";
  setActiveFilter(filterRejected);
  applyCurrentFilter();
  updateAllStats();
});

createEmptyStateElement();
updateAllStats();
