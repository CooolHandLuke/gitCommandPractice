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
    output.innerHTML += `\n$ ${userInput}`;

    if (stage < steps.length && steps[stage].match.test(userInput)) {
      output.innerHTML += `\n${steps[stage].response}`;
      stage++;
      if (stage === steps.length) {
        output.innerHTML += `\n🎉 All done! You successfully simulated a Git push.`;
      }
    } else {
      output.innerHTML += `\n❌ Invalid command or wrong order. Try again.`;
    }

    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});
