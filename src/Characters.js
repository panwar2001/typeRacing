export default ()=>{
const names=["Lexi Swift", "Typer Ninja","Zara Keystrokes","Blitz Typist","Captain Keyboard", "Mara Speedster","Max Qwerty","Ava Fastfingers","Dash Turbo","Luna Rapidfire"];
let len=names.length;
let random=Math.random()*len|0;
return names[random];
}
  