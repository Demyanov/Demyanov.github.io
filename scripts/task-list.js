var ENTER_KEY = 13;

$(document).ready(function () {
    // Some helpful jquery variables
    var $wrapper = $("#wrapper");
    var $task_input = $("#task-input");
    var $task_list = $("<ul/>", {id: "#todo-list"}).appendTo($wrapper);
    var $clear_button = $("#clear-all");

    // Bind event handlers for several objects with functions
    $clear_button.bind("click", function(event) {$task_list.empty();});
    $task_input.bind("keyup", function(event) {
        var $input = $(event.target);
        var val = $input.val().trim();

        if (event.which !== ENTER_KEY || !val) {
            return;
        }

        $input.val("");
        $new_task = $("<li/>", {class: "task"}).appendTo($task_list);
        $delete_button = $("<div/>", {class: "x-button",
                                      html: "&times;"}).appendTo($new_task);
        $("<p/>", {class: "task-content",
                   html: val,
                   contenteditable: "true"}).appendTo($new_task);

        $delete_button.bind("click", function(event) {
            $(this).parent(".task").remove();
        });
    });

});
