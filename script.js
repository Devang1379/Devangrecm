document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();

  const messageBox = document.getElementById("message");
  messageBox.innerHTML = "";

  try {
    const res = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age }),
    });

    const data = await res.json();

    if (res.ok) {
      messageBox.innerHTML = `<div class="msg ok">✅ Saved! ID: ${data.id} | Name: ${data.name} | Age: ${data.age}</div>`;
    } else {
      messageBox.innerHTML = `<div class="msg err">❌ Error: ${data.error || "Failed to save"}</div>`;
    }
  } catch (err) {
    messageBox.innerHTML = `<div class="msg err">⚠️ Server not responding</div>`;
  }
});
