var apiPoint = "http://"+window.location.host+"/api";
var pin = 7;
function actionClick(ob){
    var iotLoader = $("#iot-main-loader");
    iotLoader.addClass("center-all");
    iotLoader.css({"display" : "flex"});
    $.ajax({
        url: apiPoint + "/act",
        type: "POST",
        data: {state : ob,pin : pin},
        success: function(data, textStatus, jqXHR) {
            var state = (ob === true || ob === "true") ? "ON" : "OFF";
            $("#iot-state-msg").text("State is "+state);
            iotLoader.removeClass("center-all");
            iotLoader.css({"display" : "none"});
            if(state === "ON"){
                $("#iot-on-switch").addClass("dis-none");;
                $("#iot-off-switch").removeClass("dis-none");
            } else {
                $("#iot-on-switch").removeClass("dis-none");
                $("#iot-off-switch").addClass("dis-none");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#iot-state-msg").text("Something went wrong try after some time");
            iotLoader.removeClass("center-all");
            iotLoader.css({"display" : "none"});
        }
    });
}
function checkState(){
    $.ajax({
        url: apiPoint + "/read",
        type: "POST",
        data: {pin : pin},
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            $("#iot-switch-ctnr").removeClass("dis-none")
            // var state = (ob === true || ob === "true") ? "ON" : "OFF";
            // $("#iot-state-msg").text("State is "+state);
            // iotLoader.removeClass("center-all");
            // iotLoader.css({"display" : "none"});
            // if(state === "ON"){
            //     $("#iot-on-switch").addClass("dis-none");;
            //     $("#iot-off-switch").removeClass("dis-none");
            // } else {
            //     $("#iot-on-switch").removeClass("dis-none");
            //     $("#iot-off-switch").addClass("dis-none");
            // }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#iot-state-msg").text("Something went wrong try after some time");
            iotLoader.removeClass("center-all");
            iotLoader.css({"display" : "none"});
            $("#iot-switch-ctnr").removeClass("dis-none")
        }
    });
}
checkState();

$( document ).ready(function() {
    var iotLoader = $("#iot-main-loader");
    iotLoader.removeClass("center-all");
    iotLoader.css({"display" : "none"});
});