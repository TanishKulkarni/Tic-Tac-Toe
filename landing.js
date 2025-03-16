document.addEventListener("DOMContentLoaded", function() {
    console.log("🎮 Landing Page Loaded");

    const playButton = document.querySelector(".play-now");
    playButton.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});
