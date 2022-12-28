var photoPreview = document.querySelector('#photo-url');
var placeHolder = document.querySelector('.placeholder');
var $form = document.querySelector('.journal-form');

function showPic(event) {
  placeHolder.setAttribute('src', event.target.value);
}

photoPreview.addEventListener('input', showPic);

function storeValues(event) {
  event.preventDefault();
  var titleValue = $form.elements.title.value;
  var urlValue = $form.elements.url.value;
  var notesValue = $form.elements.notes.value;
  var fieldEntries = { title: titleValue, url: urlValue, notes: notesValue, entryId: '' };
  return fieldEntries;

}
$form.addEventListener('submit', storeValues);
