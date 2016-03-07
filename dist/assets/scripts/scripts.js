/*-----------------------
  @MODULE
------------------------*/
if (typeof ww == 'undefined') {
  var ww = {};
}

/*-----------------------
  @MAIN
------------------------*/
ww.main = (function() {
  return {
    init: function() {
      this.register_events();
    },

    register_events: function() {
      ww.ub_modal.init();
      ww.tabs.init();
      ww.push_menu.init();
    },
  };
})();

/*-----------------------
  @URBANK MODAL
------------------------*/
ww.ub_modal = (function(){
  return {
    init: function() {
      // Does element exist?
    	if (!$('a.modal').length) {
    		return;
    	}

    	function sizeModal() {
    		// Modal dimensions.
    		var $modal = $('#modal_window');
    		var $modal_width = $modal.outerWidth();
    		var $modal_height = $modal.outerHeight();
    		var $modal_top = '-' + Math.floor($modal_height / 2) + 'px';
    		var $modal_left = '-' + Math.floor($modal_width / 2) + 'px';

    		// Set modal.
    		$('#modal_window').css('margin-top', $modal_top).css('margin-left', $modal_left);
    	}

    	// Reveal the modal.
    	function showModal() {

    		// Unveil the wrapper.
    		$('#modal_wrapper').show();

    		// Size it.
    		sizeModal();

    		// Reveal modal window.
    		$('#modal_window').css('visibility', 'visible').show();

    		// Resize as images load.
    		$('#modal_content img').each(function() {
    			$(this).load(function() {
    				$(this).removeClass('modal_placeholder').show();
    				sizeModal();
    			});
    		});
    	}

    	// Insert modal at end of </body>.
    	$('body').append('<div id="modal_wrapper"><div id="modal_overlay"></div><div id="modal_window"><div id="modal_bar" class="span_12_of_12"><a href="#" id="modal_close">Close</a></div><div id="modal_content"></div></div>');

    	// Look for modal links.
    	$('a.modal').click(function() {

    		// Check the href="..."
    		var $the_link = $(this).attr('href');

    		// Determine link target.
    		if ($the_link.match(/^#./)) {

    			// Assume #anchor content.
    			$('#modal_content').html($($(this).attr('href')).html());
    			showModal();

    		} else if ($the_link.match(/.jpg$/) || $the_link.match(/.png$/) || $the_link.match(/.gif$/)) {
    			// Assume image content.
    			$('#modal_content').html('<p id="modal_image_wrapper"><img src="' + $the_link + '" class="modal_placeholder" /></p>');
    			showModal();
    		} else {
    			// Assume external Ajax content - not used but can be added as additonal options.
    			$('#modal_content').load($(this).attr('href').replace('#', ' #'), '', showModal);
    		}
    		// Nofollow.
    		this.blur();
    		return false;
    	});

    	// Hide modal elements.
    	$('#modal_overlay, #modal_close').click(function() {
    		// Hide the modal.
    		$('#modal_wrapper').hide();
    		// Hide, because images might load later.
    		$('#modal_window').css('visibility', 'hidden');
    		// Unbind image listeners.
    		$('#modal_content img').each(function() {
    			$(this).unbind();
    		});

    		// Destroy modal content.
    		$('#modal_content').html('');

    		// Nofollow.
    		this.blur();
    		return false;
    	});

    }
  }
})();

 /*-----------------------
   PUSH MENU
 ------------------------*/
 ww.push_menu = (function(){
   return {
     init: function() {
       /* Push the body and the nav over by 285px over */
        $('.icon-menu').click(function() {
          $('.menu').animate({
            left: "0px"
          }, 200);

          $('body').animate({
            left: "285px"
          }, 200);
        });

        /* Then push them back */
        $('.icon-close').click(function() {
          $('.menu').animate({
            left: "-285px"
          }, 200);

          $('body').animate({
            left: "0px"
          }, 200);
        });
     }
   };
 })();

/*-----------------------
  URBANK TABBED CONTENT
------------------------*/
ww.tabs = (function(){
  return {
    init: function() {
      if (!$('ul.tabs').length) {
        return;
      }
      // Reveal initial content area(s).
      $('div.tab_content_wrap').each(function() {
        $(this).find('div.tab_content:first').show();

      });
      // Listen for click on tabs.
      $('ul.tabs a').click(function() {
        // If not current tab.
        if (!$(this).hasClass('current')) {
          // Change the current indicator.
          $(this).addClass('current').parent('li').addClass('current-tab').siblings('li').removeClass('current-tab')
          .find('a.current').removeClass('current');
          // Show target, hide others.
          $($(this).attr('href')).show().siblings('div.tab_content').hide();
        }
        // Nofollow.
        this.blur();
        return false;
      });
    }
  };
})();
/*
 * LOAD!
 */
jQuery(function() {
  ww.main.init();
});
