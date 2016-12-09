!function(){var e,n,t;!function(i){function o(e,n){return b.call(e,n)}function l(e,n){var t,i,o,l,c,a,r,s,d,h,u,g=n&&n.split("/"),f=w.map,p=f&&f["*"]||{};if(e&&"."===e.charAt(0))if(n){for(e=e.split("/"),c=e.length-1,w.nodeIdCompat&&k.test(e[c])&&(e[c]=e[c].replace(k,"")),e=g.slice(0,g.length-1).concat(e),d=0;d<e.length;d+=1)if(u=e[d],"."===u)e.splice(d,1),d-=1;else if(".."===u){if(1===d&&(".."===e[2]||".."===e[0]))break;d>0&&(e.splice(d-1,2),d-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((g||p)&&f){for(t=e.split("/"),d=t.length;d>0;d-=1){if(i=t.slice(0,d).join("/"),g)for(h=g.length;h>0;h-=1)if(o=f[g.slice(0,h).join("/")],o&&(o=o[i])){l=o,a=d;break}if(l)break;!r&&p&&p[i]&&(r=p[i],s=d)}!l&&r&&(l=r,a=s),l&&(t.splice(0,a,l),e=t.join("/"))}return e}function c(e,n){return function(){var t=y.call(arguments,0);return"string"!=typeof t[0]&&1===t.length&&t.push(null),g.apply(i,t.concat([e,n]))}}function a(e){return function(n){return l(n,e)}}function r(e){return function(n){v[e]=n}}function s(e){if(o(m,e)){var n=m[e];delete m[e],C[e]=!0,u.apply(i,n)}if(!o(v,e)&&!o(C,e))throw new Error("No "+e);return v[e]}function d(e){var n,t=e?e.indexOf("!"):-1;return t>-1&&(n=e.substring(0,t),e=e.substring(t+1,e.length)),[n,e]}function h(e){return function(){return w&&w.config&&w.config[e]||{}}}var u,g,f,p,v={},m={},w={},C={},b=Object.prototype.hasOwnProperty,y=[].slice,k=/\.js$/;f=function(e,n){var t,i=d(e),o=i[0];return e=i[1],o&&(o=l(o,n),t=s(o)),o?e=t&&t.normalize?t.normalize(e,a(n)):l(e,n):(e=l(e,n),i=d(e),o=i[0],e=i[1],o&&(t=s(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:t}},p={require:function(e){return c(e)},exports:function(e){var n=v[e];return"undefined"!=typeof n?n:v[e]={}},module:function(e){return{id:e,uri:"",exports:v[e],config:h(e)}}},u=function(e,n,t,l){var a,d,h,u,g,w,b=[],y=typeof t;if(l=l||e,"undefined"===y||"function"===y){for(n=!n.length&&t.length?["require","exports","module"]:n,g=0;g<n.length;g+=1)if(u=f(n[g],l),d=u.f,"require"===d)b[g]=p.require(e);else if("exports"===d)b[g]=p.exports(e),w=!0;else if("module"===d)a=b[g]=p.module(e);else if(o(v,d)||o(m,d)||o(C,d))b[g]=s(d);else{if(!u.p)throw new Error(e+" missing "+d);u.p.load(u.n,c(l,!0),r(d),{}),b[g]=v[d]}h=t?t.apply(v[e],b):void 0,e&&(a&&a.exports!==i&&a.exports!==v[e]?v[e]=a.exports:h===i&&w||(v[e]=h))}else e&&(v[e]=t)},e=n=g=function(e,n,t,o,l){if("string"==typeof e)return p[e]?p[e](n):s(f(e,n).f);if(!e.splice){if(w=e,w.deps&&g(w.deps,w.callback),!n)return;n.splice?(e=n,n=t,t=null):e=i}return n=n||function(){},"function"==typeof t&&(t=o,o=l),o?u(i,e,n,t):setTimeout(function(){u(i,e,n,t)},4),g},g.config=function(e){return g(e)},e._defined=v,t=function(e,n,t){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");n.splice||(t=n,n=[]),o(v,e)||o(m,e)||(m[e]=[e,n,t])},t.amd={jQuery:!0}}(),t("../lib/almond",function(){}),t("controllers/templateHelpers",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"init:model",this.addTemplateHelpers),this.listenTo(i.channel("conditions"),"init:thenModel",this.addTemplateHelpers),this.listenTo(i.channel("conditions"),"init:whenModel",this.addTemplateHelpers),this.listenTo(i.channel("conditions"),"init:elseModel",this.addTemplateHelpers)},addTemplateHelpers:function(e){e.set("renderKeySelect",this.renderKeySelect),e.set("renderComparators",this.renderComparators),e.set("renderTriggers",this.renderTriggers),e.set("renderWhenValue",this.renderWhenValue),e.set("renderItemValue",this.renderItemValue)},renderKeySelect:function(e,n){var t=[],o=i.channel("fields").request("get:collection"),l=_.chain(o.models).filter(function(e){return!i.channel("conditions-key-select-field-"+e.get("type")).request("hide",n)||!1}).map(function(e){return label=e.get("admin_label")||e.get("label"),{key:e.get("key"),label:label}}).value();t.push({label:"Fields",type:"field",options:l});var c=i.channel("settings").request("get:setting","calculations");if("when"==n&&0<c.length){var a=c.map(function(e){return{key:e.get("name"),label:e.get("name")}});t.push({label:"Calculations",type:"calc",options:a})}var r=i.channel("conditions").request("get:groupFilters");_.each(r,function(e){t=e(t,n)});var s=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-key-select"),d=s({groups:t,currentValue:e});return d},renderComparators:function(e,n,t){var o={equal:{label:nfcli18n.templateHelperEquals,value:"equal"},notequal:{label:nfcli18n.templateHelperDoesNotEqual,value:"notequal"},contains:{label:nfcli18n.templateHelperContains,value:"contains"},notcontains:{label:nfcli18n.templateHelperDoesNotContain,value:"notcontains"},greater:{label:nfcli18n.templateHelperGreaterThan,value:"greater"},less:{label:nfcli18n.templateHelperLessThan,value:"less"}};if(n)if("calc"==e){var l=_.omit(o,"contains","notcontains");_.extend(l,{lessequal:{label:nfcli18n.templateHelperLessThanOrEqual,value:"lessequal"},greaterequal:{label:nfcli18n.templateHelperGreaterThanOrEqual,value:"greaterequal"}})}else{var c=i.channel("fields").request("get:field",n);if(c){var l=i.channel("conditions-"+c.get("type")).request("get:comparators",o,t);if(!l){var a=i.channel("fields").request("get:type",c.get("type"));l=i.channel("conditions-"+a.get("parentType")).request("get:comparators",o,t)||o}}else var l=o}else var l=o;var r=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-comparators");return r({comparators:l,currentComparator:t})},renderTriggers:function(e,n,t,o){var l={show_field:{label:nfcli18n.templateHelperShowField,value:"show_field"},hide_field:{label:nfcli18n.templateHelperHideField,value:"hide_field"},change_value:{label:nfcli18n.templateHelperChangeValue,value:"change_value"}};if(n&&"field"==e){var c=i.channel("fields").request("get:field",n);if("undefined"!=typeof c){var a=i.channel("fields").request("get:type",c.get("type")),r=i.channel("conditions-"+c.get("type")).request("get:triggers",l);r||(r=i.channel("conditions-"+a.get("parentType")).request("get:triggers",l)||l)}else var r=i.channel("conditions-"+e).request("get:triggers",l)||l}else var r=i.channel("conditions-"+e).request("get:triggers",l)||l;var s=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-triggers");return s({triggers:r,currentTrigger:t})},renderWhenValue:function(e,n,t,o){var l=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-value-default"),c=l({value:o});if(n&&"calc"!=e){var a=i.channel("fields").request("get:field",n);if(a){var r=i.channel("conditions-"+a.get("type")).request("get:valueInput",n,t,o);if(!r){var s=i.channel("fields").request("get:type",a.get("type"));r=i.channel("conditions-"+s.get("parentType")).request("get:valueInput",n,t,o)||c}}else r=c}else var r=c;return r},renderItemValue:function(e,n,t){if("change_value"!=n&&"select_option"!=n&&"deselect_option"!=n&&"show_option"!=n&&"hide_option"!=n)return"";var o=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-value-default"),l=o({value:t});if(e){var c=i.channel("fields").request("get:field",e);if("undefined"!=typeof c){var a=i.channel("fields").request("get:type",c.get("type")),r=i.channel("conditions-"+c.get("type")).request("get:valueInput",e,n,t);r||(r=i.channel("conditions-"+a.get("parentType")).request("get:valueInput",e,n,t)||l)}}else var r=l;return r}});return e}),t("views/advanced/whenItem",[],function(){var e=Marionette.ItemView.extend({template:"#tmpl-nf-cl-advanced-when-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting","click .nf-remove-when":"clickRemove"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)},clickRemove:function(e){i.channel("conditions").trigger("click:removeWhen",e,this.model)}});return e}),t("views/advanced/firstWhenItem",[],function(){var e=Marionette.ItemView.extend({template:"#tmpl-nf-cl-advanced-first-when-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)}});return e}),t("views/advanced/whenCollection",["views/advanced/whenItem","views/advanced/firstWhenItem"],function(e,n){var t=Marionette.CollectionView.extend({getChildView:function(t){return t.collection.first()==t?n:e},initialize:function(e){this.firstWhenDiv=e.firstWhenDiv,this.conditionModel=e.conditionModel},attachHtml:function(e,n,t){0==t?this.firstWhenDiv.append(n.el):this.conditionModel.get("collapsed")||(e.isBuffering?e._bufferedChildren.splice(t,0,n):e._insertBefore(n,t)||e._insertAfter(n))}});return t}),t("views/advanced/thenItem",[],function(){var e=Marionette.ItemView.extend({template:"#tmpl-nf-cl-trigger-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting","click .nf-remove-then":"clickRemove"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model),i.channel("conditions").trigger("change:then",e,this.model)},clickRemove:function(e){i.channel("conditions").trigger("click:removeThen",e,this.model)}});return e}),t("views/advanced/thenCollection",["views/advanced/thenItem"],function(e){var n=Marionette.CollectionView.extend({childView:e,initialize:function(e){}});return n}),t("views/advanced/elseItem",[],function(){var e=Marionette.ItemView.extend({template:"#tmpl-nf-cl-trigger-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting","click .nf-remove-else":"clickRemove"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)},clickRemove:function(e){i.channel("conditions").trigger("click:removeElse",e,this.model)}});return e}),t("views/advanced/elseCollection",["views/advanced/elseItem"],function(e){var n=Marionette.CollectionView.extend({childView:e,initialize:function(e){}});return n}),t("views/advanced/conditionItem",["views/advanced/whenCollection","views/advanced/thenCollection","views/advanced/elseCollection"],function(e,n,t){var o=Marionette.LayoutView.extend({template:"#tmpl-nf-cl-advanced-condition",regions:{when:".nf-when-region",then:".nf-then-region",else:".nf-else-region"},initialize:function(){this.listenTo(this.model,"change:collapsed",this.render),this.listenTo(i.channel("drawer"),"closed",this.drawerClosed)},onRender:function(){var i=jQuery(this.el).find(".nf-first-when");this.when.show(new e({collection:this.model.get("when"),firstWhenDiv:i,conditionModel:this.model})),this.model.get("collapsed")||(this.then.show(new n({collection:this.model.get("then")})),this.else.show(new t({collection:this.model.get("else")})))},events:{"click .nf-remove-condition":"clickRemove","click .nf-collapse-condition":"clickCollapse","click .nf-add-when":"clickAddWhen","click .nf-add-then":"clickAddThen","click .nf-add-else":"clickAddElse"},clickRemove:function(e){i.channel("conditions").trigger("click:removeCondition",e,this.model)},clickCollapse:function(e){i.channel("conditions").trigger("click:collapseCondition",e,this.model)},clickAddWhen:function(e){i.channel("conditions").trigger("click:addWhen",e,this.model)},clickAddThen:function(e){i.channel("conditions").trigger("click:addThen",e,this.model)},clickAddElse:function(e){i.channel("conditions").trigger("click:addElse",e,this.model)}});return o}),t("views/advanced/conditionCollection",["views/advanced/conditionItem"],function(e){var n=Marionette.CollectionView.extend({childView:e,initialize:function(e){this.collection=e.dataModel.get("conditions")},onShow:function(){0==this.collection.length&&this.collection.add({})},onBeforeDestroy:function(){0==this.collection.length||1<this.collection.length||""==this.collection.models[0].get("when").models[0].get("key")&&this.collection.reset()}});return n}),t("views/actions/whenItem",[],function(){var e=Marionette.ItemView.extend({template:"#tmpl-nf-cl-actions-condition-when",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting","click .nf-remove-when":"clickRemove"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)},clickRemove:function(e){i.channel("conditions").trigger("click:removeWhen",e,this.model)}});return e}),t("views/actions/whenCollection",["views/actions/whenItem"],function(e){var n=Marionette.CollectionView.extend({childView:e,initialize:function(e){},onShow:function(){0==this.collection.length&&this.collection.add({})},onBeforeDestroy:function(){0==this.collection.length||1<this.collection.length||""==this.collection.models[0].get("key")&&this.collection.reset()}});return n}),t("views/actions/conditionLayout",["views/actions/whenCollection"],function(e){var n=Marionette.LayoutView.extend({template:"#tmpl-nf-cl-actions-condition-layout",regions:{when:".nf-when"},initialize:function(e){this.model=e.dataModel.get("conditions"),e.dataModel.get("conditions")&&(this.collection=e.dataModel.get("conditions").get("when"),this.conditionModel=e.dataModel.get("conditions"))},onRender:function(){this.collection&&this.when.show(new e({collection:this.collection}))},events:{"change .condition-setting":"changeSetting","click .nf-add-when":"clickAddWhen"},clickAddWhen:function(e){i.channel("conditions").trigger("click:addWhen",e,this.model)},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)}});return n}),t("controllers/returnChildView",["views/advanced/conditionCollection","views/actions/conditionLayout"],function(e,n){var t=Marionette.Object.extend({initialize:function(){i.channel("advanced_conditions").reply("get:settingChildView",this.getAdvancedChildView),i.channel("action_conditions").reply("get:settingChildView",this.getActionChildView)},getAdvancedChildView:function(n){return e},getActionChildView:function(e){return n}});return t}),t("models/whenModel",[],function(){var e=Backbone.Model.extend({defaults:{connector:"AND",key:"",comparator:"",value:"",type:"field",modelType:"when"},initialize:function(){i.channel("conditions").trigger("init:whenModel",this)}});return e}),t("models/whenCollection",["models/whenModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("models/thenModel",[],function(){var e=Backbone.Model.extend({defaults:{key:"",trigger:"",value:"",type:"field",modelType:"then"},initialize:function(){i.channel("conditions").trigger("init:thenModel",this)}});return e}),t("models/thenCollection",["models/thenModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("models/elseModel",[],function(){var e=Backbone.Model.extend({defaults:{key:"",trigger:"",value:"",type:"field",modelType:"else"},initialize:function(){i.channel("conditions").trigger("init:elseModel",this)}});return e}),t("models/elseCollection",["models/elseModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("models/conditionModel",["models/whenCollection","models/thenCollection","models/elseCollection"],function(e,n,t){var o=Backbone.Model.extend({defaults:{collapsed:!1,process:1,connector:"all",when:[{}],then:[{}],else:[]},initialize:function(){this.set("when",new e(this.get("when"),{conditionModel:this})),this.set("then",new n(this.get("then"),{conditionModel:this})),this.set("else",new t(this.get("else"),{conditionModel:this})),i.channel("conditions").trigger("init:model",this)}});return o}),t("models/conditionCollection",["models/conditionModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("views/drawerHeader",[],function(){var e=Marionette.ItemView.extend({template:"#tmpl-nf-cl-advanced-drawer-header",events:{"click .nf-add-new":"clickAddNew"},clickAddNew:function(e){i.channel("conditions").trigger("click:addNew",e)}});return e}),t("controllers/newCondition",["models/whenCollection","models/whenModel"],function(e,n){var t=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"click:addNew",this.addNew)},addNew:function(e){var n=i.channel("settings").request("get:setting","conditions"),t=n.add({}),o={object:"Condition",label:nfcli18n.newConditionCondition,change:"Added",dashicon:"plus-alt"},l={collection:n};i.channel("changes").request("register:change","addCondition",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")}});return t}),t("controllers/updateSettings",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"change:setting",this.updateSetting)},updateSetting:function(e,n){var t=jQuery(e.target).val(),o=jQuery(e.target).data("id"),l=n.get(o);jQuery(e.target).find(":selected").data("type")&&n.set("type",jQuery(e.target).find(":selected").data("type")),n.set(o,t);var c=t,a={attr:o,before:l,after:c},r="undefined"==typeof n.collection?n:n.collection.options.conditionModel,s={conditionModel:r},d={object:"Condition",label:"Condition",change:"Changed "+o+" from "+l+" to "+c};i.channel("changes").request("register:change","changeSetting",n,a,d,s),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")}});return e}),t("controllers/clickControls",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"click:removeCondition",this.removeCondition),this.listenTo(i.channel("conditions"),"click:collapseCondition",this.collapseCondition),this.listenTo(i.channel("conditions"),"click:removeWhen",this.removeWhen),this.listenTo(i.channel("conditions"),"click:removeThen",this.removeThen),this.listenTo(i.channel("conditions"),"click:removeElse",this.removeElse),this.listenTo(i.channel("conditions"),"click:addWhen",this.addWhen),this.listenTo(i.channel("conditions"),"click:addThen",this.addThen),this.listenTo(i.channel("conditions"),"click:addElse",this.addElse)},removeCondition:function(e,n){var t=n.collection;n.collection.remove(n);var o={object:"Condition",label:nfcli18n.clickControlsConditionlabel,change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeCondition",n,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},collapseCondition:function(e,n){n.set("collapsed",!n.get("collapsed"))},removeWhen:function(e,n){var t=n.collection;this.removeItem(n);var o={object:"Condition - When",label:nfcli18n.clickControlsConditionWhen,change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeWhen",n,null,o,l)},removeThen:function(e,n){var t=n.collection;this.removeItem(n);var o={object:"Condition - Then",label:nfcli18n.clickControlsConditionThen,change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeThen",n,null,o,l)},removeElse:function(e,n){var t=n.collection;this.removeItem(n);var o={object:"Condition - Else",label:nfcli18n.clickControlsConditionElse,change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeElse",n,null,o,l)},removeItem:function(e){e.collection.remove(e),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},addWhen:function(e,n){var t=n.get("when").add({}),o={object:"Condition - When Criteron",label:nfcli18n.clickControlsConditionWhenCriteron,change:"Added",dashicon:"plus-alt"},l={conditionModel:n};i.channel("changes").request("register:change","addWhen",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},addThen:function(e,n){var t=n.get("then").add({}),o={object:"Condition - Do Item",label:nfcli18n.clickControlsConditionDoItem,change:"Added",dashicon:"plus-alt"},l={conditionModel:n};i.channel("changes").request("register:change","addThen",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},addElse:function(e,n){var t=n.get("else").add({}),o={object:"Condition - Else Item",label:nfcli18n.clickControlsConditionElseItem,change:"Added",dashicon:"plus-alt"},l={conditionModel:n};i.channel("changes").request("register:change","addElse",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")}});return e}),t("controllers/undo",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("changes").reply("undo:addCondition",this.undoAddCondition,this),i.channel("changes").reply("undo:removeCondition",this.undoRemoveCondition,this),i.channel("changes").reply("undo:addWhen",this.undoAddWhen,this),i.channel("changes").reply("undo:addThen",this.undoAddThen,this),i.channel("changes").reply("undo:addElse",this.undoAddElse,this),i.channel("changes").reply("undo:removeWhen",this.undoRemoveWhen,this),i.channel("changes").reply("undo:removeThen",this.undoRemoveThen,this),i.channel("changes").reply("undo:removeElse",this.undoRemoveElse,this)},undoAddCondition:function(e,n){var t=e.get("model"),o=e.get("data");o.collection.remove(t);var l=i.channel("changes").request("get:collection"),c=l.where(function(e){return!!((e=t)||"undefined"!=typeof e.get("data").conditionModel&&e.get("data").conditionModel==t)});_.each(c,function(e){l.remove(e)}),this.maybeRemoveChange(e,n)},undoRemoveCondition:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},undoAddWhen:function(e,n){var t=e.get("model"),i=e.get("data");i.conditionModel.get("when").remove(t),this.maybeRemoveChange(e,n)},undoAddThen:function(e,n){var t=e.get("model"),i=e.get("data");i.conditionModel.get("then").remove(t),this.maybeRemoveChange(e,n)},undoAddElse:function(e,n){var t=e.get("model"),i=e.get("data");i.conditionModel.get("else").remove(t),this.maybeRemoveChange(e,n)},undoRemoveWhen:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},undoRemoveThen:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},undoRemoveElse:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},maybeRemoveChange:function(e,n){var n="undefined"!=typeof n&&n;if(!n){i.channel("app").request("update:db");var t=i.channel("changes").request("get:collection");t.remove(e),0==t.length&&(i.channel("app").request("update:setting","clean",!0),i.channel("app").request("close:drawer"))}}});return e}),t("controllers/maybeModifyElse",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"change:then",this.maybeAddElse)},maybeAddElse:function(e,n){var t=!1,i=jQuery(e.target).val();switch(i){case"show_field":t="hide_field";break;case"hide_field":t="show_field";break;case"show_option":break;case"hide_option":}if(t){var o=n.collection.options.conditionModel;"undefined"==typeof o.get("else").findWhere({key:n.get("key"),trigger:t})&&o.get("else").add({type:n.get("type"),key:n.get("key"),trigger:t})}}});return e}),t("controllers/coreValues",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("conditions-checkbox").reply("get:valueInput",this.getCheckboxValue),i.channel("conditions-list").reply("get:valueInput",this.getListValue),i.channel("conditions-listcountry").reply("get:valueInput",this.getListCountryValue)},getCheckboxValue:function(e,n,t){var i=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-value-checkbox");return i({value:t})},getListValue:function(e,n,t){var o=i.channel("fields").request("get:field",e),l=o.get("options"),c=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-value-list");return c({options:l,value:t})},getListCountryValue:function(e,n,t){var o=i.channel("fields").request("get:field",e),l=o.get("options"),c=Backbone.Radio.channel("app").request("get:template","#tmpl-nf-cl-value-list");return l.reset(),_.each(nfListCountries,function(e,n){l.add({label:n,value:e})}),c({options:l,value:t})}});return e}),t("controllers/coreComparators",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("conditions-checkbox").reply("get:comparators",this.getCheckboxComparators),i.channel("conditions-listradio").reply("get:comparators",this.getListSingleComparators),i.channel("conditions-listselect").reply("get:comparators",this.getListSingleComparators),i.channel("conditions-list").reply("get:comparators",this.getListComparators)},getCheckboxComparators:function(e){return{is:{label:nfcli18n.coreComparatorsIs,value:"equal"},isnot:{label:nfcli18n.coreComparatorsIsNot,value:"notequal"}}},getListComparators:function(e){return{has:{label:nfcli18n.coreComparatorsHasSelected,value:"contains"},hasnot:{label:nfcli18n.coreComparatorsDoesNotHaveSelected,value:"notcontains"}}},getListSingleComparators:function(e,n){return"contains"==n||"notcontains"==n?{has:{label:nfcli18n.coreComparatorsHasSelected,value:"contains"},hasnot:{label:nfcli18n.coreComparatorsDoesNotHaveSelected,value:"notcontains"}}:{has:{label:nfcli18n.coreComparatorsHasSelected,value:"equal"},hasnot:{label:nfcli18n.coreComparatorsDoesNotHaveSelected,value:"notequal"}}}});return e}),t("controllers/coreTriggers",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("conditions-list").reply("get:triggers",this.getListTriggers),i.channel("conditions-submit").reply("get:triggers",this.getSubmitTriggers)},getListTriggers:function(e){var n=_.extend(e,{select_option:{label:nfcli18n.coreTriggersSelectOption,value:"select_option"},deselect_option:{label:nfcli18n.coreTriggersDeselectOption,value:"deselect_option"},show_option:{label:nfcli18n.coreTriggersShowOption,value:"show_option"},hide_option:{label:nfcli18n.coreTriggersHideOption,value:"hide_option"}}),n=_.omit(e,"change_value");return n},getSubmitTriggers:function(e){return _.omit(e,"change_value")}});return e}),t("controllers/getDrawerHeader",["views/drawerHeader"],function(e){var n=Marionette.Object.extend({initialize:function(){i.channel("conditional_logic").reply("get:drawerHeaderView",this.getDrawerHeaderView,this)},getDrawerHeaderView:function(){return e}});return n}),t("controllers/trackKeyChanges",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"init:whenModel",this.registerKeyChangeTracker),this.listenTo(i.channel("conditions"),"init:thenModel",this.registerKeyChangeTracker),this.listenTo(i.channel("conditions"),"init:elseModel",this.registerKeyChangeTracker)},registerKeyChangeTracker:function(e){e.listenTo(i.channel("app"),"replace:fieldKey",this.updateKey,e)},updateKey:function(e,n,t){var i=n._previousAttributes.key,o=n.get("key");this.get("key")==i&&this.set("key",o)}});return e}),t("controllers/maybeConvertConditions",["models/conditionModel"],function(e){var n=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("actions"),"init:actionModel",this.maybeConvertConditions)},maybeConvertConditions:function(n){var t=n.get("conditions");t?!1==t instanceof Backbone.Model&&n.set("conditions",new e(t)):n.set("conditions",new e)}});return n}),t("controllers/filters",[],function(){var e=Marionette.Object.extend({filters:[],initialize:function(){i.channel("conditions").reply("add:groupFilter",this.addFilter,this),i.channel("conditions").reply("get:groupFilters",this.getFilters,this)},addFilter:function(e){this.filters.push(e)},getFilters:function(){return this.filters}});return e}),t("controllers/loadControllers",["controllers/templateHelpers","controllers/returnChildView","models/conditionCollection","views/drawerHeader","controllers/newCondition","controllers/updateSettings","controllers/clickControls","controllers/undo","controllers/maybeModifyElse","controllers/coreValues","controllers/coreComparators","controllers/coreTriggers","controllers/getDrawerHeader","controllers/trackKeyChanges","controllers/maybeConvertConditions","controllers/filters"],function(e,n,t,i,o,l,c,a,r,s,d,h,u,g,f,p){var v=Marionette.Object.extend({initialize:function(){new e,new n,new o,new l,new c,new a,new r,new s,new d,new h,new u,new g,new f,new p}});return v});var i=Backbone.Radio;n(["controllers/loadControllers","models/conditionCollection"],function(e,n){var t=Marionette.Application.extend({initialize:function(e){this.listenTo(i.channel("app"),"after:appStart",this.afterNFLoad)},onStart:function(){new e},afterNFLoad:function(e){var t=i.channel("settings").request("get:setting","conditions");!1==t instanceof Backbone.Collection&&(t=new n(t),i.channel("settings").request("update:setting","conditions",t,!0))}}),o=new t;o.start()}),t("main",function(){})}();
//# sourceMappingURL=almond.build.js.map
//# sourceMappingURL=builder.js.map
