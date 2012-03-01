// ==========================================================================
// Project:   Blossom - Modern, Cross-Platform Application Framework
// Copyright: ©2012 Fohr Motion Picture Studios. All rights reserved.
// License:   Licensed under the GPLv3 license (see BLOSSOM-LICENSE).
// ==========================================================================
/*globals BLOSSOM sc_assert */

sc_require('surfaces/container');
sc_require('surfaces/view');

if (BLOSSOM) {

SC.TabSurface = SC.ContainerSurface.extend({

  theme: 'square',

  /**
    The value of the segmented view.

    The SegmentedView's value will always be the value of the currently
    selected button.  Setting this value will change the selected button.
    If you set this value to something that has no matching button, then
    no buttons will be selected.

    @field {Object}
  */
  value: null,

  /**
    Set to true to enabled the segmented view, false to disabled it.
  */
  isEnabled: true,

  /**
    If true, clicking a selected button again will deselect it, setting the
    segmented views value to null.  Defaults to false.
  */
  allowsEmptySelection: false,

  /**
    If true, then clicking on a tab will not deselect the other segments, it
    will simply add or remove it from the selection.
  */
  allowsMultipleSelection: false,

  /**
    If true, it will set the segment value even if an action is defined.
  */
  selectSegmentWhenTriggeringAction: false,

  /**
    If true, titles will be localized before display.
  */
  localize: true,

  align: SC.ALIGN_CENTER,

  /**
    Change the layout direction to make this a vertical set of tabs instead
    of horizontal ones.
  */
  layoutDirection: SC.LAYOUT_HORIZONTAL,

  // ..........................................................
  // SEGMENT DEFINITION
  //

  /**
    The array of items to display.  This can be a simple array of strings,
    objects or hashes.  If you pass objects or hashes, you must also set the
    various itemKey properties to tell the SegmentedView how to extract the
    information it needs.

    @property {Array}
  */
  items: [],

  /**
    The key that contains the title for each item.

    @property {String}
  */
  itemTitleKey: null,

  /**
    The key that contains the value for each item.

    @property {String}
  */
  itemValueKey: null,

  /**
    A key that determines if this item in particular is enabled.  Note if the
    control in general is not enabled, no items will be enabled, even if the
    item's enabled property returns true.

    @property {String}
  */
  itemIsEnabledKey: null,

  /**
    The key that contains the icon for each item.  If omitted, no icons will
    be displayed.

    @property {String}
  */
  itemIconKey: null,

  /**
    The key that contains the desired width for each item.  If omitted, the
    width will autosize.

    @property {String}
  */
  itemWidthKey: null,

  /**
    The key that contains the action for this item.  If defined, then
    selecting this item will fire the action in addition to changing the
    value.  See also itemTargetKey.

    @property {String}
  */
  itemActionKey: null,

  /**
    The key that contains the target for this item.  If this and itemActionKey
    are defined, then this will be the target of the action fired.

    @property {String}
  */
  itemTargetKey: null,

  /**
    The key that contains the key equivalent for each item.  If defined then
    pressing that key equivalent will be like selecting the tab.  Also,
    pressing the Alt or Option key for 3 seconds will display the key
    equivalent in the tab.
  */
  itemKeyEquivalentKey: null,

  updateLayout: function() {
    var segmentedWidget = this._sc_segmentedWidget,
        segmentedWidth = segmentedWidget.get('measuredWidth'),
        viewSurface = this._sc_viewSurface,
        frame = viewSurface.get('frame'),
        myWidth = this.get('frame').width;

    frame.x = myWidth/2 - segmentedWidth/2;
    frame.y = 0;
    frame.width = segmentedWidth;
    frame.height = 24;
    viewSurface.set('frame', frame);
    viewSurface.set('zIndex', 100);

    arguments.callee.base.apply(this, arguments);
  },

  updateDisplay: function() {
    // console.log('SC.TabSurface#updateDisplay()');
    this._sc_viewSurface.updateDisplay();

    arguments.callee.base.apply(this, arguments);
  },

  _sc_viewSurface: null,

  _sc_segmentedWidget: null,

  init: function() {
    arguments.callee.base.apply(this, arguments);
    var viewSurface, segmentedWidget;

    viewSurface = this._sc_viewSurface = SC.View.create();

    segmentedWidget = this._sc_segmentedWidget = SC.SegmentedWidget.create({
      themeBinding:                             SC.Binding.from('theme',                             this).oneWay().noDelay(),
      valueBinding:                             SC.Binding.from('value',                             this).oneWay().noDelay(),
      isEnabledBinding:                         SC.Binding.from('isEnabled',                         this).oneWay().noDelay(),
      allowsEmptySelectionBinding:              SC.Binding.from('allowsEmptySelection',              this).oneWay().noDelay(),
      allowsMultipleSelectionBinding:           SC.Binding.from('allowsMultipleSelection',           this).oneWay().noDelay(),
      selectSegmentWhenTriggeringActionBinding: SC.Binding.from('selectSegmentWhenTriggeringAction', this).oneWay().noDelay(),
      localizeBinding:                          SC.Binding.from('localize',                          this).oneWay().noDelay(),
      alignBinding:                             SC.Binding.from('align',                             this).oneWay().noDelay(),
      layoutDirectionBinding:                   SC.Binding.from('layoutDirection',                   this).oneWay().noDelay(),
      itemsBinding:                             SC.Binding.from('items',                             this).oneWay().noDelay(),
      itemTitleKeyBinding:                      SC.Binding.from('itemTitleKey',                      this).oneWay().noDelay(),
      itemValueKeyBinding:                      SC.Binding.from('itemValueKey',                      this).oneWay().noDelay(),
      itemIsEnabledKeyBinding:                  SC.Binding.from('itemIsEnabledKey',                  this).oneWay().noDelay(),
      itemIconKeyBinding:                       SC.Binding.from('itemIconKey',                       this).oneWay().noDelay(),
      itemWidthKeyBinding:                      SC.Binding.from('itemWidthKey',                      this).oneWay().noDelay(),
      itemActionKeyBinding:                     SC.Binding.from('itemActionKey',                     this).oneWay().noDelay(),
      itemTargetKeyBinding:                     SC.Binding.from('itemTargetKey',                     this).oneWay().noDelay(),
      itemKeyEquivalentKeyBinding:              SC.Binding.from('itemKeyEquivalentKey',              this).oneWay().noDelay()
    });

    viewSurface.get('layers').pushObject(segmentedWidget);
    this.get('subsurfaces').pushObject(viewSurface);
  }

});

} // BLOSSOM