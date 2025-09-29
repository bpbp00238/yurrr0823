import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdOKhrvlWwrplnDP5-Sl45qBzkNL4SP-c",
  authDomain: "mb0p9nn-rui-nan-3487f.firebaseapp.com",
  projectId: "mb0p9nn-rui-nan-3487f",
  storageBucket: "mb0p9nn-rui-nan-3487f.appspot.com",
  messagingSenderId: "263397082769",
  appId: "1:263397082769:web:323e394be74b65c1a62130"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messagesContainer");

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text) {
    await addDoc(collection(db, "mt00000"), {
      text: text,
      timestamp: serverTimestamp()
    });
    messageInput.value = "";
  }
});


const q = query(collection(db, "mt00000"), orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => {
  messagesContainer.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
      <p>${data.text}</p>
      <div class="timestamp">${data.timestamp?.toDate().toLocaleString() || "剛剛"}</div>
    `;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
});