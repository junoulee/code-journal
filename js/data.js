/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
function dataStorage(event) {
  var dataModel = JSON.stringify(data);
  localStorage.setItem('project-1-local-storage', dataModel);
}

var previousData = localStorage.getItem('project-1-local-storage');
if (typeof previousData === 'string') {
  data = JSON.parse(previousData);
}
window.addEventListener('beforeunload', dataStorage);
