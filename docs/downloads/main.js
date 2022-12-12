// Get the name of the tab from the URL.
const tab = location.hash.replace(/^#/, "");
console.log(tab);
$(`button#${tab}-tab`).click();
