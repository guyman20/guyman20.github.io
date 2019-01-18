$("#range").slider();

function callback() {
    var result = {};
    result.valid = true;
    result.value = $("#range")[0].value.toString();
    console.log("sending submit");

    JFCustomWidget.sendSubmit(result);
}

JFCustomWidget.subscribe("submit", callback);

$(function() {
    $("#details").hide();
    $("#final").show();

    var startPos = $("#range").slider("value"),
        endPos = "";

    $("#range").on("input", function(event, ui) {
        value = event.currentTarget.value;
        if (value == 100) {
            $("#details").hide();
            $("#final").show();
        } else {
            $("#details").show();
            $("#final").hide();
        }
    });

    $("#range").on("change", function(event, ui) {
        value = event.currentTarget.value;
        var result = {};
        result.value = value.toString();
        JFCustomWidget.sendData(result);
        console.log(result);
    });
});
