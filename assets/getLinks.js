const allAs = document.getElementsByTagName("a");
const arr = Array.from(allAs).map(element => element.href);
const filteredArr = arr.filter((element) => {
  return /^https:\/\/www\.facebook\.com\/((\w|\d|\_|\.)+|(profile\.php\?id=\d+))$/.test(element);
});
let uniqueFilteredArr = [...new Set(filteredArr)];
let text = uniqueFilteredArr.join("\n");
prompt("Please copy links:", text);