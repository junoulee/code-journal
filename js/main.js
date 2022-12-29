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
  var fieldEntries = { title: titleValue, url: urlValue, notes: notesValue, entryId: data.nextEntryId };
  data.entries.unshift(fieldEntries);

  data.nextEntryId++;

  placeHolder.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();

}

$form.addEventListener('submit', storeValues);

var hiddenDiv = document.querySelector('.journal-entries');

function renderEntry(entry) {

  var bullets = document.createElement('li');
  bullets.classList.add('saved-entries');
  hiddenDiv.appendChild(bullets);

  var listRow = document.createElement('div');
  listRow.classList.add('row');
  bullets.appendChild(listRow);

  var columnHalfOne = document.createElement('div');
  columnHalfOne.classList.add('column-half');
  listRow.appendChild(columnHalfOne);

  var savedPhoto = document.createElement('img');
  savedPhoto.classList.add('saved-photo');
  columnHalfOne.appendChild(savedPhoto);

  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.classList.add('column-half');
  listRow.appendChild(columnHalfTwo);

  var nameTitle = document.createElement('h3');
  nameTitle.classList.add('name-title');
  var titleValueText = document.createTextNode(data.entries.title);
  columnHalfTwo.appendChild(nameTitle);
  nameTitle.appendChild(titleValueText);

  var savedText = document.createElement('p');
  savedText.classList.add('saved-text');
  var notesValueText = document.createTextNode(data.entries.notes);
  columnHalfTwo.appendChild(savedText);
  savedText.appendChild(notesValueText);

  return bullets; // or return bullets

}

function dataLoop() {

  for (var i = 0; i < data.entries.length; i++) {
    var entriesDOM = renderEntry(data.entries[i]);
    hiddenDiv.appendChild(entriesDOM);
  }

}

document.addEventListener('DOMContentLoaded', dataLoop);
