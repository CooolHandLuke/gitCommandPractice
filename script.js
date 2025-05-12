const input = document.getElementById("input");
const output = document.getElementById("output");

let stage = 0;

const steps = [
  {
    match: /^git add \.$/,
    response: "✅ Staged all files.",
  },
  {
    match: /^git commit -m ".*"$/,
    response: "✅ Commit created.",
  },
  {
    match: /^git push$/,
    response: "🚀 Code pushed to GitHub!",
  },
];

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const userInput = input.value.trim();

    // Show the command line as a new div
    const commandDiv = document.createElement("div");
    commandDiv.innerHTML = `<span class="repo">gitCommandPractice</span> <span class="branch">git:(main)</span> <span class="prompt">$</span> ${userInput}`;
    commandDiv.className = "command-line-output";
    output.appendChild(commandDiv);

    // Show feedback as a new div
    let feedback = "";
    if (stage < steps.length && steps[stage].match.test(userInput)) {
      feedback = steps[stage].response;
      stage++;
      if (stage === steps.length) {
        feedback += "<br>🎉 All done! You successfully simulated a Git push.";
      }
    } else {
      feedback = "❌ Invalid command or wrong order. Try again.";
    }
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "feedback";
    feedbackDiv.innerHTML = feedback;
    output.appendChild(feedbackDiv);

    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});
