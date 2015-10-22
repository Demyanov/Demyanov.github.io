var ENTER_KEY = 13;

// Create tasks from task array
function createTasks(tasks, $task_list) {
    for (var i = 0; i < tasks.length; ++i) {
        $new_task = $("<li/>", {class: "task"}).appendTo($task_list);
        $delete_button = $("<div/>", {class: "x-button",
                                      html: "&times;"}).appendTo($new_task);
        $("<p/>", {class: "task-content",
                   html: tasks[i],
                   contenteditable: "true"}).appendTo($new_task);
        $delete_button.bind("click", function(event) {
            $parent = $(this).parent(".task");
            var storage_tasks = JSON.parse(localStorage.tasks);
            storage_tasks.splice($parent.index(), 1);
            localStorage.tasks = JSON.stringify(storage_tasks);
            $parent.remove();
        });
    }
}

$(document).ready(function () {
    // Some helpful jquery variables
    var $wrapper = $("#wrapper");
    var $task_input = $("#task-input");
    var $task_list = $("<ul/>", {id: "#todo-list"}).appendTo($wrapper);
    var $clear_button = $("#clear-all");

    // Create tasks from local storage
    localStorage.tasks = localStorage.tasks || JSON.stringify([]);
    createTasks(JSON.parse(localStorage.tasks), $task_list);

    // Bind event handlers for several objects with functions
    $clear_button.bind("click", function(event) {
        $task_list.empty()
        localStorage.tasks = JSON.stringify([]);
    });
    $task_input.bind("keyup", function(event) {
        var $input = $(event.target);
        var val = $input.val().trim();

        if (event.which !== ENTER_KEY || !val) {
            return;
        }

        $input.val("");
        localStorage.tasks = JSON.stringify(JSON.parse(localStorage.tasks).concat(val));
        createTasks([val], $task_list);
    });
});
