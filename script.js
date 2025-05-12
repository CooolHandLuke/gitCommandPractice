const input = document.getElementById("input");
const output = document.getElementById("output");
const instructions = document.getElementById("instructions");
const stepsList = document.getElementById("steps-list");
const consoleDiv = document.getElementById("console");

let level = 1;
let stage = 0;

const levels = [
  {
    instructions: `
      <p>Level 1: Type these commands in order to simulate pushing code to GitHub:</p>
      <ol>
        <li><code>git add .</code></li>
        <li><code>git commit -m "your message here"</code></li>
        <li><code>git push</code></li>
      </ol>
    `,
    steps: [
      {
        match: /^git add \.$/,
        response: "✅ Staged all files.",
      },
      {
        match: /^git commit -m ".*"$/,
        response: "✅ Commit created.",
        commitTest: (msg) => true, // Any message is fine for level 1
      },
      {
        match: /^git push$/,
        response: "🚀 Code pushed to GitHub!",
      },
    ],
    bgColor: "#181c20",
  },
  {
    instructions: `
      <p>Level 2: The background color has changed! Repeat the git commands, but your <strong>commit message must mention the background color change</strong>.<br>
      <em>Hint: Your commit message should include the words "background" and "color" or "colors".</em></p>
      <ol>
        <li><code>git add .</code></li>
        <li><code>git commit -m "your message about the background color change"</code></li>
        <li><code>git push</code></li>
      </ol>
    `,
    steps: [
      {
        match: /^git add \.$/,
        response: "✅ Staged all files.",
      },
      {
        match: /^git commit -m "(.*)"$/,
        response: "✅ Commit created.",
        commitTest: (msg) => /background/i.test(msg) && /color(s)?/i.test(msg),
      },
      {
        match: /^git push$/,
        response: "🚀 Code pushed to GitHub!",
      },
    ],
    bgColor: "#2d3a4a",
  },
];

function setLevel(lvl) {
  level = lvl;
  stage = 0;
  instructions.innerHTML = levels[level - 1].instructions;
  consoleDiv.style.background = levels[level - 1].bgColor;
}

setLevel(1);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const userInput = input.value.trim();

    // Show the command line as a new div
    const commandDiv = document.createElement("div");
    commandDiv.innerHTML = `<span class="repo">gitCommandPractice</span> <span class="branch">git:(main)</span> <span class="prompt">$</span> ${userInput}`;
    commandDiv.className = "command-line-output";
    output.appendChild(commandDiv);

    // Level/step logic
    const currentLevel = levels[level - 1];
    let feedback = "";
    if (
      stage < currentLevel.steps.length &&
      currentLevel.steps[stage].match.test(userInput)
    ) {
      // For commit step, check commit message content if needed
      if (stage === 1 && currentLevel.steps[stage].commitTest) {
        const commitMsg = userInput.match(/^git commit -m "(.*)"$/)?.[1] || "";
        if (!currentLevel.steps[stage].commitTest(commitMsg)) {
          feedback =
            "❌ Your commit message must mention the background color change!";
        } else {
          feedback = currentLevel.steps[stage].response;
          stage++;
        }
      } else {
        feedback = currentLevel.steps[stage].response;
        stage++;
      }
      // Level up if finished
      if (stage === currentLevel.steps.length) {
        if (level < levels.length) {
          feedback += "<br>🎉 Level complete! Moving to the next level...";
          setTimeout(() => {
            setLevel(level + 1);
            // Optionally clear output for new level:
            // output.innerHTML = '';
          }, 1500);
        } else {
          feedback += "<br>🏆 All levels complete!";
        }
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

// Prevent mouse from moving the cursor in the input
input.addEventListener("mousedown", function (e) {
  e.preventDefault();
  input.focus();
});
