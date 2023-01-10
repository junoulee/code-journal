var photoPreview = document.querySelector('#photo-url');
var placeHolder = document.querySelector('.placeholder');
var $form = document.querySelector('.journal-form');
var hiddenDiv = document.querySelector('.journal-entries');
var toggler = document.querySelector('.no-entries');
var $entries = document.querySelector('.entries');
var $entryForm = document.querySelector('.entry-form');
var newEntry = document.querySelector('h2');

function showPic(event) {
  placeHolder.setAttribute('src', event.target.value);
}

photoPreview.addEventListener('input', showPic);

function storeValues(event) {
  event.preventDefault();

  var titleValue = $form.elements.title.value;
  var urlValue = $form.elements.url.value;
  var notesValue = $form.elements.notes.value;
  var entryData = { title: titleValue, url: urlValue, notes: notesValue };

  if (data.editing === null) {

    entryData.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(entryData);
    var $newEntry = renderEntry(entryData);
    hiddenDiv.prepend($newEntry);
  } else {
    entryData.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries.splice(i, 1, entryData);
        var savedEntries = document.querySelectorAll('li');

        for (i = 0; i < savedEntries.length; i++) {
          if (Number(savedEntries[i].getAttribute('data-entry-id')) === entryData.entryId) {
            var updatedEntry = renderEntry(entryData);
            savedEntries[i].replaceWith(updatedEntry);
            redButton.className = 'hidden';
          }
        }
      }
    }
  }
  placeHolder.setAttribute('src', './images/placeholder-image-square.jpg');
  viewSwap('entries');
  toggleNoEntries();
  data.editing = null;
  $form.reset();
}

$form.addEventListener('submit', storeValues);

function renderEntry(entry) {

  var bullets = document.createElement('li');
  bullets.classList.add('saved-entries');
  bullets.setAttribute('data-entry-id', entry.entryId);

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

  var pencil = document.createElement('i');
  pencil.classList.add('fa');
  pencil.classList.add('fa-pencil');
  pencil.setAttribute('data-entry-id', entry.entryId);
  nameTitle.appendChild(pencil);

  var savedText = document.createElement('p');
  savedText.classList.add('saved-text');
  var notesValueText = document.createTextNode(entry.notes);
  columnHalfTwo.appendChild(savedText);
  savedText.appendChild(notesValueText);

  return bullets;
}

function dataLoop() {

  for (var i = 0; i < data.entries.length; i++) {
    var entriesDOM = renderEntry(data.entries[i]);
    hiddenDiv.appendChild(entriesDOM);
  }
  viewSwap(data.view);
  toggleNoEntries();
}

document.addEventListener('DOMContentLoaded', dataLoop);

function toggleNoEntries(event) {
  if (data.entries.length > 0) {
    toggler.className = 'no-entries-hidden';
  } else {
    toggler.className = 'no-entries';
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
    newEntry.textContent = 'New Entry';
    data.editing = null;
    placeHolder.setAttribute('src', './images/placeholder-image-square.jpg');

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

function clickPencil(event) {

  if (event.target.matches('i') === true) {
    viewSwap('entry-form');
    newEntry.textContent = 'Edit Entry';
    for (var i = 0; i < data.entries.length; i++) {
      var targetId = Number(event.target.getAttribute('data-entry-id'));
      if ((data.entries[i].entryId) === targetId) {
        var match = data.entries[i];
        data.editing = match;
        $form.elements.title.value = data.editing.title;
        $form.elements.url.value = data.editing.url;
        $form.elements.notes.value = data.editing.notes;
        placeHolder.setAttribute('src', data.editing.url);
        redButton.className = 'red-button';
      }
    }
  }
}

var faPencil = document.querySelector('ul');
faPencil.addEventListener('click', clickPencil);

function deleteEntry(event) {
  if (event.target === redButton) {
    modalDiv.className = 'modal';
    overlay.className = 'overlay';
  }
}

function cancelModal(event) {
  if (event.target === cancelButton) {
    modalDiv.className = 'hidden';
    overlay.className = 'hidden';
  }
}

function confirmModal(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
      toggleNoEntries();
      var savedEntries = document.querySelectorAll('li');
      for (i = 0; i < savedEntries.length; i++) {
        if (Number(savedEntries[i].getAttribute('data-entry-id')) === data.editing.entryId) {
          savedEntries[i].remove();
        }
      }
    }
  }
  data.editing = null;
  $form.reset();
  modalDiv.className = 'hidden';
  overlay.className = 'hidden';
  redButton.className = 'hidden';
  viewSwap('entries');
}

var redButton = document.querySelector('#red-button');
var modalDiv = document.querySelector('#modal-div');
var overlay = document.querySelector('#overlay-div');
var cancelButton = document.querySelector('#cancel-button');
var confirmButton = document.querySelector('#confirm-button');
redButton.addEventListener('click', deleteEntry);
cancelButton.addEventListener('click', cancelModal);
confirmButton.addEventListener('click', confirmModal);
