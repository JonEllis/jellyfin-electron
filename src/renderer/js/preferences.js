const config = require('../../config');

function renderCheckbox(setting, label) {
  let checkedAttr = config.get(setting) ? 'checked' : '';

  console.log('get', setting, config.get(setting));

  let el = document.createElement('div');
  el.innerHTML = [
    '<label class="emby-checkbox-label">',
      '<input type="checkbox" is="emby-checkbox" id="' + setting + '" data-embycheckbox="true" class="emby-checkbox" ' + checkedAttr +' />',
      '<span class="checkboxLabel">' + label + '</span>',
      '<span class="checkboxOutline">',
        '<i class="material-icons checkboxIcon checkboxIcon-checked">check</i>',
        '<i class="material-icons checkboxIcon checkboxIcon-unchecked"></i>',
      '</span>',
    '</label>'
  ].join(' ')

  return el.firstChild;
}

document.addEventListener("DOMContentLoaded", function(event) {
  let settingsForm = document.getElementById('settings-form');

  settingsForm.appendChild(renderCheckbox('startWithServerWindow', 'Always open server window first'));
  settingsForm.appendChild(renderCheckbox('bindMediaKeys', 'Bind global media keys'));
  settingsForm.appendChild(renderCheckbox('showNotifications', 'Show notifications on track change'));
  settingsForm.appendChild(renderCheckbox('showNotificationImages', 'Attempt to add artwork to notifications'));

  let checkboxes = settingsForm.querySelectorAll('.emby-checkbox');

  for (let checkbox of checkboxes) {
    checkbox.addEventListener('change', (e) => {
      let setting = e.target.id;
      let value = !!e.target.checked;

      config.set(setting, value);
    });
  }

});
