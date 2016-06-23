var prefix = "localStorageDemo-";

$("#save").click(function () {
    var key = $("#key").attr('value');
    var value = $("#value").attr('value');
    localStorage.setItem(prefix + key, value);      
    RewriteFromStorage();
});

function RewriteFromStorage() {
    $("#data").empty();
    for(var i = 0; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        if(key.indexOf(prefix) == 0) {
            var value = localStorage.getItem(key);

            var shortkey = key.replace(prefix, "");
            $("#data").append(
                $("<div class='kvp'>").html(shortkey + "=" + value)
                    .append($("<input type='button' value='Delete'>")
                        .attr('key', key)
                        .click(function() {
                            localStorage.removeItem($(this).attr('key'));
                            RewriteFromStorage();
                        })
                    )
            );
        }
    }
}

RewriteFromStorage();
