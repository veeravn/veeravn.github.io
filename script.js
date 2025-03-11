document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio website loaded successfully!");

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll(".card");
    projectCards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "transform 0.3s ease-in-out";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});
