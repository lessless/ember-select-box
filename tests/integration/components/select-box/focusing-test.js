import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('', 'select-box (focusing)', {
  integration: true
});



test('focus class name', function(assert) {
  assert.expect(3);

  let isFocused = () => {
    return this.$('.select-box').hasClass('is-focused');
  };

  this.render(hbs `{{select-box}}`);

  assert.ok(!isFocused(),
    'precondition, not focused');

  this.$('.select-box').trigger('focus');

  assert.ok(isFocused(),
    'a focused select box has an appropriate class name');

  this.$('.select-box').trigger('blur');

  assert.ok(!isFocused(),
    'the focused class name is removed when the select box is blurred');
});


test('tabindex', function(assert) {
  assert.expect(4);

  let tabindex = () => {
    return this.$('.select-box').attr('tabindex');
  };

  this.render(hbs `{{select-box}}`);

  assert.equal(tabindex(), '0',
    'it should be possible to focus a select box');

  this.render(hbs `{{select-box disabled=true}}`);

  assert.equal(tabindex(), '-1',
    'it should not be possible to focus a disabled select box');

  this.render(hbs `{{select-box tabindex=5}}`);

  assert.equal(tabindex(), '5',
    'can set the tabindex');

  this.render(hbs `
    {{#select-box as |sb|}}
      {{sb.input}}
    {{/select-box}}
  `);

  assert.equal(tabindex(), '-1',
    'a select box should not be focusable if it contains an input ' +
    'instead, pressing tab should jump directly to the input');
});
