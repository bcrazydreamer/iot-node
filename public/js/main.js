var apiPoint = "http://"+window.location.host+"/api";
function actionClick(data){
    var iotLoader = $("#iot-main-loader");
    iotLoader.addClass("center-all");
    iotLoader.css({"display" : "flex"});
    $.ajax({
        url: apiPoint + "/act",
        type: "POST",
        data: {state : data},
        success: function(data, textStatus, jqXHR) {
            var state = data === true || data === "true" ? "ON" : "OFF";
            $("#iot-state-msg").text("State is "+state);
            iotLoader.removeClass("center-all");
            iotLoader.css({"display" : "none"});
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#iot-state-msg").text("Something went wrong try after some time");
            iotLoader.removeClass("center-all");
            iotLoader.css({"display" : "none"});
        }
    });
}

$( document ).ready(function() {
    var iotLoader = $("#iot-main-loader");
    iotLoader.removeClass("center-all");
    iotLoader.css({"display" : "none"});
});