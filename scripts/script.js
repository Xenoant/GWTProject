function switchLoginForm() {
  var element = document.getElementById("loginForm");

  if (element.style.display == "block"){
    element.style.display = "none"
  } else{
    element.style.display = "block"
  }
}

function switchHomeElements(id){
  var path = window.location.pathname;
  var page = path.split("/").pop();
  if (page != "index.php"){
    window.open("../index.php", "_self");
  }

  if (id == 1){
    document.getElementById("part1").style.display = "block";
    document.getElementById("part2").style.display = "none";
    document.getElementById("part3").style.display = "none";
  } else if (id == 2){
    document.getElementById("part1").style.display = "none";
    document.getElementById("part2").style.display = "block";
    document.getElementById("part3").style.display = "none";
  } else if (id == 3){
    document.getElementById("part1").style.display = "none";
    document.getElementById("part2").style.display = "none";
    document.getElementById("part3").style.display = "block";
  }
}

const raritystats = {
  common: 2,
  uncommon: 3,
  rare: 4,
  legendary: 6,
  mythic: 8
} 

var curFile = "";

var charData = {
  isNpc: false,
  name: "",
  gender: "",
  race: "",
  class: "",
  job: "",
  rank: "",

  health: 0,
  mana: 0,

  base: 0,
  free: 0,
  remaining_free: 0,
  str: 0,
  vit: 0,
  agi: 0,
  dex: 0,
  chr: 0,
  int: 0,
  wis: 0,
  fth: 0,
  per: 0,
  lck: 0,

  debuff: [],
  debuffStat: [
    { name: "str", value: 0 },
    { name: "vit", value: 0 },
    { name: "agi", value: 0 },
    { name: "dex", value: 0 },
    { name: "chr", value: 0 },
    { name: "int", value: 0 },
    { name: "wis", value: 0 },
    { name: "fth", value: 0 },
    { name: "lck", value: 0 },
    { name: "per", value: 0 }
  ],
  skills: [],
  traits: [],
  knows: [],
  rings: [],
  items: [],
  gear: [],
  gearStat: [
    { name: "str", value: 0 },
    { name: "vit", value: 0 },
    { name: "agi", value: 0 },
    { name: "dex", value: 0 },
    { name: "chr", value: 0 },
    { name: "int", value: 0 },
    { name: "wis", value: 0 },
    { name: "fth", value: 0 },
    { name: "lck", value: 0 },
    { name: "per", value: 0 }
  ],
  notes: [],
  dices: []
}

function initNewChar()
{
  displayCharData(false);
}

function initLoadChar()
{
  deactivateFormElements();
}

// TODO:
function updateGearDisplay()
{
  // TODO:
  // called when items got updated
  var gear_disps = document.getElementsByClassName("gear-box");
  // if cur Item got removed --> empty cur gear
  // if cur Item got changed --> change cur Item
  //// update gear extra stats
}

// change an element in charData
function changeElement(key, value) {
  if (value == undefined || value == null || isNaN(value)){
    return;
  }

  console.log("Try to change [" + key + "] by [" + value + "]");

  if (charData.remaining_free - value < 0 && key != "free" && key != "base" && key != "mana" && key != "health"){
    alert("No Free Attrubute Points!")
    return;
  }

  if (charData.hasOwnProperty(key)) {
    if (charData[key] + value < 0){
      return;
    }

    if (key === "free" && value < 0 && charData.remaining_free <= charData.free){
      // hier müssen alle verteielten punkte resettet werden
      charData.str = 0;
      charData.agi = 0;
      charData.chr = 0;
      charData.wis = 0;
      charData.lck = 0;
      charData.dex = 0;
      charData.vit = 0;
      charData.int = 0;
      charData.per = 0;
      charData.fth = 0;
      charData.remaining_free = charData.free;
    }

    charData[key] += value;

    if (key != "free" && key != "base" && key != "mana" && key != "health"){
      charData.remaining_free -= value;
    }
    else if (key === "free" && value > 0){
      charData.remaining_free += 1;
    }
    else if (key === "free" && value < 0){
      charData.remaining_free -= 1;
    }

    displayCharData(false);
  } else {
    console.log("Invalid key: " + key);
  }
}

// id of free att points: attpoints
// add 1 to the value and decrease available points by 1 
function addValue(valueid)
{
  changeElement(valueid, 1);

  displayCharData(false);
}

// decrease 1 from value and decrease available points by 1
function decValue(valueid)
{
  changeElement(valueid, -1);
  
  displayCharData(false);
}

function addMainStat(valueid, amount){
  changeElement(valueid, parseInt(document.getElementById(amount).value));
  
  displayCharData(false);
}

function decMainStat(valueid, amount){
  changeElement(valueid, -(parseInt(document.getElementById(amount).value)));
  
  displayCharData(false);
}

// display data in charData
function displayCharData(display)
{
  console.log("Updating Char Display with: " + JSON.stringify(charData));

  // basestats
  var list = document.getElementsByClassName("basestat");
  Array.from(list).forEach(element => {
    element.innerHTML = charData.base;
  });

  // extra stats
  document.getElementById("base_disp").innerHTML = charData.base;
  document.getElementById("free_disp").innerHTML = charData.remaining_free + " / " + charData.free;
  document.getElementById("str_disp").innerHTML = charData.str;
  document.getElementById("vit_disp").innerHTML = charData.vit;
  document.getElementById("agi_disp").innerHTML = charData.agi;
  document.getElementById("dex_disp").innerHTML = charData.dex;
  document.getElementById("chr_disp").innerHTML = charData.chr;
  document.getElementById("int_disp").innerHTML = charData.int;
  document.getElementById("wis_disp").innerHTML = charData.wis;
  document.getElementById("fth_disp").innerHTML = charData.fth;
  document.getElementById("lck_disp").innerHTML = charData.lck;
  document.getElementById("per_disp").innerHTML = charData.per;
  try{
    document.getElementById("health_disp").innerHTML = charData.health + " / " + getMaxHealth();
    document.getElementById("mana_disp").innerHTML = charData.mana + " / " + getMaxMana();  
  } catch{}
 
  document.getElementById("str_disp_extra").innerHTML = "( + " + charData.gearStat[0].value + ")";
  document.getElementById("vit_disp_extra").innerHTML = "( + " + charData.gearStat[1].value + ")";
  document.getElementById("agi_disp_extra").innerHTML = "( + " + charData.gearStat[2].value + ")";
  document.getElementById("dex_disp_extra").innerHTML = "( + " + charData.gearStat[3].value + ")";
  document.getElementById("chr_disp_extra").innerHTML = "( + " + charData.gearStat[4].value + ")";
  document.getElementById("int_disp_extra").innerHTML = "( + " + charData.gearStat[5].value + ")";
  document.getElementById("wis_disp_extra").innerHTML = "( + " + charData.gearStat[6].value + ")";
  document.getElementById("fth_disp_extra").innerHTML = "( + " + charData.gearStat[7].value + ")";
  document.getElementById("lck_disp_extra").innerHTML = "( + " + charData.gearStat[8].value + ")";
  document.getElementById("per_disp_extra").innerHTML = "( + " + charData.gearStat[9].value + ")";

  document.getElementById("str_disp_debuff").innerHTML = (charData.debuffStat[0].value > 0 ? "( + " : "( ") + charData.debuffStat[0].value + ")";
  document.getElementById("vit_disp_debuff").innerHTML = (charData.debuffStat[1].value > 0 ? "( + " : "( ") + charData.debuffStat[1].value + ")";
  document.getElementById("agi_disp_debuff").innerHTML = (charData.debuffStat[2].value > 0 ? "( + " : "( ") + charData.debuffStat[2].value + ")";
  document.getElementById("dex_disp_debuff").innerHTML = (charData.debuffStat[3].value > 0 ? "( + " : "( ") + charData.debuffStat[3].value + ")";
  document.getElementById("chr_disp_debuff").innerHTML = (charData.debuffStat[4].value > 0 ? "( + " : "( ") + charData.debuffStat[4].value + ")";
  document.getElementById("int_disp_debuff").innerHTML = (charData.debuffStat[5].value > 0 ? "( + " : "( ") + charData.debuffStat[5].value + ")";
  document.getElementById("wis_disp_debuff").innerHTML = (charData.debuffStat[6].value > 0 ? "( + " : "( ") + charData.debuffStat[6].value + ")";
  document.getElementById("fth_disp_debuff").innerHTML = (charData.debuffStat[7].value > 0 ? "( + " : "( ") + charData.debuffStat[7].value + ")";
  document.getElementById("lck_disp_debuff").innerHTML = (charData.debuffStat[8].value > 0 ? "( + " : "( ") + charData.debuffStat[8].value + ")";
  document.getElementById("per_disp_debuff").innerHTML = (charData.debuffStat[9].value > 0 ? "( + " : "( ") + charData.debuffStat[9].value + ")";

  document.getElementById("in_npc").checked = charData.isNpc;
  document.getElementById("in_name").value = charData.name;
  document.getElementById("in_gender").value = charData.gender;
  document.getElementById("in_race").value = charData.race;
  document.getElementById("in_class").value = charData.class;
  document.getElementById("in_job").value = charData.job;
  document.getElementById("in_rank").value = charData.rank;

  // handle skill, trait, knowledge, items, gear display
  if (display)
  {
    charData.dices.forEach(element => {
      createDicePreset(element.sides, element.stat, element.gear);
    });
    charData.debuff.forEach(element => {
      addDebuff(element.desc, element.stat, element.amount);
    });
    charData.skills.forEach(element => {
      addSkill(false, element.name, element.description);
    });
    charData.traits.forEach(element => {
      addTrait(false, element.name, element.description);
    });
    charData.knows.forEach(element => {
      addKnowledge(false, element.name, element.description, element.state);
    });
    charData.rings.forEach(element => {
      addRing(false, element.name);
    });
    charData.items.forEach(element => {
      addItem(false, element)
    });
    charData.gear.forEach(element => {
      changedItem();
      setGear();
    });
    charData.notes.forEach(element => {
      addNote(false, element.header, element.text);
    });
  }
}

function getMaxHealth(){
  return (charData.base + charData.vit) * 4;
}
function getMaxMana(){
  return (charData.base + charData.int) * 4;
}

// activates or deactiavetes the form element
function activateFormElements()
{
  var allBtns = document.getElementsByClassName("valuebtn");
  Array.from(allBtns).forEach(element => {
    element.disabled = false;
  });

  var allBtns2 = document.getElementsByClassName("addbtn");
  Array.from(allBtns2).forEach(element => {
    element.disabled = false;
  });

  var allBtns3 = document.getElementsByClassName("selectfield");
  Array.from(allBtns3).forEach(element => {
    element.disabled = false;
  });

  var allBtns4 = document.getElementsByClassName("inputfield");
  Array.from(allBtns4).forEach(element => {
    element.disabled = false;
  });
}
function deactivateFormElements()
{
  var allBtns = document.getElementsByClassName("valuebtn");
  Array.from(allBtns).forEach(element => {
    element.disabled = true;
  });

  var allBtns2 = document.getElementsByClassName("addbtn");
  Array.from(allBtns2).forEach(element => {
    element.disabled = true;
  });

  // selectfield / inputfield
  var allBtns3 = document.getElementsByClassName("selectfield");
  Array.from(allBtns3).forEach(element => {
    element.disabled = true;
  });

  var allBtns4 = document.getElementsByClassName("inputfield");
  Array.from(allBtns4).forEach(element => {
    element.disabled = true;
  });
}

function writeInputData()
{
  //console.log("Input saved to charData object with: " + JSON.stringify(charData));
  charData.isNpc = document.getElementById("in_npc").checked;
  charData.name = document.getElementById("in_name").value;
  charData.gender = document.getElementById("in_gender").value;
  charData.class = document.getElementById("in_class").value;
  charData.race = document.getElementById("in_race").value;
  charData.job = document.getElementById("in_job").value;
  charData.rank = document.getElementById("in_rank").value;
}

function addDebuff(_description, _stat, _amount) {
  // header
  // Description Input
  // Stat Select
  // amount input

  console.log("Adding Buff/Debuff container...");

  var debuffContainer = document.createElement("div");
  debuffContainer.className = "debuff";

  var debuffNameHeader = document.createElement("div");
  debuffNameHeader.className = "note-header";
  debuffNameHeader.innerHTML = "Debuff";

  var debuffDescInput = document.createElement("input");
  debuffDescInput.type = "text";
  debuffDescInput.className = "inputfield extrainputfield description_box";
  debuffDescInput.placeholder = "How Long/ Why...";
  debuffDescInput.style.resize = "both";

  var debuffStatSelect = document.createElement("select");
  var debuffStatOpt_1 = document.createElement("option");
  var debuffStatOpt_2 = document.createElement("option");
  var debuffStatOpt_3 = document.createElement("option");
  var debuffStatOpt_4 = document.createElement("option");
  var debuffStatOpt_5 = document.createElement("option");
  var debuffStatOpt_6 = document.createElement("option");
  var debuffStatOpt_7 = document.createElement("option");
  var debuffStatOpt_8 = document.createElement("option");
  var debuffStatOpt_9 = document.createElement("option");
  var debuffStatOpt_10 = document.createElement("option");

  debuffStatOpt_1.value = "str";
  debuffStatOpt_2.value = "vit";
  debuffStatOpt_3.value = "agi";
  debuffStatOpt_4.value = "dex";
  debuffStatOpt_5.value = "chr";
  debuffStatOpt_6.value = "int";
  debuffStatOpt_7.value = "wis";
  debuffStatOpt_8.value = "fth";
  debuffStatOpt_9.value = "lck";
  debuffStatOpt_10.value = "per";
  debuffStatSelect.className = "selectfield extraselectfield";
  debuffStatSelect.value = "str";

  debuffStatSelect.appendChild(debuffStatOpt_1);
  debuffStatOpt_1.innerHTML = "Str";
  debuffStatSelect.appendChild(debuffStatOpt_2);
  debuffStatOpt_2.innerHTML = "Vit";
  debuffStatSelect.appendChild(debuffStatOpt_3);
  debuffStatOpt_3.innerHTML = "Agi";
  debuffStatSelect.appendChild(debuffStatOpt_4);
  debuffStatOpt_4.innerHTML = "Dex";
  debuffStatSelect.appendChild(debuffStatOpt_5);
  debuffStatOpt_5.innerHTML = "Chr";
  debuffStatSelect.appendChild(debuffStatOpt_6);
  debuffStatOpt_6.innerHTML = "Int";
  debuffStatSelect.appendChild(debuffStatOpt_7);
  debuffStatOpt_7.innerHTML = "Wis";
  debuffStatSelect.appendChild(debuffStatOpt_8);
  debuffStatOpt_8.innerHTML = "Fth";
  debuffStatSelect.appendChild(debuffStatOpt_9);
  debuffStatOpt_9.innerHTML = "Lck";
  debuffStatSelect.appendChild(debuffStatOpt_10);
  debuffStatOpt_10.innerHTML = "Per";

  var debuffAmountInput = document.createElement("input");
  debuffAmountInput.className = "inputfield extrainputfield" 
  debuffAmountInput.type = "number";
  debuffAmountInput.placeholder = "Enter amount...";
  debuffAmountInput.value = 0;

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  debuffContainer.appendChild(debuffNameHeader);
  debuffContainer.appendChild(debuffDescInput);
  debuffContainer.appendChild(debuffStatSelect);
  debuffContainer.appendChild(debuffAmountInput);
  debuffContainer.appendChild(closeBtn);

  document.getElementById("debuff_disp").appendChild(debuffContainer);

  var debuffData = {
    desc: "",
    stat: "",
    amount: 0,
  };
  if (_description !== undefined && _description != null){
    debuffDescInput.value = _description;
    debuffData.desc = _description;
  }
  if (_stat !== undefined && _stat != null){
    debuffStatSelect.value = _stat;
    debuffData.stat = _stat;
  }
  if (_amount !== undefined && _amount != null){
    debuffAmountInput.value = _amount;
    debuffData.amount = _amount;
  }

  debuffDescInput.addEventListener("change", function(){
    debuffData.desc = this.value;
    console.log("Update Debuff desc: " + debuffData.desc);

    var index = charData.debuff.indexOf(debuffData);
    if (index === -1){
      charData.debuff.push(debuffData);
    }
  });
  debuffStatSelect.addEventListener("change", function(){
    debuffData.stat = this.value;
    console.log("Update Debuff stat: " + debuffData.stat);

    var index = charData.debuff.indexOf(debuffData);
    if (index === -1){
      charData.debuff.push(debuffData);
    }
    updateDebuffStat();
  });
  debuffAmountInput.addEventListener("change", function(){
    debuffData.amount = parseInt(this.value);
    console.log("Update Debuff amount: " + debuffData.amount);
    console.log(debuffData);

    var index = charData.debuff.indexOf(debuffData);
    if (index === -1){
      charData.debuff.push(debuffData);
    }
    updateDebuffStat();
  });
  closeBtn.addEventListener("click", function(){
    var index = charData.debuff.indexOf(debuffData);
    if (index !== -1){
      charData.debuff.splice(index, 1);
    }
    debuffContainer.remove();
    updateDebuffStat();
  }); 
}

function updateDebuffStat() {
  console.log("Updating Debuff Stats!");
  var newstats = [
    { name: "str", value: 0 },
    { name: "vit", value: 0 },
    { name: "agi", value: 0 },
    { name: "dex", value: 0 },
    { name: "chr", value: 0 },
    { name: "int", value: 0 },
    { name: "wis", value: 0 },
    { name: "fth", value: 0 },
    { name: "lck", value: 0 },
    { name: "per", value: 0 }
  ];

  for (var debuff of charData.debuff) {
    var statObj = newstats.find(stat => stat.name === debuff.stat);
    if (statObj) {
      statObj.value += debuff.amount;
    }
  }

  charData.debuffStat = newstats;
  displayCharData(false);
}


function addSkill(interactable, _name, _desc)
{
  interactable = !interactable;

  console.log("Adding Skill container...");

  var skillContainer = document.createElement("div");
  skillContainer.className = "skill";

  var skillNameInput = document.createElement("input");
  skillNameInput.className = "inputfield extrainputfield" 
  skillNameInput.type = "text";
  skillNameInput.placeholder = "Enter skill name...";
  skillNameInput.disabled = interactable;

  var skillDescInput = document.createElement("input");
  skillDescInput.type = "text";
  skillDescInput.className = "inputfield extrainputfield description_box";
  skillDescInput.placeholder = "Enter skill description...";
  skillDescInput.style.resize = "both"; 
  skillDescInput.disabled = interactable;

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  skillContainer.appendChild(skillNameInput);
  skillContainer.appendChild(skillDescInput);
  skillContainer.appendChild(closeBtn);

  document.getElementById("skill_disp").appendChild(skillContainer);

  var skillData = {
    name:"",
    description: ""
  }

  if (_name != undefined || _name != null){
    skillNameInput.value = _name;
  }
  if (_desc != undefined || _desc != null){
    skillDescInput.value = _desc;
  }

  closeBtn.addEventListener("click", function() {
    var index = charData.skills.indexOf(skillData);
    if (index !== -1){
      charData.skills.splice(index, 1);
    }
    skillContainer.remove();
  });

  skillNameInput.addEventListener("input", function() {
    skillData.name = skillNameInput.value;
    console.log("Update Skill name: " + skillData.name);

    var index = charData.skills.indexOf(skillData);
    if (index === -1){
      charData.skills.push(skillData);
    }
  });

  skillDescInput.addEventListener("input", function() {
    skillData.description = skillDescInput.value;
    console.log("Update Skill description: " + skillData.description);
  });
}

function addTrait(interactable, _name, _desc)
{
interactable = !interactable;

  console.log("Adding Trait container...");

  var traitContainer = document.createElement("div");
  traitContainer.className = "trait";

  var traitNameInput = document.createElement("input");
  traitNameInput.type = "text";
  traitNameInput.className = "inputfield extrainputfield" 
  traitNameInput.placeholder = "Enter Trait name...";
  traitNameInput.disabled = interactable;

  var traitDescInput = document.createElement("input");
  traitDescInput.type = "text";
  traitDescInput.className = "inputfield extrainputfield description_box";
  traitDescInput.placeholder = "Enter Trait description...";
  traitDescInput.style.resize = "both"; 
  traitDescInput.disabled = interactable;

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  traitContainer.appendChild(traitNameInput);
  traitContainer.appendChild(traitDescInput);
  traitContainer.appendChild(closeBtn);

  document.getElementById("trait_disp").appendChild(traitContainer);

  var traitData = {
    name:"",
    description: ""
  }

  if (_name != undefined || _name != null){
    traitNameInput.value = _name;
  }
  if (_desc != undefined || _desc != null){
    traitDescInput.value = _desc;
  }

  closeBtn.addEventListener("click", function() {
    var index = charData.traits.indexOf(traitData);
    if (index !== -1){
      charData.traits.splice(index, 1);
    }
    traitContainer.remove();
  });

  traitNameInput.addEventListener("input", function() {
    traitData.name = traitNameInput.value;
    console.log("Update Trait name: " + traitData.name);

    var index = charData.traits.indexOf(traitData);
    if (index === -1){
      charData.traits.push(traitData);
    }
  });

  traitDescInput.addEventListener("input", function() {
    traitData.description = traitDescInput.value;
    console.log("Update Trait description: " + traitData.description);
  });
}

function addKnowledge(interactable, _name, _desc, _state)
{
  interactable = !interactable;

  console.log("Adding Knowledge container...");

  var knowContainer = document.createElement("div");
  knowContainer.className = "knowledge";

  var knowNameInput = document.createElement("input");
  knowNameInput.type = "text";
  knowNameInput.className = "inputfield extrainputfield" 
  knowNameInput.placeholder = "Enter Knowledge name...";
  knowNameInput.disabled = interactable;

  var knowDescInput = document.createElement("input");
  knowDescInput.type = "text";
  knowDescInput.className = "inputfield extrainputfield description_box";
  knowDescInput.placeholder = "Enter Knowledge description...";
  knowDescInput.style.resize = "both"; 
  knowDescInput.disabled = interactable;

  var knowStateSelect = document.createElement("select");
  var knowStateOpt_1 = document.createElement("option");
  var knowStateOpt_2 = document.createElement("option");
  var knowStateOpt_3 = document.createElement("option");
  var knowStateOpt_4 = document.createElement("option");
  knowStateOpt_1.value = "basic";
  knowStateOpt_2.value = "advanced";
  knowStateOpt_3.value = "professsional";
  knowStateOpt_4.value = "master";
  knowStateSelect.disabled = interactable;
  knowStateSelect.className = "selectfield extraselectfield" 

  knowStateSelect.appendChild(knowStateOpt_1);
  knowStateOpt_1.innerHTML = "Basic";
  knowStateSelect.appendChild(knowStateOpt_2);
  knowStateOpt_2.innerHTML = "Advanced";
  knowStateSelect.appendChild(knowStateOpt_3);
  knowStateOpt_3.innerHTML = "Professional";
  knowStateSelect.appendChild(knowStateOpt_4);
  knowStateOpt_4.innerHTML = "Master";

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  knowContainer.appendChild(knowNameInput);
  knowContainer.appendChild(knowDescInput);
  knowContainer.appendChild(knowStateSelect);
  knowContainer.appendChild(closeBtn);

  document.getElementById("know_disp").appendChild(knowContainer);

  var knowData = {
    name: "",
    description: "",
    state: ""
  }

  if (_name != undefined || _name != null){
    knowNameInput.value = _name;
  }
  if (_desc != undefined || _desc != null){
    knowDescInput.value = _desc;
  }
  if (_state != undefined || _state != null){
    knowStateSelect.value = _state;
  }

  closeBtn.addEventListener("click", function() {
    var index = charData.knows.indexOf(knowData);
    if (index !== -1){
      charData.knows.splice(index, 1);
    }
    knowContainer.remove();
  });

  knowNameInput.addEventListener("input", function() {
    knowData.name = this.value;
    console.log("Update know name: " + knowData.name);

    var index = charData.knows.indexOf(knowData);
    if (index === -1){
      charData.knows.push(knowData);
    }
  });

  knowDescInput.addEventListener("input", function() {
    knowData.description = this.value;
    console.log("Update know description: " + knowData.description);
  });

  knowStateSelect.addEventListener("input", function() {
    knowData.state = this.value;
    console.log("Update know description: " + knowData.state);
  });
}

function addRing(interactable, _name)
{
  interactable = !interactable;

  console.log("Adding Ring container...");

  var ringContainer = document.createElement("div");
  ringContainer.className = "ring";

  var ringNameInput = document.createElement("input");
  ringNameInput.type = "text";
  ringNameInput.className = "inputfield extrainputfield" 
  ringNameInput.placeholder = "Enter Ring type...";
  ringNameInput.disabled = interactable;

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  ringContainer.appendChild(ringNameInput);
  ringContainer.appendChild(closeBtn);

  document.getElementById("ring_disp").appendChild(ringContainer);

  var ringData = {
    name:""
  }

  if (_name != undefined || _name != null){
    ringNameInput.value = _name;
  }

  closeBtn.addEventListener("click", function() {
    var index = charData.rings.indexOf(ringData);
    if (index !== -1){
      charData.rings.splice(index, 1);
    }
    ringContainer.remove();
  });

  ringNameInput.addEventListener("input", function() {
    ringData.name = ringNameInput.value;
    console.log("Update Trait name: " + ringData.name);

    var index = charData.rings.indexOf(ringData);
    if (index === -1){
      charData.rings.push(ringData);
    }
  });
}

function addItem(interactable, parseData) {
  interactable = !interactable;

  console.log("Adding Item container...");

  var itemContainer = document.createElement("div");
  itemContainer.className = "item";

  var itemNameInput = document.createElement("input");
  itemNameInput.type = "text";
  itemNameInput.className = "inputfield extrainputfield";
  itemNameInput.placeholder = "Enter Item name...";
  itemNameInput.disabled = interactable;

  var itemDescInput = document.createElement("input");
  itemDescInput.type = "text";
  itemDescInput.className = "inputfield extrainputfield description_box";
  itemDescInput.placeholder = "Enter Item description...";
  itemDescInput.style.resize = "both";
  itemDescInput.disabled = interactable;

  var rarityStateSelect = document.createElement("select");
  var rarityStateOpt_0 = document.createElement("option");
  var rarityStateOpt_1 = document.createElement("option");
  var rarityStateOpt_2 = document.createElement("option");
  var rarityStateOpt_3 = document.createElement("option");
  var rarityStateOpt_4 = document.createElement("option");
  var rarityStateOpt_5 = document.createElement("option");
  rarityStateOpt_0.value = "nag";
  rarityStateOpt_1.value = "common";
  rarityStateOpt_2.value = "uncommon";
  rarityStateOpt_3.value = "rare";
  rarityStateOpt_4.value = "legendary";
  rarityStateOpt_5.value = "mythic";
  rarityStateSelect.disabled = interactable;
  rarityStateSelect.className = "selectfield extraselectfield";
  
  rarityStateSelect.appendChild(rarityStateOpt_0);
  rarityStateOpt_0.innerHTML = "Not a Gear";
  rarityStateSelect.appendChild(rarityStateOpt_1);
  rarityStateOpt_1.innerHTML = "Common";
  rarityStateSelect.appendChild(rarityStateOpt_2);
  rarityStateOpt_2.innerHTML = "Uncommon";
  rarityStateSelect.appendChild(rarityStateOpt_3);
  rarityStateOpt_3.innerHTML = "Rare";
  rarityStateSelect.appendChild(rarityStateOpt_4);
  rarityStateOpt_4.innerHTML = "Legendary";
  rarityStateSelect.appendChild(rarityStateOpt_5);
  rarityStateOpt_5.innerHTML = "Mythic";
  
  var statsContainer = document.createElement("div");
  statsContainer.className = "statscontainer"; 
  statsContainer.style.display = "none";

  var statsValueContainer = document.createElement("div");
  statsValueContainer.className = "statsvaluecontainer"; 
  statsValueContainer.style.display = interactable ? "none" : "block";
  
  var rarityStatsLabel = document.createElement("div");
  rarityStatsLabel.innerHTML = "Additional Stats: ";
  rarityStatsLabel.className = "statsheader";   

  var rarityStatsBtn = document.createElement("button");
  rarityStatsBtn.innerHTML = "Expand";
  rarityStatsBtn.className = "normalbtn";

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  itemContainer.appendChild(itemNameInput);
  itemContainer.appendChild(itemDescInput);

  itemContainer.appendChild(rarityStateSelect);
  itemContainer.appendChild(statsContainer);
  statsContainer.appendChild(rarityStatsLabel);
  statsContainer.appendChild(statsValueContainer);
  statsContainer.appendChild(rarityStatsBtn);

  itemContainer.appendChild(closeBtn);

  var itemData = (parseData === undefined || parseData === null) ? {
    name: "",
    description: "",
    rarity: "",
    stats: [
      { name: "str", value: 0 },
      { name: "vit", value: 0 },
      { name: "agi", value: 0 },
      { name: "dex", value: 0 },
      { name: "chr", value: 0 },
      { name: "int", value: 0 },
      { name: "wis", value: 0 },
      { name: "fth", value: 0 },
      { name: "lck", value: 0 },
      { name: "per", value: 0 }
    ]
  } : parseData;

  for (let i = 0; i < itemData.stats.length; i++) {
    var rarityStat = document.createElement("div");
    rarityStat.innerHTML = itemData.stats[i].name + ": ";
    rarityStat.className = "statstext";
    statsValueContainer.appendChild(rarityStat);

    var rarityStat = document.createElement("input");
    rarityStat.placeholder = "Please enter " + itemData.stats[i].name + "...";
    rarityStat.type = "number";
    rarityStat.value = itemData.stats[i].value;
    rarityStat.className = "inputfield extrainputfield";
    statsValueContainer.appendChild(rarityStat);

    rarityStat.addEventListener("input", function () {
      var index = charData.items.indexOf(itemData);
      if (index !== -1){
        charData.items[index].stats = itemData.stats;
      } else{
        console.warn("Chardata does not contain this item!");
      }

      changedItem();

      itemData.stats[i].value = parseInt(this.value);
      console.log("Update item gear stat [" + itemData.stats[i].name + "] to [>" + this.value + "]");
    });
  }

  document.getElementById("item_disp").appendChild(itemContainer);

  if (parseData != undefined || parseData != null) {
    itemNameInput.value = parseData.name;
  }
  if (parseData != undefined || parseData != null) {
    itemDescInput.value = parseData.description;
  }
  if (parseData != undefined || parseData != null) {
    rarityStateSelect.value = parseData.rarity;
    if (rarityStateSelect.value !== "nag"){
      statsContainer.style.display = "block";    

      // tell player available stat points 
      rarityStatsLabel.innerHTML = "Additional Stats: " + raritystats[rarityStateSelect.value];
      deactivateFormElements();
      
    }
    else{
      // deactivate stat select
      statsContainer.style.display = "none";
    }
  }

  closeBtn.addEventListener("click", function() {
    var index = charData.items.indexOf(itemData);
    if (index !== -1){
      charData.items.splice(index, 1);
    }
    itemContainer.remove();
  });

  itemNameInput.addEventListener("input", function () {
    itemData.name = itemNameInput.value;
    console.log("Update item name: " + itemData.name);

    changedItem();

    var index = charData.items.indexOf(itemData);
    if (index === -1){
      charData.items.push(itemData);
    }
  });

  itemDescInput.addEventListener("input", function () {
    itemData.description = itemDescInput.value;
    console.log("Update item description: " + itemData.description);
  });

  rarityStateSelect.addEventListener("input", function () {
    itemData.rarity = rarityStateSelect.value;
    console.log("Update item state: " + itemData.rarity);

    changedItem();

    if (rarityStateSelect.value !== "nag"){
      statsContainer.style.display = "block";
      statsValueContainer.style.display = "none";    

      // tell player available stat points 
      rarityStatsLabel.innerHTML = "Additional Stats: " + raritystats[rarityStateSelect.value];
    }
    else{
      // deactivate stat select
      statsContainer.style.display = "none";
    }
  });

  rarityStatsBtn.addEventListener("click", function () {
    if (statsValueContainer.style.display == "block"){
      statsValueContainer.style.display = "none";
      this.innerHTML = "Expand";
    } 
    else {
      statsValueContainer.style.display = "block";
      this.innerHTML = "Reduce";
    }
    console.log("Expanded/ Closed Stats Value Container");
  });
}

function changedItem()
{
  // change the select options
  Array.from(document.getElementsByClassName("gear-select")).forEach(element => {
    removeOptions(element);

    var newOpt = document.createElement("option");
    newOpt.value = "none";
    newOpt.innerHTML = "none";
    element.appendChild(newOpt);

    Array.from(charData.items).forEach(item => {
      if (item.rarity === "nag") { return; }
      var newOpt = document.createElement("option");
      newOpt.value = item.name;
      newOpt.innerHTML = item.name;

      element.appendChild(newOpt);
    });
  });
}

function removeOptions(element)
{
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function changedGear(id, selectid, nameid, rarityid)
{
  console.log("Changing Gear...");

  var select = document.getElementById(selectid);
  var namefield = document.getElementById(nameid);
  var rarityfield = document.getElementById(rarityid);

  if (!getItemByName(select.value)){ return; }

  namefield.textContent = select.value;
  rarityfield.textContent = getItemByName(select.value).rarity;

  charData.gear[id] = select.value;

  var newstats = [
    { name: "str", value: 0 },
    { name: "vit", value: 0 },
    { name: "agi", value: 0 },
    { name: "dex", value: 0 },
    { name: "chr", value: 0 },
    { name: "int", value: 0 },
    { name: "wis", value: 0 },
    { name: "fth", value: 0 },
    { name: "lck", value: 0 },
    { name: "per", value: 0 }
  ]

  for (var itemname of charData.gear) {
    var item = getItemByName(itemname);
    for (var stat in item.stats) {
      if (newstats.hasOwnProperty(stat)) {
         newstats[stat].value += item.stats[stat].value;
      }
    }
  }
  charData.gearStat = newstats;
  displayCharData(false);
}

function setGear()
{
  console.log("Setting Gear...");

  document.getElementById("gearselect1").value = charData.gear[0];
  document.getElementById("gearselect1").dispatchEvent(new Event("change"));
  document.getElementById("gearselect2").value = charData.gear[1];
  document.getElementById("gearselect2").dispatchEvent(new Event("change"));
  document.getElementById("gearselect3").value = charData.gear[2];
  document.getElementById("gearselect3").dispatchEvent(new Event("change"));
  document.getElementById("gearselect4").value = charData.gear[3];
  document.getElementById("gearselect4").dispatchEvent(new Event("change"));
}

function getItemByName(_name) {
  for (const item of charData.items) {
    if (item.name === _name) {
      return item;
    }
  }
  return null;
}

function addNote(interactable, _header, _text)
{
  console.log("Adding Note container...");

  var noteContainer = document.createElement("div");
  noteContainer.className = "note";
  noteContainer.id = "note"

  var noteHeaderInput = document.createElement("input");
  noteHeaderInput.type = "text";
  noteHeaderInput.className = "note-header"; 
  noteHeaderInput.placeholder = "Enter note header...";

  var noteTextInput = document.createElement("textarea");
  noteTextInput.type = "text";
  noteTextInput.className = "note-textarea";
  noteTextInput.placeholder = "Enter note text...";
  noteTextInput.style.resize = "both";

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  var detatchBtn = document.createElement("button");
  detatchBtn.className = "detatchbtn"; 
  detatchBtn.innerHTML = "Detatch Note";

  noteContainer.appendChild(noteHeaderInput);
  noteContainer.appendChild(document.createElement("br"));
  noteContainer.appendChild(noteTextInput);
  noteContainer.appendChild(document.createElement("br"));
  noteContainer.appendChild(closeBtn);
  noteContainer.appendChild(detatchBtn);

  document.getElementById("note_disp").appendChild(noteContainer);

  var noteData = {
    header:"",
    text:""
  }

  if (_header != undefined || _header != null){
    noteHeaderInput.value = _header;
  }
  if (_text != undefined || _text != null){
    noteTextInput.value = _text;
  }

  closeBtn.addEventListener("click", function() {
    var index = charData.notes.indexOf(noteData);
    if (index !== -1){
      charData.notes.splice(index, 1);
    }
    noteContainer.remove();
  });

  detatchBtn.addEventListener("click", function() {
    if (noteContainer.className === "note")
    {
      document.getElementById("note-wrapper").appendChild(noteContainer);
      noteContainer.className = "note-detatched";
      detatchBtn.innerHTML = "Snap back";

      var elem = document, div = noteContainer, x = 0, y = 0, mousedown = false;

      function scrollHandler()
      {
        var scrollPosition = window.scrollY;
        var offset = scrollPosition;
        noteContainer.style.transform = 'translateY(' + offset + 'px)';
      }

      div.addEventListener('mousedown', function (e) { 
        window.addEventListener('scroll', scrollHandler);
        // mouse state set to true 
        mousedown = true; 
        // subtract offset 
        x = div.offsetLeft - e.clientX; 
        y = div.offsetTop - e.clientY; 

        noteContainer.style.userSelect = "none";
      }, true); 

      document.addEventListener('mouseup', function (e) { 
        // mouse state set to false 
        noteContainer.style.userSelect = "auto";

        window.removeEventListener("scroll", scrollHandler);

        mousedown = false; 
      }, true); 
      div.addEventListener('mouseup', function (e) { 
        // mouse state set to false 
        noteContainer.style.userSelect = "auto";

        window.removeEventListener("scroll", scrollHandler);

        mousedown = false; 
      }, true); 

      elem.addEventListener('mousemove', function (e) { 
        // Is mouse pressed 
        if (mousedown) { 
            // Now we calculate the difference upwards 
            div.style.left = e.clientX + x + 'px'; 
            div.style.top = e.clientY + y + 'px'; 
        } 
      }, true); 
    } 
    else
    {
      noteContainer.className = "note";
      detatchBtn.innerHTML = "Detatch Note";
      document.getElementById("note_disp").appendChild(noteContainer);

      noteContainer.attributeStyleMap.clear();
    }
  });

  noteHeaderInput.addEventListener("input", function() {
    noteData.header = noteHeaderInput.value;
    console.log("Update note header: " + noteData.header);

    var index = charData.notes.indexOf(noteData);
    if (index === -1){
      charData.notes.push(noteData);
    }
  });

  noteTextInput.addEventListener("input", function() {
    noteData.text = noteTextInput.value;
    console.log("Update note text: " + noteData.text);

    var index = charData.notes.indexOf(noteData);
    if (index === -1){
      charData.notes.push(noteData);
    }
  });
}

function createDicePreset(_sides, _value, _equip) {
  var diceSides = document.getElementById("in_sides");
  var diceStatValue = document.getElementById("in_stat");
  var diceEquipToggle = document.getElementById("in_gear")

  // consists of display, toggle for equip, and select for dx
  console.log("Adding Dice Preset container...");

  var diceContainer = document.createElement("div");
  diceContainer.className = "dice";
  diceContainer.id = "dice";

  var diceHeader = document.createElement("div");
  diceHeader.className = "dice-header"; // TODO: CSS
  if (_sides != undefined && _sides != null)
  {
    diceHeader.innerHTML = _sides;
  }
  else
  {
    diceHeader.innerHTML = diceSides.value;
  }

  var diceStatSelect = document.createElement("select");
  var diceStatOpt_0 = document.createElement("option");
  var diceStatOpt_1 = document.createElement("option");
  var diceStatOpt_2 = document.createElement("option");
  var diceStatOpt_3 = document.createElement("option");
  var diceStatOpt_4 = document.createElement("option");
  var diceStatOpt_5 = document.createElement("option");
  var diceStatOpt_6 = document.createElement("option");
  var diceStatOpt_7 = document.createElement("option");
  var diceStatOpt_8 = document.createElement("option");
  var diceStatOpt_9 = document.createElement("option");
  var diceStatOpt_10 = document.createElement("option");
  diceStatOpt_0.value = "none";
  diceStatOpt_1.value = "str";
  diceStatOpt_2.value = "vit";
  diceStatOpt_3.value = "agi";
  diceStatOpt_4.value = "dex";
  diceStatOpt_5.value = "chr";
  diceStatOpt_6.value = "int";
  diceStatOpt_7.value = "wis";
  diceStatOpt_8.value = "fth";
  diceStatOpt_9.value = "lck";
  diceStatOpt_10.value = "lck";
  diceStatSelect.className = "selectfield extraselectfield";
  
  diceStatSelect.appendChild(diceStatOpt_0);
  diceStatOpt_0.innerHTML = "None";
  diceStatSelect.appendChild(diceStatOpt_1);
  diceStatOpt_1.innerHTML = "Str";
  diceStatSelect.appendChild(diceStatOpt_2);
  diceStatOpt_2.innerHTML = "Vit";
  diceStatSelect.appendChild(diceStatOpt_3);
  diceStatOpt_3.innerHTML = "Agi";
  diceStatSelect.appendChild(diceStatOpt_4);
  diceStatOpt_4.innerHTML = "Dex";
  diceStatSelect.appendChild(diceStatOpt_5);
  diceStatOpt_5.innerHTML = "Chr";
  diceStatSelect.appendChild(diceStatOpt_6);
  diceStatOpt_6.innerHTML = "Int";
  diceStatSelect.appendChild(diceStatOpt_7);
  diceStatOpt_7.innerHTML = "Wis";
  diceStatSelect.appendChild(diceStatOpt_8);
  diceStatOpt_8.innerHTML = "Fth";
  diceStatSelect.appendChild(diceStatOpt_9);
  diceStatOpt_9.innerHTML = "Lck";
  diceStatSelect.appendChild(diceStatOpt_10);
  diceStatOpt_9.innerHTML = "Per";

  var gearHolder = document.createElement("div");
  gearHolder.className = "flex-row-box";

  var gearCheck = document.createElement("input");
  gearCheck.type = "checkbox";
  gearCheck.className = "gear-check-box";

  var gearHeader = document.createElement("span");
  gearHeader.innerHTML = "Include Gear?:";

  var rollbtn = document.createElement("img");
  rollbtn.src = "../Images/dice-icon.png";
  rollbtn.className = "dice-roll-btn";

  var rolloutput = document.createElement("div");
  rolloutput.className = "rollOutputDisp";

  var closeBtn = document.createElement("button");
  closeBtn.className = "closebtn";
  closeBtn.innerHTML = "Remove";

  var detachBtn = document.createElement("button");
  detachBtn.className = "detachbtn";
  detachBtn.innerHTML = "Detach Dice";

  diceContainer.appendChild(diceHeader);
  diceContainer.appendChild(document.createElement("br"));
  diceContainer.appendChild(diceStatSelect);
  diceContainer.appendChild(document.createElement("br"));
  gearHolder.appendChild(gearHeader);
  gearHolder.appendChild(gearCheck);
  diceContainer.appendChild(gearHolder);

  diceContainer.appendChild(rolloutput);
  diceContainer.appendChild(rollbtn);
  diceContainer.appendChild(closeBtn);
  diceContainer.appendChild(detachBtn);

  document.getElementById("dice_disp").appendChild(diceContainer);

  var diceData = {
    sides: diceHeader.innerHTML,
    stat: "",
    gear: true
  };

  if (_value != undefined && _value != null)
  {
    diceStatSelect.value = _value;
  }
  else
  {
    diceStatSelect.value = diceStatValue.value;
  }

  if (_equip != undefined && _equip != null)
  {
    gearCheck.checked = _equip;
  }
  else
  {
    gearCheck.checked = diceEquipToggle.checked;
  }

  diceStatSelect.addEventListener("change", function (){
    diceData.stat = this.value;
    console.log("Update stat header: " + diceData.stat);

    var index = charData.dices.indexOf(diceData);
    if (index === -1){
      charData.dices.push(diceData);
    }
  });

  gearCheck.addEventListener("change", function (){
    diceData.gear = this.checked;
    console.log("Update gear include header: " + diceData.gear);

    var index = charData.dices.indexOf(diceData);
    if (index === -1){
      charData.dices.push(diceData);
    }
  });

  rollbtn.addEventListener("click", function(){
    letDiceShake(rolloutput);

    var display = rolloutput;
    var sides = diceHeader;
    var stat = diceStatSelect.value;
    var gear = gearCheck.checked;
    var max = removeFirstLetterAndParseInt(sides.innerHTML);

    var value = getRandomValue(max);

    if (stat !== "none"){
      value += getCurStatValue(stat, gear);
    }

    display.innerHTML = value;
  });

  closeBtn.addEventListener("click", function() {
    var index = charData.dices.indexOf(diceData);
    if (index !== -1) {
      charData.dices.splice(index, 1);
    }
    diceContainer.remove();
  });

  detachBtn.addEventListener("click", function() {
    if (diceContainer.className === "dice") {
      document.getElementById("note-wrapper").appendChild(diceContainer);
      diceContainer.className = "dice-detatched";
      detachBtn.innerHTML = "Snap back";

      var elem = document,
        div = diceContainer,
        x = 0,
        y = 0,
        mousedown = false;

      function scrollHandler() {
        var scrollPosition = window.scrollY;
        var offset = scrollPosition;
        diceContainer.style.transform = "translateY(" + offset + "px)";
      }

      div.addEventListener(
        "mousedown",
        function(e) {
          window.addEventListener("scroll", scrollHandler);
          // mouse state set to true
          mousedown = true;
          // subtract offset
          x = div.offsetLeft - e.clientX;
          y = div.offsetTop - e.clientY;

          diceContainer.style.userSelect = "none";
        },
        true
      );

      document.addEventListener(
        "mouseup",
        function(e) {
          // mouse state set to false
          diceContainer.style.userSelect = "auto";

          window.removeEventListener("scroll", scrollHandler);

          mousedown = false;
        },
        true
      );
      div.addEventListener(
        "mouseup",
        function(e) {
          // mouse state set to false
          diceContainer.style.userSelect = "auto";

          window.removeEventListener("scroll", scrollHandler);

          mousedown = false;
        },
        true
      );

      elem.addEventListener(
        "mousemove",
        function(e) {
          // Is mouse pressed
          if (mousedown) {
            // Now we calculate the difference upwards
            div.style.left = e.clientX + x + "px";
            div.style.top = e.clientY + y + "px";
          }
        },
        true
      );
    } else {
      diceContainer.className = "dice";
      detachBtn.innerHTML = "Detach Dice";
      document.getElementById("dice_disp").appendChild(diceContainer);

      diceContainer.attributeStyleMap.clear();
    }
  });

  charData.dices.push(diceData);
}

function letDiceShake(elem)
{
  if (elem == null || elem == undefined){
    elem = document.getElementById("rollOutput");
  }

  elem.className = "rollOutputDisp-shake";
  setTimeout(function() {
    elem.className = "rollOutputDisp";
  }, 600);
}

function rollDice()
{
  letDiceShake();

  // is taking in the display element and then displaying it there assuming innerHTML
  var display = document.getElementById("rollOutput");
  var sides = document.getElementById("in_sides");
  var stat = document.getElementById("in_stat").value;
  var gear = document.getElementById("in_gear").checked;

  var max = removeFirstLetterAndParseInt(sides.value);

  value = getRandomValue(max);

  if (stat !== "none"){
    value += getCurStatValue(stat, gear);
  }

  display.innerHTML = value;
}

function justADice()
{
  letDiceShake();

  // is taking in the display element and then displaying it there assuming innerHTML
  var display = document.getElementById("rollOutput");
  var sides = document.getElementById("in_sides");

  var max = removeFirstLetterAndParseInt(sides.value);
  value = getRandomValue(max);

  display.innerHTML = value;
}

function getRandomValue(maximum) {
  return Math.floor(Math.random() * maximum) + 1;
}

function removeFirstLetterAndParseInt(str) {
  var substring = str.substring(1);  // Extract substring starting from index 1
  var intValue = parseInt(substring);  // Parse the substring to an integer
  return intValue;
}

function getCurStatValue(stat, gear){
  var value = 0;
  value += charData.base;
  value += charData[stat];
  console.log(charData[stat]);

  Array.from(charData.debuffStat).forEach(element => {
    if (element.name === stat){
      value += element.amount;
    }
  });

  if (gear){
    Array.from(charData.gearStat).forEach(element => {
      if (element.name === stat){
        value += element.value;
      }
    });
  }

  return value;
}

function editChar()
{
  activateFormElements();

  var btn1 = document.getElementById("editbtn");
  var btn2 = document.getElementById("savebtn");
  
  btn1.style.display = "none";
  btn2.style.display = "block";
}
function saveChar(filename)
{
  console.log(filename);
  submitCharData(filename);

  deactivateFormElements();

  var btn1 = document.getElementById("editbtn");
  var btn2 = document.getElementById("savebtn");
  
  btn2.style.display = "none";
  btn1.style.display = "block";
}

/*
A Blob (Binary Large Object) is a data type used to store binary data, such as files, in JavaScript. 
  It represents an immutable, raw data object that can be used for various purposes, 
  including creating downloadable files, uploading files, and working with binary data.
*/

function downloadCharacterData() 
{
  console.log("Initiate File creation...");

  // Convert the charData object to JSON
  var jsonData = JSON.stringify(charData);

  // Create a new Blob object with the JSON data
  var blob = new Blob([jsonData], { type: 'application/json' });

  // Create a temporary URL for the Blob object
  var url = URL.createObjectURL(blob);

  // Create a temporary <a> element
  var link = document.createElement('a');
  link.href = url;
  link.download = 'character_data.json';

  // Programmatically click the <a> element to trigger the download
  link.click();

  // Clean up the temporary URL and <a> element
  URL.revokeObjectURL(url);
  link.remove();

  console.log("File creation complete...");
}

function handleFileInputChange(filein) 
{
  console.log("Fetching File...");

  var file = document.getElementById('file-input').files[0];

  if (file) {
    processData(file);
  }
  else{
    alert("No viable File!");
  }
}

function processData(file)
{
  console.log("Initiate file read...");

  var reader = new FileReader();
  reader.onload = function(event) {
    var jsonData = event.target.result;
    var parsedData = JSON.parse(jsonData);
    charData = parsedData;
    console.log("Read complete with: " + jsonData);

    document.getElementById("char_display").style.display = "block";
    document.getElementById("readfilebox").style.display = "none";
    displayCharData(true);
  };
  reader.readAsText(file);
}

// send data to server
function submitCharData(filename) {
  console.log("Initiate Char Data submit...");

  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  var url = "../backendscripts/receive_data.php";

  // Specify the URL of the PHP script that will handle the data
  if (filename != undefined && filename != null){
    url = "../backendscripts/receive_data.php?filename=" + filename;
  }

  console.log(url);

  // Open a POST request to the specified URL
  xhr.open("POST", url, true);

  // Set the content type header
  xhr.setRequestHeader("JSONData", "application/json");

  // Convert the charData object to JSON
  var jsonData = JSON.stringify(charData);

  // Send the JSON data in the request body
  xhr.send(jsonData);

  // Define the callback function to handle the response
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        //console.log("Char Data submitted successfully!");
        // Show success alert
        alert("Character data submitted successfully!");
      } else {
        //console.log("Error submitting Char Data!");
        // Show error alert
        alert("Error submitting character data. Please try again.");
      }
    }
  };
}

function logout()
{
  window.location.href = "../backendscripts/login.php?logout=1";
}

function logout_index()
{
  window.location.href = "backendscripts/login.php?logout=1";
}

window.addEventListener('beforeunload', function(){
  var path = window.location.pathname;
  var page = path.split("/").pop();
  if (page != "index.php"){
    logout();
  }
  else{
    logout_index();
  }
});

function setCharData(jsonData){
  charData = jsonData;
  document.getElementById("char_display").style.display = "block";
  displayCharData(true);
}

function displayChar(filename)
{
  window.location.href = "../charsites/charFromServer-display.php?filename=" + filename;
}

function goBackToSession(filename){
  window.location.href = "../sessions/session-display.php?filename=" + filename;
}
