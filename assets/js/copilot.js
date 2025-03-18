document.addEventListener("DOMContentLoaded", function () {
    let chatContainer = document.createElement("div");
    chatContainer.innerHTML = `
        <div id="copilot-chatbox" style="position: fixed; bottom: 20px; right: 20px; width: 300px; height: 400px; border-radius: 10px; background: white; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; display: none;">
            <div id="chat-header" style="background: #0078D4; color: white; padding: 10px; text-align: center; font-weight: bold; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <span>Veeravn Copilot</span>
                <button id="minimize-chat" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">&minus;</button>
            </div>
            <div id="chat-messages" style="flex-grow: 1; padding: 10px; overflow-y: auto; max-height: 320px;"></div>
            <input type="text" id="chat-input" placeholder="Ask me anything..." style="border: none; padding: 10px; width: 100%;">
        </div>
        <button id="open-chat" style="position: fixed; bottom: 20px; right: 20px; background: #0078D4; color: white; border: none; border-radius: 50px; padding: 12px 20px; font-size: 16px; cursor: pointer; box-shadow: 0px 4px 6px rgba(0,0,0,0.1);">💬 Chat</button>
    `;
    document.body.appendChild(chatContainer);

    let chatBox = document.getElementById("copilot-chatbox");
    let chatMessages = document.getElementById("chat-messages");
    let chatInput = document.getElementById("chat-input");
    let openChatButton = document.getElementById("open-chat");
    let minimizeChatButton = document.getElementById("minimize-chat");

    // Open chatbot
    openChatButton.addEventListener("click", function () {
        chatBox.style.display = "flex";
        openChatButton.style.display = "none";
    });

    // Minimize chatbot
    minimizeChatButton.addEventListener("click", function () {
        chatBox.style.display = "none";
        openChatButton.style.display = "block";
    });

    // Handle user input
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let userMessage = chatInput.value.trim();
            if (userMessage) {
                chatMessages.innerHTML += `<div style="text-align: right; margin: 5px;"><strong>You:</strong> ${userMessage}</div>`;
                chatInput.value = "";

                fetch("https://veeravnchatbotfunction.azurewebsites.net/api/copilot", {  // Correct function name
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: userMessage })
                })
                .then(response => response.json())
                .then(data => {
                    chatMessages.innerHTML += `<div style="text-align: left; margin: 5px; color: blue;"><strong>Copilot:</strong> ${data.response}</div>`;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                })
                .catch(error => {
                    chatMessages.innerHTML += `<div style="text-align: left; margin: 5px; color: red;"><strong>Error:</strong> Failed to fetch response.</div>`;
                });
            }
        }
    });
});
