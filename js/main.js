var photoPreview = document.querySelector('#photoURL');
var $form = document.querySelector('.journal-form');

function showPic(event) {
  photoPreview.setAttribute('src', event.target.value);

}

photoPreview.addEventListener('input', showPic);

function storeValues(event) {
  event.preventDefault();
  var titleValue = $form.elements.title.value;

  var urlValue = $form.elements.url.value;
  var notesValue = $form.elements.notes.value;
  var object = { title: titleValue, url: urlValue, notes: notesValue };
  return object;
}

$form.addEventListener('submit', storeValues);
