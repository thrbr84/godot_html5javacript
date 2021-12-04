var n = 1;

const functions = {
    "restartNumber": (num = 1) => {
        n = num;
        window.localStorage.setItem("number", n);
        functions["updateLabel"]();
    },
    "login": () => {
        window.localStorage.setItem("logged", "1");
    },
    "logout": () => {
        window.localStorage.removeItem("logged");
    },
    "increaseNumber": () => {
        n++;
        window.localStorage.setItem("number", n);
        functions["updateLabel"]();
    },
    "decreaseNumber": () => {
        n = n <= 1 ? 1 : n-1
        window.localStorage.setItem("number", n);
        functions["updateLabel"]();
    },
    "updateLabel": () => {
        if ($("#labelNumber").length > 0)
            $("#labelNumber").text(n);
    },
    "api_get_user": async(id) => {
        return await fetch('https://jsonplaceholder.typicode.com/todos/' + id)
            .then(response => response.json());
    }
}

// If you use the javascript in another format like function expressions above, you need to convert the function like below
// The Godot can call the functions in this format
function restartNumber(num = 1) { 
    return functions["restartNumber"](num) 
}

function login() { 
    return functions["login"]() 
}

function logout() { 
    return functions["logout"]() 
}

function increaseNumber() { 
    return functions["increaseNumber"]() 
}

function decreaseNumber() { 
    return functions["decreaseNumber"]() 
}

async function api_get_user(id = 1) { 
    return await functions["api_get_user"](id).then(x => {
        window.localStorage.setItem("user", JSON.stringify(x));
    });
}

$(document).ready(function(){
    var _loadNumber = window.localStorage.getItem("number");
    if (_loadNumber) {
        n = parseInt(_loadNumber);
    }
    functions["updateLabel"]();

    $(".audioVolume").bind("change", function(e){
        var vol = ($(e.target).val());
        setAudioVolume(vol);
    });

    if (player) {
        // default
        setAudioVolume(0.5);
    }
});