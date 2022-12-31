var photoPreview = document.querySelector('#photo-url');
var placeHolder = document.querySelector('.placeholder');
var $form = document.querySelector('.journal-form');
var hiddenDiv = document.querySelector('.journal-entries');
var toggler = document.querySelector('.no-entries');

var $entries = document.querySelector('.entries');
var $entryForm = document.querySelector('.entry-form');

var isOn = true;

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
  var fieldList = renderEntry(fieldEntries);
  hiddenDiv.prepend(fieldList);
  placeHolder.setAttribute('src', './images/placeholder-image-square.jpg');
  viewSwap('entries');
  if (data.entries) {
    isOn = false;
    toggleNoEntries();
  }
  $form.reset();

}

$form.addEventListener('submit', storeValues);

function renderEntry(entry) {

  var bullets = document.createElement('li');
  bullets.classList.add('saved-entries');

  var listRow = document.createElement('div');
  listRow.classList.add('row');
  bullets.appendChild(listRow);

  var columnHalfOne = document.createElement('div');
  columnHalfOne.classList.add('column-half');
  listRow.appendChild(columnHalfOne);

  var savedPhoto = document.createElement('img');
  savedPhoto.classList.add('saved-photo');
  savedPhoto.setAttribute('src', entry.url);
  columnHalfOne.appendChild(savedPhoto);

  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.classList.add('column-half');
  listRow.appendChild(columnHalfTwo);

  var nameTitle = document.createElement('h3');
  nameTitle.classList.add('name-title');
  var titleValueText = document.createTextNode(entry.title);
  columnHalfTwo.appendChild(nameTitle);
  nameTitle.appendChild(titleValueText);

  var savedText = document.createElement('p');
  savedText.classList.add('saved-text');
  var notesValueText = document.createTextNode(entry.notes);
  columnHalfTwo.appendChild(savedText);
  savedText.appendChild(notesValueText);

  return bullets;

}

function dataLoop() {
  if (isOn === false) {
    for (var i = 0; i < data.entries.length; i++) {
      var entriesDOM = renderEntry(data.entries[i]);
      hiddenDiv.appendChild(entriesDOM);

    }
  }
  viewSwap(data.view);
  if (data.entries) {
    isOn = true;
    toggleNoEntries();

  }
}

document.addEventListener('DOMContentLoaded', dataLoop);

function toggleNoEntries(event) {
  if (isOn === true) {
    toggler.className = 'no-entries';

    isOn = false;

  } else {
    toggler.className = 'no-entries-hidden';
    isOn = true;

  }

}

function viewSwap(view) {

  if ($entries.getAttribute('data-view') === view) {
    $entryForm.className = 'hidden';
    $entries.className = 'entries';
    data.view = 'entries';

  } else if ($entryForm.getAttribute('data-view') === view) {
    $entries.className = 'hidden';
    $entryForm.className = 'entry-form';
    data.view = 'entry-form';
  }

}

var navBar = document.querySelector('#entry-button');
navBar.addEventListener('click', function () {
  viewSwap('entries');
});
var newButton = document.querySelector('#new-button');
newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});
var saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', function () {
  viewSwap('entries');
});
