/**
 * CheckAll v1.0 jQuery Plugin
 * 
 * 1) check/uncheck all checkboxes within a fieldset when "checkall" checkbox is checked/unchecked
 * 2) check/uncheck 'checkall' checkbox when all checkboxes within a fieldset are checked/unchecked
 * 
 * Requirements
 * jQuery 1.3.2+ 
 * 
 * @param object options - configuration options
 *   
 */

// create closure
(function($) {
	
	// plugin definition
	$.fn.checkAll = function(options) {
		
		// extend default settings with those provided.
		var settings = $.extend(
			{},
			$.fn.checkAll.defaults,
			options
		);		
		
		// iterate each matched element
		return this.each(function() {
			
			var $this = $(this);
			
			/**
			 * check/uncheck all checkboxes when .checkall checkbox is checked/unchecked
			 */ 
			function toggleCheckAll() {
				
				$this
					.find('.checkall')
					.bind('click', function(e) {
					
						$(this)
							.closest('fieldset')
							.find('input:checkbox')
							.attr('checked', this.checked);
					});
			}
			
			/**
			 * check/uncheck 'checkall' checkbox when all checkboxes are checked/unchecked
			 * 
			 * @param
			 * 	boolean $check_flag  (default:true) //pass false to test for all unchecked 
			 */
			function allChecked($check_flag){
				
				// are we checking for all checked or all unchecked
				// all checked $check_flag = true (default)
				// all unchecked $check_flag = false
				if (typeof($check_flag) == "undefined") {
					$check_flag = true;
				}
				
				$this
					.find('input:checkbox')
					.not('.checkall')
					.bind('click', function(e) {				
					
						// all checked flag
						var $all = true;
						
						$(this)
							.closest('fieldset')
							.find('input:checkbox')
							.not('.checkall')
							.each(function(){

								if (!this.checked == $check_flag) {
									$all = false;
									return false; // break out of each loop
								}
						});
						
						// check/uncheck 'checkall'
						if ($all) {
							$(this)
								.closest('form')
									.find('.checkall')
									.attr('checked', $check_flag);
						}
					});
			}
			
			// check/uncheck all checkboxes
			toggleCheckAll();
			
			// check 'checkall' checkbox when all checkboxes are checked
			allChecked();
			
			// uncheck 'checkall' checkbox when all checkboxes are unchecked
			allChecked(false);
			
		});
		
	};
	
	// plugin default settings
	$.fn.checkAll.defaults = {
		
	};

// end closure
})(jQuery);