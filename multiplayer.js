// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAw1cvees2fg6aph3pHeA_reVp0FL9Urs",
    authDomain: "tictactoe-2b4a1.firebaseapp.com",
    projectId: "tictactoe-2b4a1",
    storageBucket: "tictactoe-2b4a1.appspot.com",
    messagingSenderId: "973466790595",
    appId: "1:973466790595:web:e5ec434d4f01d93633d076"
};

// ✅ Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

let roomId = "";
let playerSymbol = "";
let opponentSymbol = "";
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// ✅ Debugging Check
console.log("🔥 Firebase Initialized");

// ✅ Create Room
document.getElementById("create-room").addEventListener("click", () => {
    roomId = "game-" + Math.random().toString(36).substring(7);
    console.log("✅ Room Created:", roomId);

    // ✅ Make Sure Room ID is Updated
    const roomIdElement = document.getElementById("room-id");
    if (roomIdElement) {
        roomIdElement.textContent = roomId;
    } else {
        console.error("❌ ERROR: #room-id not found in HTML!");
    }

    // ✅ Make Multiplayer Info Visible
    const multiplayerInfo = document.getElementById("multiplayer-info");
    if (multiplayerInfo) {
        multiplayerInfo.style.display = "block";
    } else {
        console.error("❌ ERROR: #multiplayer-info not found in HTML!");
    }

    startMultiplayerGame(roomId, "X");
});

// ✅ Join Room
document.getElementById("join-room").addEventListener("click", () => {
    const enteredRoomId = prompt("Enter Room ID:");
    if (enteredRoomId) {
        roomId = enteredRoomId;
        console.log("✅ Joining Room:", roomId);

        // ✅ Make Sure Room ID is Updated
        const roomIdElement = document.getElementById("room-id");
        if (roomIdElement) {
            roomIdElement.textContent = roomId;
        } else {
            console.error("❌ ERROR: #room-id not found in HTML!");
        }

        const multiplayerInfo = document.getElementById("multiplayer-info");
        if (multiplayerInfo) {
            multiplayerInfo.style.display = "block";
        } else {
            console.error("❌ ERROR: #multiplayer-info not found in HTML!");
        }

        startMultiplayerGame(roomId, "O");
    }
});
