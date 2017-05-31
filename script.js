$(document).ready(function()
{

  $("#button_intro").click(function()
  {
    $("#intro").css("background-color", "#70a8a6"); //dark body
    $("body").css("background-color", "#74AFAD"); //light body
    $("#intro").slideUp(1000);
    $("section").toggleClass("not_intro");
    $("#contact").fadeOut(1000);
  });

  $("#button_up").click(function()
  {
    $("body").css("background-color", "#303F9F"); //dark indigo
    $("#intro").css("background-color", "#3F51B5"); //light indigo
    $(".not_intro").slideDown(1000);
    $("section").toggleClass("not_intro");
    $("#contact").fadeIn(1000);
  });

});
