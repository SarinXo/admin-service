$(document).ready(function() {
    $("#toggleButton").click(function() {
        $(".side-menu").toggleClass("menu-open");
        $(".content").toggleClass("content-shifted");
    });
});

function handleButtonClick(buttonNumber) {
    alert("Вы нажали кнопку " + buttonNumber);
}