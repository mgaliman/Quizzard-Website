const bodyParser = require("body-parser");

function cancelEdit() {
    if (confirm("Are you sure you want to cancel?")) {
        window.location.href = "myProfile";
    }
}

