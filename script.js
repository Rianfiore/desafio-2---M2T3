const token = "1040|8X3z8sZE8oI9nNfykihyaXilzmBnssdv",
  url = `https://api.invertexto.com/v1/faker?token=${token}&locale=pt_BR`,
  data = apiGet(url),
  serVivo = {
    nome: data.name,
    idade: calcBirthDate("age", data.birth_date),
    humano: Math.random() < 0.5,
    diaAniversario: calcBirthDate("day", data.birth_date),
    mesAniversario: calcBirthDate("month", data.birth_date),
    anoAniversario: calcBirthDate("year", data.birth_date),
  };
let fullAge,
  pluralAdd = serVivo.idade === 1 ? "" : "s",
  isHuman = serVivo.humano ? "sou humano" : "não sou humano";

function apiGet(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return JSON.parse(request.responseText);
}

function checkMonthBirthday(month) {
  return month === "01" || serVivo.mesAniversario === "12"
    ? "Faço aniversário em Janeiro ou Dezembro."
    : "Não faço aniversário em Janeiro ou Dezembro.";
}

function checkNameCondition(type, name) {
  const nome = name.split(" ")[0],
    sobrenome = name.split(" ")[1];

  switch (type) {
    case "letterR":
      return nome[0] === "R"
        ? "Meu nome começa com a letra R."
        : "Meu nome não começa com a letra R.";
    case "maxLength":
      return nome[0] === "E" || sobrenome > 6
        ? "Meu nome inicia com 'E' ou meu sobrenome tem mais de 6 letras."
        : "";
    default:
      return "Erro: tipo não encontrado";
  }
}

function calcBirthDate(type, birthDate) {
  const date = birthDate.split("-");

  switch (type) {
    case "age":
      const dateNow = new Date().getFullYear();
      return dateNow - date[0];
    case "day":
      return date[2];
    case "month":
      return date[1];
    case "year":
      return date[0];
    default:
      return "Erro: tipo não encontrado.";
  }
}

serVivo.idade >= 18
  ? (fullAge = "maior de idade")
  : (fullAge = "menor de idade");

console.log(`Olá! Meu nome é ${serVivo.nome}`);
console.log(`Tenho ${serVivo.idade} ano${pluralAdd} de idade.`);
console.log(`Eu sou ${fullAge} e ${isHuman}.`);
console.log(checkMonthBirthday(serVivo.mesAniversario));
console.log(checkNameCondition("letterR", serVivo.nome));
console.log(checkNameCondition("maxLength", serVivo.nome));
