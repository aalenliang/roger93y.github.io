+function ($) {
  function scrollPlugin() {
    this.$element = $(document.body);
    console.log(this.$element);
  }
  $.fn.scrollPlugin = scrollPlugin;

}(jQuery);