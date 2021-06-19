function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL }, 'google_translate_element');
}

var i = document.getElementById('google_translate_element');
console.log(i);

