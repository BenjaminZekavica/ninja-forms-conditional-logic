jQuery(document).ready(function($) {
	// Backbone View for all of our conditions.
	var ConditionsView = Backbone.View.extend( {
		el: $( '#nf_cl_conditions' ),

		// Watch for events
		events: {
			'click .add-condition': 'addCondition',
			'click .delete-condition': 'deleteCondition',			
			'click .add-cr': 'addCriteria',
			'click .delete-cr': 'deleteCriteria',
			'change .cr-field': 'changeField'
		},

		// Get our view up and running.
		initialize: function() {
			_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
			this.render();
		},

		render: function() {
			// Loop through our conditions and render a view for each.
			if ( typeof nf_cl.conditions != 'undefined' ) {
				for ( id in nf_cl.conditions ) {
					conditionView.render( id );
				}
			}
		},

		addCondition: function( e ) { // Add a new condition
			e.preventDefault();
			// Hide the 'add' button
			// First we have to see if we've clicked the div icon or the button.
			if ( 'DIV' == e.target.tagName ) {
				$( e.target ).parent().hide();
			} else {
				$( e.target ).hide();
			}
			conditionView.render( 'new' );
		},

		deleteCondition: function( e ) {
			e.preventDefault();
			$( e.target ).parent().parent().parent().remove();
			$( this.el ).find( '.nf-cl-add' ).show();
		},

		addCriteria: function( e ) {
			e.preventDefault();
			var cond_id = $( e.target ).data( 'cond-id' );
			var cr_id = 'new';
			var selected_field = '';
			var value = '';
			var compare = '==';
			criteriaView.conditionEl = $( '#nf_cl_condition_' + cond_id );
			criteriaView.renderCriteriaRow( cond_id, cr_id, nf_cl.fields, selected_field, value, compare );
		},

	    deleteCriteria: function( e ) {
	    	e.preventDefault();
	    	targetEl = $( e.target ).parent().parent();
	    	$( targetEl ).remove();
	    },

	    changeField: function( e ) {
	    	e.preventDefault();
	    	var cr_id = $( e.target ).data( 'cr-id' );
	    	var cond_id = $( e.target ).data( 'cond-id' );
	    	var selected_field = $( e.target ).val();
	    	var value = '';
	    	if ( 'new' == cr_id ) {
				var num = $( e.target ).data( 'num' );
				var cr_name = 'conditions[' + cond_id + '][criteria][new][' + num + ']';
				var div_id = 'nf_cr_new_' + num;
			} else {
				var num = '';
				var cr_name = 'conditions[' + cond_id + '][criteria][' + cr_id + ']';
				var div_id = 'nf_cr_' + cr_id;
			}
	    	criteriaView.renderCriteriaValue( cr_id, cr_name, selected_field, value, num, div_id );
	    }


	} );

	// Backbone View for our condition criteria
	var ConditionView = Backbone.View.extend( {
		el: $( '#nf_cl_conditions' ), // attaches `this.el` to an existing element.

		// Get our view up and running.
		initialize: function() {
			_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
		},

		render: function( cond_id ) {
			if ( typeof nf_cl.conditions[ cond_id ] != 'undefined' ) {
				var action = nf_cl.conditions[ cond_id ].action;
				var connector = nf_cl.conditions[ cond_id ].connector;
			} else {
				var action = '';
				var connector = '';
			}

			var tmp = _.template( $( '#tmpl-nf-cl-condition' ).html(), { cond_id: cond_id, action: action, connector: connector } );
			$( this.el ).append( tmp );
			criteriaView.renderCriteriaRows( cond_id );
		}

	} );

	// Backbone View for our condition criteria
	var CriteriaView = Backbone.View.extend( {
		conditionEl: '', // attaches `this.el` to an existing element.

		// Get our view up and running.
		initialize: function() {
			_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
		},

		renderCriteriaRows: function( cond_id ) {
			// If we are working with a new condition, there won't be any criteria rows.
			if ( 'new' == cond_id ) {
				return false;
			}

			this.conditionEl = $( '#nf_cl_condition_' + cond_id );
			var condition = nf_cl.conditions[ cond_id ];
			var criteria = condition.criteria;
			var that = this;
			_.each( criteria, function( cr ) {
				var cr_id = cr.id;
				var selected_field = cr.field;
				var value = cr.value;
				var compare = cr.compare;
				that.renderCriteriaRow( cond_id, cr_id, nf_cl.fields, selected_field, value, compare );	
			} );
		},

		renderCriteriaRow: function ( cond_id, cr_id, fields, selected_field, value, compare ) {
			if ( 'new' == cr_id ) {
				var num = $( this.conditionEl ).find( '.single-criteria' ).length;
				var cr_name = 'conditions[' + cond_id + '][criteria][new][' + num + ']';
				var div_id = 'nf_cr_new_' + num;
				var data_id = 'new-'  + num;
			} else {
				var num = '';
				var cr_name = 'conditions[' + cond_id + '][criteria][' + cr_id + ']';
				var div_id = 'nf_cr_' + cr_id;
				var data_id = cr_id;
			}
			var tmp = _.template( $( '#tmpl-nf-cl-criteria' ).html(), { cr_id: cr_id, cr_name: cr_name, fields: nf_cl.fields, selected_field: selected_field, value: value, compare: compare, num: num, div_id: div_id, data_id: data_id, cond_id: cond_id } );
			$( this.conditionEl ).find( '.nf-cl-criteria' ).append( tmp );
			this.renderCriteriaValue( cr_id, cr_name, selected_field, value, num, div_id );
		},

		renderCriteriaValue: function( cr_id, cr_name, selected_field, value, num, div_id ) {
			var span = $( '#' + div_id ).find( '.cr-value' );
			var tmp = _.template( $( '#tmpl-nf-cl-criteria-value' ).html(), { cr_id: cr_id, cr_name: cr_name, selected_field: selected_field, value: value, num: num } );
			$( span ).html( tmp );	
		}

	} );

	// **CriteriaView instance**: Instantiate main app view.
	var criteriaView = new CriteriaView();

	// **ConditionView instance**: Instantiate main app view.
	var conditionView = new ConditionView();

	// **ConditionsView instance**: Instantiate main app view.
	var conditionsView = new ConditionsView();

	//Listen to the "hidden list value" checkbox.
	$(document).on( 'change', '.ninja-forms-field-list-show-value', function(){
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_list_show_value", "");
		var new_values = new Object();
		if(this.checked){
			$(".ninja-forms-field-" + field_id + "-list-option-value").each(function(){
				var x = this.id.replace("ninja_forms_field_" + field_id + "_list_option_", "");
				x = x.replace("_value_span", "");
				new_values[x] = $(this).children(".ninja-forms-field-list-option-value").val();
			});
			$(".ninja-forms-field-" + field_id + "-list-option-value").show();
			$(".ninja-forms-field-conditional-cr-field").each(function(){
				if(this.value == field_id){
					$(this).nextElementInDom(".ninja-forms-field-conditional-cr-value-list:first").children('option').each(function(){
						this.value = new_values[this.title];
					});
				}
			});
			$(".ninja-forms-field-" + field_id + "-conditional-value").each(function(){
				$(this).children('option').each(function(){
					this.value = new_values[this.title];
				});
			});
		}else{

			$("#ninja_forms_field_" + field_id + "_list_options").children(".ninja-forms-field-" + field_id + "-list-option").find(".ninja-forms-field-list-option-label").each(function(){
				var parent_id = $(this).parent().parent().parent().parent().parent().prop("id");

				var x = parent_id.replace("ninja_forms_field_" + field_id + "_list_option_", "");

				new_values[x] = this.value;
			});
			
			$(".ninja-forms-field-conditional-cr-field").each(function(){
				if(this.value == field_id){
					$(this).nextElementInDom(".ninja-forms-field-conditional-cr-value-list:first").children('option').each(function(){
						this.value = new_values[this.title];
					});
				}
			});	
			
			$(".ninja-forms-field-" + field_id + "-conditional-value").each(function(){
				$(this).children('option').each(function(){
					this.value = new_values[this.title];
				});
			});
			
			$(".ninja-forms-field-" + field_id + "-list-option-value").hide();			
		}
	});
	
	//Conditional Action Change
	$(document).on( 'change', '.ninja-forms-field-conditional-action', function(){
		var value_id = this.id.replace('action', 'value');
		var label_id = this.id.replace('action', 'value_label');
		var form_id = $("#_form_id").val();
		var field_id = $(this).parent().parent().attr("name");
		var conditional_value_type = $("#ninja_forms_field_" + field_id + "_conditional_value_type").val();
		var list_show_value = $("#ninja_forms_field_" + field_id + "_list_show_value").prop("checked");
		var x = $(".ninja-forms-field-" + field_id + "-conditional").length;
		x--;
		var action_slug = this.value;
		var field_data = ninja_forms_serialize_data( field_id );

		$.post(ajaxurl, { form_id: form_id, field_id: field_id,  x: x, action_slug: action_slug, field_data: field_data, action:"ninja_forms_change_action"}, function(response){

			$("#ninja_forms_field_" + field_id + "_" + x + "_value_span").prop("innerHTML", response.new_html);

			if(response.new_type == 'list'){
				$("#" + value_id).children().remove().end();
				$(".ninja-forms-field-" + field_id + "-list-option").each(function(){

					var label = $(this).find(".ninja-forms-field-list-option-label").val();

					if(list_show_value){
						var value = $(this).find(".ninja-forms-field-list-option-value").val();
					}else{
						var value = label;
					}

					var i = this.id.replace("ninja_forms_field_" + field_id + "_list_option_", "");
					$("#" + value_id).append('<option value="' + value + '" title="' + i + '">' + label + '</option>');
				});
			}

		});
	});
	
	//Add New Conditional
	$(document).on( 'click', '.ninja-forms-field-add-conditional', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_add_conditional", "");
		var form_id = $("#_form_id").val();
		var x = $(".ninja-forms-field-" + field_id + "-conditional").length;
		$.post(ajaxurl, { form_id: form_id, field_id: field_id,  x: x, action:"ninja_forms_add_conditional"}, function(response){
			$("#ninja_forms_field_" + field_id + "_conditionals").append(response);
		});
	});

	//Remove Conditional
	$(document).on( 'click', '.ninja-forms-field-remove-conditional', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_remove_conditional", "");
		var x = this.name;
		$("#ninja_forms_field_" + field_id + "_conditional_" + x).remove();	
	});
	
	//Add New Criterion
	$(document).on( 'click', '.ninja-forms-field-add-cr', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_add_cr", "");
		var form_id = $("#_form_id").val();
		var x = this.name;
		var y = $(".ninja-forms-field-" + field_id + "-conditional-" + x + "-cr").length;
		$.post(ajaxurl, { form_id: form_id, field_id: field_id, x: x, y: y, action:"ninja_forms_add_cr"}, function(response){
			$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr").append(response.new_html);
			var title = '';
			var title_id = '';
			$(".ninja-forms-field-title").each(function(){
				title = this.innerHTML;
				if( title.length > 30 ){
					title = title.substring(0,30) + "...";
				}
				title_id = this.id.replace("ninja_forms_field_", "");
				title_id = title_id.replace("_title", "");
				$(".ninja-forms-field-conditional-cr-field > option").each(function(){
					if(this.value == title_id){
						this.text = "ID: " + title_id + " - " + title;
					}
				});
			});
		});
	});
	
	//Remove Criterion
	$(document).on( 'click', '.ninja-forms-field-remove-cr', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_remove_cr", "");
		var x = this.name;
		var y = this.rel;
		$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y).remove();
	});
	
	//Change Criterion Select List
	$(document).on( 'change', '.ninja-forms-field-conditional-cr-field', function(){
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_cr_field", "");
		var tmp = this.title.split("_");
		var x = tmp[0];
		var y = tmp[1];
		var field_value = this.value;
		
		if(this.value != ''){
			$.post(ajaxurl, { field_id: field_id, field_value: field_value, x: x, y: y, output_options: 0, action:"ninja_forms_change_cr_field"}, function(response){
				$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y + "_value").prop("innerHTML", response.new_html);
				if(response.new_type == 'list'){
					$(".ninja-forms-field-" + field_value + "-list-option").each(function(){
						var label = $(this).find(".ninja-forms-field-list-option-label").val();
						if($("#ninja_forms_field_" + field_value + "_list_show_value").prop("checked") == true){
							var value = $(this).find(".ninja-forms-field-list-option-value").val();
						}else{
							var value = label;
						}
						var i = this.id.replace("ninja_forms_field_" + field_value + "_list_option_", "");
						$('select[name="ninja_forms_field_' + field_id + '\\[conditional\\]\\[' + x + '\\]\\[cr\\]\\[' + y + '\\]\\[value\\]"]').append('<option value="' + value + '" title="' + i + '">' + label + '</option>');
					});
				}
			});
		}else{
			$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y + "_value").prop("innerHTML", "");
		}
	});

	//Change Criterion Select List
	$(document).on( 'change', '.ninja-forms-notification-conditional-cr-field', function(){
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_cr_field", "");
		var tmp = this.title.split("_");
		var x = tmp[0];
		var y = tmp[1];
		var field_value = this.value;
		
		if(this.value != ''){
			$.post(ajaxurl, { field_id: field_id, field_value: field_value, x: x, y: y, output_options: 1, action:"ninja_forms_change_cr_field"}, function(response){
				$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y + "_value").prop("innerHTML", response.new_html);
				if(response.new_type == 'list'){
					$(".ninja-forms-field-" + field_value + "-list-option").each(function(){
						var label = $(this).find(".ninja-forms-field-list-option-label").val();
						if($("#ninja_forms_field_" + field_value + "_list_show_value").prop("checked") == true){
							var value = $(this).find(".ninja-forms-field-list-option-value").val();
						}else{
							var value = label;
						}
						var i = this.id.replace("ninja_forms_field_" + field_value + "_list_option_", "");
						$('select[name="ninja_forms_field_' + field_id + '\\[conditional\\]\\[' + x + '\\]\\[cr\\]\\[' + y + '\\]\\[value\\]"]').append('<option value="' + value + '" title="' + i + '">' + label + '</option>');
					});
				}
			});
		}else{
			$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y + "_value").prop("innerHTML", "");
		}
	});
	
}); //Document.ready();

function ninja_forms_serialize_data( field_id ){
	var data = $('input[name^=ninja_forms_field_' + field_id + ']');
	var field_data = jQuery(data).serializeFullArray();
	return field_data;
}