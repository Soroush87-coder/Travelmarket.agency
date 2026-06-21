const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 18;
  const y = (e.clientY / window.innerHeight - 0.5) * 18;
  document.querySelectorAll(".mini-card").forEach((card, index) => {
    card.style.transform = `translate(${x * (index + 1) * 0.35}px, ${y * (index + 1) * 0.35}px)`;
  });
});

function sendRequest(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const lines = [
    "New Travel Market Request",
    "",
    `Name: ${data.get("name") || ""}`,
    `WhatsApp: ${data.get("whatsapp") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Nationality: ${data.get("nationality") || ""}`,
    `Destination: ${data.get("destination") || ""}`,
    `Dates: ${data.get("dates") || ""}`,
    `Travelers: ${data.get("travelers") || ""}`,
    `Budget: ${data.get("budget") || ""}`,
    `Notes: ${data.get("notes") || ""}`
  ];

  const subject = encodeURIComponent("Travel Market Request");
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:hello@travelmarket.ae?subject=${subject}&body=${body}`;
}
