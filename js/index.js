
function onSubscribe() {
    var result = {}
    result.valid = true;
    result.value = "my precious data"
    JFCustomWidget.sendSubmit(result)
    console.log("subscribe!");
}

JFCustomWidget.subscribe("submit", onSubscribe)
console.log("widget running");

$(function() {
    $("#range").slider();
            $("#details").hide();
            $("#final").show();

    var startPos = $("#range").slider("value"),
        endPos = '';

    $("#range").on("input", function(event, ui) {
        value = event.currentTarget.value;
        if (value == 100) {
            $("#details").hide();
            $("#final").show();
        }
        else {
            $("#details").show();
            $("#final").hide();
        }
    });
});