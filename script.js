$(document).ready(function()
{

  $("a").on('click', function(event)
  {
    if (this.hash !== "")
    {
      event.preventDefault(); //prevents actual behaviour
      var hash = this.hash; //saves link
      $('html, body').animate({scrollTop: $(hash).offset().top}, 1000, function() //actual animation
      {
        window.location.hash = hash; //equates link
      });
    }
  });

  if($(window).width() > 700)
  {
    $(".hover").hover(function()
    {
      $("#anchors").toggleClass("close");
      $("#site_wrap").toggleClass("close");
    });
  }
  else
  {
    $(".arrow").hover(function()
    {
      $("#anchors").toggleClass("close");
      $("#site_wrap").toggleClass("close");
    });
  }

});
